"use client";

import { useState } from "react";

export const useShare = () => {
  const [shared, setShared] = useState(false);

  const shareDomain = async (domain: string, isAvailable: boolean) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Check out this domain: ${domain}`,
          text: `I found ${domain} using SA Domain Checker`,
          url: window.location.href
        });
        setShared(true);
      } else {
        // Fallback for browsers that don't support Web Share API
        copyToClipboard(`${domain} - ${window.location.href}`);
        setShared(true);
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
    
    // Reset the shared state after a delay
    setTimeout(() => {
      setShared(false);
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).catch(err => {
      console.error("Could not copy text: ", err);
    });
  };

  return { shared, shareDomain };
};