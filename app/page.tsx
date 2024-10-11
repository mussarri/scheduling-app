import { redirect } from "next/navigation";

import { auth } from "./lib/auth";
import Navbar from "./components/Navbar";

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <div>
      <Navbar />
    </div>
  );
}
