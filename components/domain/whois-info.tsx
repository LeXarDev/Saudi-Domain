"use client";

import { WhoisData } from "@/lib/hooks/useDomainCheck";
import { useLanguage } from "@/components/providers/language-provider";
import { Separator } from "@/components/ui/separator";

interface WhoisInfoProps {
  whoisData: WhoisData;
}

export function WhoisInfo({ whoisData }: WhoisInfoProps) {
  const { dictionary } = useLanguage();
  
  return (
    <div className="space-y-6 mt-4">
      <div className="text-center text-lg text-destructive">
        <p className="mb-2">هذا النطاق مسجل مسبقاً</p>
        <p className="text-sm text-muted-foreground">يمكنك الاطلاع على معلومات التسجيل أدناه</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-muted-foreground">
            {dictionary.domainChecker.result.registeredOn}
          </h4>
          <p>{whoisData.registrationDate}</p>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-muted-foreground">
            {dictionary.domainChecker.result.expiresOn}
          </h4>
          <p>{whoisData.expiryDate}</p>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-2">
        <h4 className="font-medium text-sm text-muted-foreground">Registrar</h4>
        <p>{whoisData.registrar}</p>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium text-sm text-muted-foreground">Status</h4>
        <p>{whoisData.status}</p>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium text-sm text-muted-foreground">Name Servers</h4>
        <ul className="list-disc list-inside">
          {whoisData.nameServers.map((ns, index) => (
            <li key={index}>{ns}</li>
          ))}
        </ul>
      </div>
      
      <Separator />
      
      <div className="space-y-2">
        <h4 className="font-medium text-sm text-muted-foreground">Registrant</h4>
        <p>{whoisData.registrant.organization}</p>
        <p>{whoisData.registrant.country}</p>
      </div>
    </div>
  );
}