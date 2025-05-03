"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface NavbarProps {
  userName: string;
}

export default function Navbar({ userName }: NavbarProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    router.push("/");
  };
  return (
    <nav className="h-[100px] max-h-[100px] overflow-hidden bg-[rgba(20,26,34,0.6)] backdrop-blur-md text-white px-6 py-4 flex items-center justify-between shadow-md">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <Image
          src="/images/Task.png"
          alt="Taskmaster AI"
          width={180}
          height={40}
          className="object-contain"
        />
      </div>

      {/* Right: User info and Logout */}
      <div className="flex items-center space-x-4">
        <span className="text-2xl">{userName}</span>
        <Button
          variant="outline"
          className="text-white font-bold text-xl bg-[rgb(20,26,34)] transition cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
}
