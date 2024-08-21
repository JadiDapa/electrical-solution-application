"use client";

import { Menu, LogOut, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchDialog from "./SearchDialog";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  function handleLogout() {
    router.push("/");
    signOut();
    toast.success("Logged Out successfully!");
  }

  return (
    <nav className="flex w-full items-center justify-between border-b bg-white px-4 py-4">
      <div className="flex items-center gap-3">
        <Menu className="block lg:hidden" />
        <SearchDialog />
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="relative size-9 overflow-hidden rounded-full border-2 border-primary">
              <Image
                className="object-cover object-center"
                src="/images/profile-default.jpg"
                fill
                alt="Profile Icon"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-20">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href="" className="flex items-center gap-3">
                  <UserRound className="text-lg" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="flex gap-3">
                <LogOut className="text-lg" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
