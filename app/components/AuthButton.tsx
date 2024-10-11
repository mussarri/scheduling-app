"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

const AuthButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      <Button disabled={pending} type="submit" className="w-full">
        {pending ? <Loader2 /> : "Signin with Google"}
      </Button>
    </>
  );
};

export default AuthButton;
