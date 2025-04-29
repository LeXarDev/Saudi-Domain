import { useState, useEffect, useCallback } from "react";
import { formatDomain, generateAlternativeDomains, generateDemoWhoisData, getDomainPrice } from "../utils/domain-utils";
import { config } from "../config";

export interface WhoisData {
  registrar: string;
  registrantName: string;
  registrantOrganization: string;
  creationDate: string;
  expiryDate: string;
  lastUpdated: string;
  status: string;
  nameServers: string[];
}

export interface DomainResult {
  domain: string;
  status: 'available' | 'in_use' | 'error';
  message: string;
  whoisData?: WhoisData;
}

interface CacheItem {
  result: DomainResult;
  timestamp: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const domainCache = new Map<string, CacheItem>();

export function useDomainCheck() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<DomainResult[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  const addToHistory = (domain: string) => {
    setHistory(prev => {
      if (prev.includes(domain)) return prev;
      return [domain, ...prev].slice(0, 10);
    });
  };

  useEffect(() => {
    if (loading) {
      setResults([]);
    }
  }, [loading]);

  const getHistory = (): string[] => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("domainSearchHistory") || "[]");
    }
    return [];
  };

  const clearHistory = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("domainSearchHistory");
    }
  };

  const checkDomain = useCallback(async (domain: string): Promise<DomainResult> => {
    // التحقق من وجود النتيجة في التخزين المؤقت
    const cachedItem = domainCache.get(domain);
    if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_DURATION) {
      console.log("Cache hit for domain:", domain);
      return cachedItem.result;
    }

    try {
      console.log("=== Checking Domain ===");
      console.log("Domain name:", domain);
      
      const response = await fetch(`${config.apiBaseUrl}/api/domain`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domainName: domain }),
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);
      
      const result: DomainResult = {
        domain,
        status: data.status,
        message: data.message,
        whoisData: data.status === 'in_use' ? generateDemoWhoisData(domain, false) : undefined
      };

      // تخزين النتيجة في التخزين المؤقت
      domainCache.set(domain, {
        result,
        timestamp: Date.now()
      });

      return result;
    } catch (err) {
      console.error("Error checking domain:", err);
      throw err;
    }
  }, []);

  const checkDomains = useCallback(async (domains: string[]) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${config.apiBaseUrl}/api/domain`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domainName: domains }),
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();
      const results: DomainResult[] = data.map((result: any) => ({
        domain: result.domain,
        status: result.status,
        message: result.message,
        whoisData: result.status === 'in_use' ? generateDemoWhoisData(result.domain, false) : undefined
      }));

      setResults(results);
      return results;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearCache = useCallback(() => {
    domainCache.clear();
  }, []);

  return {
    loading,
    error,
    results,
    checkDomain: async (domain: string) => {
      setLoading(true);
      setError(null);
      try {
        const result = await checkDomain(domain);
        setResults([result]);
        addToHistory(domain);
        return result;
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        return null;
      } finally {
        setLoading(false);
      }
    },
    checkDomains,
    getHistory,
    clearHistory,
    clearCache,
  };
}