"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export function DisclaimerModal() {
  const { dictionary } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // التحقق من localStorage لمعرفة ما إذا كان المستخدم قد رأى التنبيه من قبل
    const hasSeenDisclaimer = localStorage.getItem("hasSeenDisclaimer");
    if (!hasSeenDisclaimer) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // تخزين أن المستخدم قد رأى التنبيه
    localStorage.setItem("hasSeenDisclaimer", "true");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
            تنبيه مهم
          </DialogTitle>
          <DialogDescription className="text-base leading-7 mt-4">
            <p className="mb-3">
              نود التنبيه أن هذه المنصة هي خدمة مجانية للتحقق من توفر النطاقات فقط.
            </p>
            <p className="mb-3">
              نحن لا نقوم ببيع أو تسجيل النطاقات. للتسجيل، يرجى زيارة المركز السعودي لمعلومات الشبكة 
              <a 
                href="https://nic.sa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline mx-1"
              >
                (nic.sa)
              </a>
              مباشرة.
            </p>
            <p>
              جميع الأسعار المعروضة هي تقديرية وقد تختلف عن الأسعار الفعلية لدى المسجلين المعتمدين.
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6">
          <Button 
            onClick={handleClose}
            className="w-full sm:w-auto"
          >
            فهمت ذلك
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
