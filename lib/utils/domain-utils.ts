export const SAUDI_TLDS = [
  '.sa',
  '.com.sa',
  '.net.sa',
  '.gov.sa',
  '.org.sa',
  '.sch.sa',
  '.edu.sa',
  '.med.sa',
  '.pub.sa',
  '.السعودية'
] as const;

export type SaudiTLD = typeof SAUDI_TLDS[number];

export const isValidDomain = (domain: string): boolean => {
  // Support Arabic domains
  const pattern = /^(?:[a-z0-9\u0600-\u06FF](?:[a-z0-9\u0600-\u06FF-]{0,61}[a-z0-9\u0600-\u06FF])?\.)+[a-z0-9\u0600-\u06FF][a-z0-9\u0600-\u06FF-]{0,61}[a-z0-9\u0600-\u06FF]$/i;
  return pattern.test(domain);
};

export const formatDomain = (domain: string): string => {
  // Remove any protocols and www
  domain = domain.replace(/^(https?:\/\/)?(www\.)?/, "");
  
  // If domain doesn't end with any Saudi TLD
  if (!SAUDI_TLDS.some(tld => domain.endsWith(tld))) {
    // If it has another TLD, remove it
    if (domain.includes(".")) {
      domain = domain.split(".")[0];
    }
    // Add .sa as default
    domain = domain + ".sa";
  }
  
  return domain.toLowerCase();
};

export const generateAlternativeDomains = (domain: string): string[] => {
  // Extract the domain name without TLD
  const domainName = domain.split(".")[0];
  
  // Generate alternatives with different Saudi TLDs
  return [
    `${domainName}.com.sa`,
    `${domainName}.net.sa`,
    `${domainName}.org.sa`,
    `${domainName}.edu.sa`,
    `${domainName}.السعودية`
  ].filter(alt => alt !== domain); // Don't include the original domain
};

// Generate fake WHOIS data for demo purposes
export function generateDemoWhoisData(domain: string, isAvailable: boolean) {
  if (isAvailable) {
    return undefined;
  }
  
  const today = new Date();
  const registrationDate = new Date(today);
  registrationDate.setFullYear(registrationDate.getFullYear() - 2);
  
  const expiryDate = new Date(today);
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  
  return {
    registrar: "Saudi Network Information Center",
    registrantName: "Sample Organization",
    registrantOrganization: "Sample Organization Ltd.",
    creationDate: registrationDate.toISOString().split('T')[0],
    expiryDate: expiryDate.toISOString().split('T')[0],
    lastUpdated: today.toISOString().split('T')[0],
    status: "Active",
    nameServers: [
      "ns1.saudinic.net.sa",
      "ns2.saudinic.net.sa"
    ]
  };
};

export const getDomainPrice = (tld: string = ".sa"): string => {
  // Prices based on TLD (for demo purposes)
  const prices: Record<string, string> = {
    ".sa": "199",
    ".com.sa": "149",
    ".net.sa": "149",
    ".org.sa": "149",
    ".edu.sa": "N/A",
    ".med.sa": "N/A",
    ".pub.sa": "149",
    ".sch.sa": "99",
    ".gov.sa": "N/A", // Government domains
    ".السعودية": "299"
  };
  
  return prices[tld] || "199";
};