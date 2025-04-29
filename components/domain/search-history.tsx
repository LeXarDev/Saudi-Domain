"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { useDomainCheck } from "@/lib/hooks/useDomainCheck";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Trash2 } from "lucide-react";

export function SearchHistory() {
  const { dictionary, isRTL } = useLanguage();
  const { getHistory, clearHistory, checkDomain } = useDomainCheck();
  const [history, setHistory] = useState<string[]>([]);
  
  useEffect(() => {
    // Get history from local storage on component mount
    setHistory(getHistory());
    
    // Update history when window is focused
    const handleFocus = () => {
      setHistory(getHistory());
    };
    
    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);
  
  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };
  
  if (!history.length) return null;
  
  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">{dictionary.domainChecker.history.title}</CardTitle>
        <Button variant="ghost" size="sm" onClick={handleClearHistory}>
          <Trash2 className="h-4 w-4 mr-2" />
          {dictionary.domainChecker.history.clear}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" dir={isRTL ? "rtl" : "ltr"}>
          {history.map((domain) => (
            <div 
              key={domain} 
              className="flex items-center justify-between p-3 border rounded-md hover:bg-secondary/20 transition-colors cursor-pointer"
              onClick={() => checkDomain(domain)}
            >
              <span className="font-medium truncate">{domain}</span>
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}