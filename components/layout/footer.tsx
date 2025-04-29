"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Globe, Github, Twitter, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DiscordCard } from "@/components/discord-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Footer() {
  const { dictionary } = useLanguage();
  const currentYear = new Date().getFullYear();
  const discordUserId = "295926741292285952";
  
  const openDiscordProfile = () => {
    window.open(`https://discord.com/users/${discordUserId}`, '_blank');
  };
  
  return (
    <footer className="relative border-t bg-background/80 backdrop-blur-sm">
      {/* Spotlight Effect */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ 
          background: 'radial-gradient(circle at 50% 120%, var(--primary) 0%, transparent 60%)',
          opacity: 0.15,
          filter: 'blur(40px)'
        }}
      />

      <div className="container relative mx-auto max-w-6xl px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <span className="text-lg font-medium">{dictionary.siteName}</span>
            </div>
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:text-[#333] dark:hover:text-white group"
                      asChild
                    >
                      <a
                        href="https://github.com/lexardev"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Profile"
                      >
                        <Github className="h-5 w-5 transition-transform group-hover:rotate-12" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>GitHub Profile</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:text-[#1DA1F2] group"
                      asChild
                    >
                      <a
                        href="https://x.com/LeXarDev"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter Profile"
                      >
                        <Twitter className="h-5 w-5 transition-transform group-hover:-rotate-12" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Twitter Profile</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:text-green-500 group"
                      asChild
                    >
                      <a
                        href="https://uptime.lexardev.xyz/status/v1"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Service Status"
                      >
                        <Activity className="h-5 w-5 transition-transform group-hover:scale-y-125" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Service Status</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DiscordCard />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Discord Profile</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground text-center">
            <p className="relative z-10">{currentYear} {dictionary.siteName}. {dictionary.footer.rightsReserved}</p>
            <p className="mt-1 relative z-10 flex items-center justify-center gap-1">
              Made by
              <a
                href="https://x.com/LeXarDev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-[#1DA1F2] transition-colors mx-1"
              >
                LEXARDEV
                <Twitter className="h-4 w-4" />
              </a>
              <span className="mx-1">·</span>
              <span>{dictionary.footer.poweredBy}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}