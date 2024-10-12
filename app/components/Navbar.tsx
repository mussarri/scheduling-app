import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import AuthModal from "./AuthModal";

const Navbar = () => {
  return (
    <div className="w-full border-b">
      <div className="flex p-5 justify-between items-center max-width">
        <Link href="/">
          <h4 className="text-3xl font-semibold">
            Sari
            <span className="text-blue-500">Cal</span>
          </h4>
        </Link>

        <AuthModal />
      </div>
    </div>
  );
};

export default Navbar;
