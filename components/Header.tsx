"use client";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import MiniSearch from "@/app/search/page";
import { Bell } from "lucide-react";

export default function Header() {
  const { isSignedIn, user } = useUser();

  return (
    <header className="flex items-center px-8 h-20 w-full bg-[#FDFBF7]/80 backdrop-blur-md sticky top-0 z-40 border-b border-[#E2D9CC]/50">
      <div className="flex items-center justify-between w-full gap-8">
        <div className="flex-1 flex justify-center">
          <MiniSearch />
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2.5 rounded-xl hover:bg-[#F2EDE4] text-[#A68966] transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#FDFBF7]"></span>
          </button>

          <div className="h-8 w-[1px] bg-[#E2D9CC] mx-2 hidden md:block" />

          <div className="flex items-center gap-4 pl-2">
            {!isSignedIn ? (
              <SignInButton mode="modal">
                <button className="bg-[#7C4F2F] text-white px-6 py-2.5 rounded-xl font-serif text-sm hover:bg-[#5C3820] transition-all shadow-md shadow-orange-900/10">
                  Нэвтрэх
                </button>
              </SignInButton>
            ) : (
              <div className="flex items-center gap-3 bg-[#F2EDE4]/50 p-1 pr-4 rounded-full border border-[#E2D9CC]/30">
                <div className="scale-110">
                  <UserButton />
                </div>
                <div className="hidden lg:flex flex-col">
                  <span className="text-[11px] font-bold text-[#2C1F14] leading-tight">
                    {user?.firstName || "Миний бүртгэл"}
                  </span>
                  <span className="text-[9px] text-[#A68966] uppercase tracking-tighter">
                    Суралцагч
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
