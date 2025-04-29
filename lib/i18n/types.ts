export type Locale = "en" | "ar";

export interface Dictionary {
  siteName: string;
  description: string;
  direction: "ltr" | "rtl";
  nav: {
    home: string;
    about: string;
    contact: string;
  };
  domainChecker: {
    title: string;
    subtitle: string;
    placeholder: string;
    checkButton: string;
    addDomain: string;
    checkAllTLDs: string;
    error: {
      invalidDomain: string;
      required: string;
      networkError: string;
      unknown: string;
    };
    checking: string;
    reserved: string;
    available: string;
    unavailable: string;
    register: string;
    copy: string;
    copied: string;
    share: string;
    shared: string;
    price: string;
    whoisTitle: string;
    alternativesTitle: string;
    bulkResults: string;
    multiDomainTitle: string;
    allTLDsTitle: string;
    history: {
      title: string;
      empty: string;
      clear: string;
    };
  };
  footer: {
    rightsReserved: string;
    poweredBy: string;
  };
}

export interface Dictionary {
  siteName: string;
  description: string;
  direction: "ltr" | "rtl";
  nav: {
    home: string;
    about: string;
    contact: string;
  };
  domainChecker: {
    title: string;
    subtitle: string;
    placeholder: string;
    checkButton: string;
    addDomain: string;
    checkAllTLDs: string;
    error: {
      invalidDomain: string;
      required: string;
      networkError: string;
    };
    available: string;
    unavailable: string;
    register: string;
    copy: string;
    copied: string;
    share: string;
    shared: string;
    price: string;
    allTLDsTitle: string;
    multiDomainTitle: string;
    history: {
      title: string;
      empty: string;
      clear: string;
    };
  };
  footer: {
    rightsReserved: string;
    poweredBy: string;
  };
}