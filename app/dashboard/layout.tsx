import { redirect } from "next/navigation";
import { auth } from "../lib/auth";
import DashboardLinks from "../components/DashboardLinks";
import DashboardHeader from "../components/DashboardHeader";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="flex">
      <div className="min-h-screen hidden md:block bg-muted/40 w-[300px] border-r">
        <div className="text-left w-full border-b h-[70px]">
          <h4 className="text-3xl font-semibold p-4">
            Sari
            <span className="text-blue-500">Cal</span>
          </h4>
        </div>
        <DashboardLinks />
      </div>
      <div className="w-full">
        <DashboardHeader userImage={session.user.image || ""} />
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
}
