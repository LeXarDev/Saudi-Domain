"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { isValidDomain, SAUDI_TLDS } from "@/lib/utils/domain-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Minus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface DomainFormProps {
  onResult: (domain: string) => void;
  onBulkResult?: (domains: string[]) => void;
}

export function DomainForm({ onResult, onBulkResult }: DomainFormProps) {
  const { dictionary, isRTL } = useLanguage();
  const [domains, setDomains] = useState<string[]>([""]);
  const [selectedTLD, setSelectedTLD] = useState<string>(".sa");
  const [validationErrors, setValidationErrors] = useState<(string | null)[]>([null]);
  const [loading, setLoading] = useState(false);
  const [checkAllTLDs, setCheckAllTLDs] = useState(false);

  const addDomainField = () => {
    setDomains([...domains, ""]);
    setValidationErrors([...validationErrors, null]);
  };

  const removeDomainField = (index: number) => {
    if (domains.length > 1) {
      const newDomains = domains.filter((_, i) => i !== index);
      const newErrors = validationErrors.filter((_, i) => i !== index);
      setDomains(newDomains);
      setValidationErrors(newErrors);
    }
  };

  const updateDomain = (index: number, value: string) => {
    const newDomains = [...domains];
    newDomains[index] = value;
    setDomains(newDomains);
    // Reset validation error when user types
    const newErrors = [...validationErrors];
    newErrors[index] = null;
    setValidationErrors(newErrors);
  };

  const validateDomain = (domain: string): boolean => {
    if (!domain.trim()) {
      return false;
    }
    const fullDomain = domain.includes(".")
      ? domain
      : `${domain}${selectedTLD}`;
    return isValidDomain(fullDomain);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all domains
    const newErrors = domains.map(domain => {
      if (!domain.trim()) {
        return dictionary.domainChecker.error.required;
      }
      const fullDomain = domain.includes(".")
        ? domain
        : `${domain}${selectedTLD}`;
      if (!isValidDomain(fullDomain)) {
        return dictionary.domainChecker.error.invalidDomain;
      }
      return null;
    });

    setValidationErrors(newErrors);

    if (newErrors.some(error => error !== null)) {
      return;
    }

    setLoading(true);

    if (checkAllTLDs) {
      // Check domain with all TLDs
      const domainName = domains[0].split('.')[0];
      const allDomains = SAUDI_TLDS.map(tld => `${domainName}${tld}`);
      onBulkResult?.(allDomains);
    } else if (domains.length > 1) {
      // Bulk check multiple domains
      const fullDomains = domains.map(domain => 
        domain.includes(".")
          ? domain
          : `${domain}${selectedTLD}`
      );
      onBulkResult?.(fullDomains);
    } else {
      // Single domain check
      const fullDomain = domains[0].includes(".")
        ? domains[0]
        : `${domains[0]}${selectedTLD}`;
      await onResult(fullDomain);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div className="flex flex-col space-y-4">
        {domains.map((domain, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-2 group">
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 group-focus-within:opacity-100 transition-opacity rounded-xl" />
              <Input
                type="text"
                value={domain}
                onChange={(e) => updateDomain(index, e.target.value)}
                placeholder={dictionary.domainChecker.placeholder}
                className="h-14 px-4 text-lg rounded-xl bg-background/50 backdrop-blur-sm border-2 focus-visible:ring-2 focus-visible:ring-primary/50 transition-all duration-300 focus:scale-[1.02] group-hover:border-primary/50"
                dir={isRTL ? "rtl" : "ltr"}
              />
            </div>
            
            {index === 0 && (
              <Select
                value={selectedTLD}
                onValueChange={setSelectedTLD}
                dir={isRTL ? "rtl" : "ltr"}
                disabled={checkAllTLDs}
              >
                <SelectTrigger className="w-full md:w-[180px] h-14 transition-all duration-300 hover:border-primary/50 focus:scale-[1.02]">
                  <SelectValue placeholder=".sa" />
                </SelectTrigger>
                <SelectContent>
                  {SAUDI_TLDS.map((tld) => (
                    <SelectItem key={tld} value={tld} className="transition-colors hover:text-primary">
                      {tld}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {domains.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeDomainField(index)}
                className="h-14 w-14 rounded-xl transition-all duration-300 hover:scale-110 hover:bg-destructive/10 hover:text-destructive"
              >
                <Minus className="h-5 w-5" />
              </Button>
            )}

            {validationErrors[index] && (
              <p className="text-destructive text-sm absolute mt-14">{validationErrors[index]}</p>
            )}
          </div>
        ))}

        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={addDomainField}
            disabled={loading || checkAllTLDs}
            className="h-10 transition-all duration-300 hover:scale-105 hover:border-primary active:scale-95"
          >
            <Plus className="h-4 w-4 mr-2" />
            {dictionary.domainChecker.addDomain}
          </Button>

          <div className="flex items-center gap-2">
            <Checkbox
              id="checkAllTLDs"
              checked={checkAllTLDs}
              onCheckedChange={(checked) => {
                setCheckAllTLDs(checked as boolean);
                if (checked) {
                  setDomains([domains[0]]);
                  setValidationErrors([validationErrors[0]]);
                }
              }}
              className="transition-transform hover:scale-110"
            />
            <label htmlFor="checkAllTLDs" className="text-sm cursor-pointer hover:text-primary transition-colors">
              {dictionary.domainChecker.checkAllTLDs}
            </label>
          </div>
        </div>
        
        <Button 
          type="submit"
          className="relative h-12 px-6 font-medium text-lg rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden group"
          disabled={loading}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity" />
          {loading ? (
            <div className="flex items-center gap-2 relative">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              <span>{dictionary.domainChecker.checkButton}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 relative">
              <Search className="h-5 w-5 transition-transform group-hover:rotate-12" />
              <span>{dictionary.domainChecker.checkButton}</span>
            </div>
          )}
        </Button>
      </div>
    </form>
  );
}