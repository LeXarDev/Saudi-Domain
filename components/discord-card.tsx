"use client";

import { useState } from "react";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function DiscordCard() {
  const [isOpen, setIsOpen] = useState(false);
  const discordUserId = "295926741292285952";
  const discordUsername = "LEXARDEV";
  const discordAvatar = "https://cdn.discordapp.com/avatars/295926741292285952/df9b54012a96648344acfd9267d18dd0.webp?size=128";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:text-[#5865F2] group"
          aria-label="Discord Profile"
        >
          <SiDiscord className="h-5 w-5 transition-transform group-hover:bounce" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[#2C2F33] border-none text-white overflow-hidden">
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background: 'linear-gradient(45deg, #5865F2 0%, #2C2F33 100%)',
            filter: 'blur(100px)',
            transform: 'translate(-50%, -50%) rotate(-15deg) scale(2)',
            top: '50%',
            left: '50%',
          }}
        />
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <SiDiscord className="h-6 w-6 text-[#5865F2]" />
            الملف الشخصي
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="relative">
            {/* Banner */}
            <div 
              className="h-24 rounded-t-lg relative overflow-hidden"
              style={{
                background: 'linear-gradient(45deg, #5865F2, #7289DA)',
              }}
            >
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
                }}
              />
            </div>
            
            {/* Avatar */}
            <div className="absolute -bottom-10 left-4">
              <div className="rounded-full border-4 border-[#2C2F33] overflow-hidden w-20 h-20 transform hover:scale-105 transition-transform duration-200 cursor-pointer">
                <img
                  src={discordAvatar}
                  alt="Discord Avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://cdn.discordapp.com/embed/avatars/0.png";
                  }}
                />
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="mt-12 p-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              {discordUsername}
              <span className="text-xs px-2 py-1 rounded-full bg-[#5865F2] font-normal">
                مطور
              </span>
            </h3>
            
            <div className="mt-4 space-y-2">
              <p className="text-[#B9BBBE] font-medium">
                Khalid@lexardev.com
              </p>
              <div className="mt-3 font-mono text-sm opacity-75 bg-[#1E2124] p-3 rounded">
                <p>if (match_found_in_database()) {`{`}</p>
                <p className="ml-4">$_SESSION[&apos;username&apos;] = $username;</p>
                <p className="ml-4">$_POST[&apos;khalid&apos;];</p>
                <p>{`}`}</p>
              </div>
            </div>

            <div className="mt-6">
              <Button
                className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium transform hover:scale-[1.02] transition-all duration-200 hover:shadow-lg"
                onClick={() => {
                  window.open(`https://discord.com/users/${discordUserId}`, '_blank');
                }}
              >
                <SiDiscord className="h-5 w-5 ml-2" />
                تواصل معي على Discord
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
