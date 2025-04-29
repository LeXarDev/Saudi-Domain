"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { DomainForm } from "@/components/domain/domain-form";
import { DomainResultCard } from "@/components/domain/domain-result";
import { useDomainCheck } from "@/lib/hooks/useDomainCheck";
import { GridBackground } from "@/components/ui/grid-background";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { DomainSkeleton, DomainSkeletonList } from "@/components/domain/domain-skeleton";
import { ConfettiEffect } from "@/components/confetti-effect";

const DomainCheckerPage = () => {
  const { dictionary, locale, isRTL } = useLanguage();
  const { checkDomain, checkDomains, loading, error, results } = useDomainCheck();

  const handleResult = async (domain: string) => {
    await checkDomain(domain);
  };

  const handleBulkResult = async (domains: string[]) => {
    await checkDomains(domains);
  };

  // التحقق مما إذا كان هناك نتيجة متاحة
  const hasAvailableDomain = results.some(result => result.status === 'available');

  return (
    <main className="flex-1">
      <ConfettiEffect isAvailable={hasAvailableDomain} />
      <GridBackground>
        <div className="container mx-auto max-w-6xl px-4 py-8 md:py-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                {locale === 'ar' ? dictionary.domainChecker.title : 'Check Domains'}
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {dictionary.domainChecker.subtitle}
            </p>
          </div>

          <DomainForm onResult={handleResult} onBulkResult={handleBulkResult} />

          {error && (
            <Alert variant="destructive" className="mt-8">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="mt-8">
            {loading ? (
              results.length > 1 ? <DomainSkeletonList /> : <DomainSkeleton />
            ) : (
              results.length > 0 && (
                <DomainResultCard result={results.length === 1 ? results[0] : results} />
              )
            )}
          </div>
        </div>
      </GridBackground>
    </main>
  );
};

export default DomainCheckerPage;