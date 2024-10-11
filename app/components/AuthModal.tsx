import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import SignIn from "./SignIn";

const AuthModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Let's Started</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {" "}
            <h4 className="text-3xl font-semibold">
              Sari
              <span className="text-blue-500">Cal</span>
            </h4>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 w-full py-4">
          <SignIn />
          <SignIn />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
