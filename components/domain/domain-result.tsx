"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { useClipboard } from "@/lib/hooks/useClipboard";
import { useShare } from "@/lib/hooks/useShare";
import { getDomainPrice } from "@/lib/utils/domain-utils";
import { type DomainResult } from "@/lib/hooks/useDomainCheck";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { SARIcon } from "@/components/ui/sar-icon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy, Share, ExternalLink } from "lucide-react";

interface DomainResultProps {
  result: DomainResult | DomainResult[] | null;
}

export function DomainResultCard({ result }: DomainResultProps) {
  const { dictionary, isRTL } = useLanguage();
  const { copied, copyToClipboard } = useClipboard();
  const { shared, shareDomain } = useShare();
  const [activeTab, setActiveTab] = useState<string>("main");
  
  if (!result) return null;

  const isMultiResult = Array.isArray(result);
  
  const createActionButtons = (domain: string, status: string) => (
    <div className="flex gap-2 rtl:flex-row-reverse">
      <Button
        variant="outline"
        className="flex items-center gap-2 rtl:flex-row-reverse"
        onClick={() => copyToClipboard(domain)}
      >
        <Copy className="h-4 w-4" />
        <span>{copied ? dictionary.domainChecker.copied : dictionary.domainChecker.copy}</span>
      </Button>
      <Button
        variant="outline"
        className="flex items-center gap-2 rtl:flex-row-reverse"
        onClick={() => shareDomain(domain, status === 'available')}
      >
        <Share className="h-4 w-4" />
        <span>{shared ? dictionary.domainChecker.shared : dictionary.domainChecker.share}</span>
      </Button>
      {status === 'available' && (
        <Button
          variant="default"
          className="flex items-center gap-2 rtl:flex-row-reverse"
          onClick={() =>
            window.open(
              `https://nic.sa/ar/domain-registration`,
              "_blank"
            )
          }
        >
          <ExternalLink className="h-4 w-4" />
          <span>{dictionary.domainChecker.register}</span>
        </Button>
      )}
    </div>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'text-green-500';
      case 'error':
        return 'text-yellow-500';
      case 'reserved_zone':
      case 'in_use':
        return 'text-red-500';
      default:
        return 'text-red-500';
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'available':
        return dictionary.domainChecker.available;
      case 'in_use':
      case 'reserved':
      case 'reserved_zone':
        return dictionary.domainChecker.reserved;
      case 'error':
        return dictionary.domainChecker.error.unknown;
      default:
        return dictionary.domainChecker.unavailable;
    }
  };

  const renderSingleResult = (domainResult: DomainResult) => {
    const { domain, status } = domainResult;
    const isAvailable = status === 'available';
    const statusMessage = getStatusMessage(status);
    
    return (
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl mb-1">{domain}</CardTitle>
              <p
                className={`text-lg ${getStatusColor(status)}`}
              >
                {statusMessage}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            {!domain.includes("gov") && (
              <div className="flex items-center gap-2 bg-primary/5 rounded-lg px-3 py-1.5">
                <p className="text-base font-semibold text-primary flex items-center gap-1 rtl:flex-row-reverse">
                  <span>{getDomainPrice(domain.substring(domain.indexOf(".")))}</span>
                  <SARIcon className="h-4 w-4" />
                </p>
                <span className="text-xs text-muted-foreground">{dictionary.domainChecker.price || '/year'}</span>
              </div>
            )}
            <div className="flex items-center gap-2 rtl:flex-row-reverse">
              {createActionButtons(domain, status)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMultiResults = (results: DomainResult[]) => {
    const isAllTLDs = results.every((r, i) => 
      i === 0 || r.domain.split('.')[0] === results[0].domain.split('.')[0]
    );

    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          {isAllTLDs 
            ? dictionary.domainChecker.allTLDsTitle 
            : dictionary.domainChecker.multiDomainTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((domainResult) => (
            <Card key={domainResult.domain} className="border-2">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">{domainResult.domain}</p>
                  <p className={`text-sm font-semibold ${domainResult.status === 'available' ? "text-green-500" : "text-red-500"}`}>
                    {domainResult.status === 'available' 
                      ? dictionary.domainChecker.available 
                      : dictionary.domainChecker.unavailable}
                  </p>
                </div>
                {domainResult.status === 'available' && (
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <span>{getDomainPrice(domainResult.domain.substring(domainResult.domain.indexOf(".")))}</span>
                      <SARIcon className="h-3.5 w-3.5 text-white" />
                    </p>
                    {!domainResult.domain.includes("gov") && (
                      <div className="flex gap-2">
                        {createActionButtons(domainResult.domain, domainResult.status)}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto animate-in fade-in-50 duration-500 slide-in-from-bottom-10">
      <CardHeader>
        {isMultiResult ? renderMultiResults(result) : renderSingleResult(result)}
      </CardHeader>
    </Card>
  );
}