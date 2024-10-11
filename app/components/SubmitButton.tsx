"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = ({
  text,
  className,
}: {
  text: string;
  className: string;
}) => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button variant="outline" disabled>
          <Loader2></Loader2>
        </Button>
      ) : (
        <Button variant={"default"} className={cn("w-full", className)}>
          {text}
        </Button>
      )}
    </>
  );
};

export default SubmitButton;
