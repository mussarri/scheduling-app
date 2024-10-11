import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import DarkMode from "../components/DarkMode";
import DashboardLinks from "./DashboardLinks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { signOut } from "@/lib/auth";

const DashboardHeader = ({ userImage }: { userImage: string }) => {
  return (
    <div className="bg-muted/40 w-full flex-1 border-b h-[70px] flex justify-between md:justify-end items-center px-3 lg:px-6 gap-3">
      <Sheet>
        <SheetTrigger className="md:hidden">Open</SheetTrigger>
        <SheetContent className="w-[300px] sm:w-[360px] p-0" side={"left"}>
          <SheetHeader></SheetHeader>
          <div className="py-10">
            <DashboardLinks />
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex gap-2">
        <DarkMode />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="w-9 h-9 bg-blue-500 rounded-full overflow-hidden relative">
              <Image
                src={userImage as string}
                alt=""
                fill
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <form
                className="w-full"
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button>Logout</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardHeader;
