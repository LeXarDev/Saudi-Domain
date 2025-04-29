"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { isValidDomain } from "@/lib/utils/domain-utils";
import { useDomainCheck } from "@/lib/hooks/useDomainCheck";
import { Search } from "lucide-react";

interface AlternativeDomainsProps {
  alternatives: string[];
}

export function AlternativeDomains({ alternatives }: AlternativeDomainsProps) {
  const { dictionary } = useLanguage();
  const { checkDomain } = useDomainCheck();
  
  if (!alternatives.length) return null;
  
  return (
    <div className="space-y-4 py-4">
      <div className="grid grid-cols-1 gap-3">
        {alternatives.map((domain) => (
          isValidDomain(domain) && (
            <div key={domain} className="flex items-center justify-between p-3 border rounded-md bg-background hover:bg-secondary/50 transition-colors">
              <span className="font-medium">{domain}</span>
              <Button 
                size="sm" 
                variant="outline"
                className="gap-1"
                onClick={() => checkDomain(domain)}
              >
                <Search className="h-3 w-3" />
                <span>Check</span>
              </Button>
            </div>
          )
        ))}
      </div>
    </div>
  );
}