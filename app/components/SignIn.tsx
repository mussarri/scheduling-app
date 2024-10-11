import { Button } from "@/components/ui/button";

import AuthModal from "./AuthModal";
import AuthButton from "./AuthButton";
import { signIn } from "@/lib/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <AuthButton />
    </form>
  );
}
