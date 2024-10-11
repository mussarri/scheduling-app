"use client";
import React from "react";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const DarkMode = () => {
  const { setTheme, theme } = useTheme();

  return (
    <>
      {theme == "light" ? (
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setTheme("dark");
          }}
        >
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setTheme("light");
          }}
        >
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      )}
    </>
  );
};

export default DarkMode;
