import SettingsForm from "@/app/components/SettingsForm";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      image: true,
    },
  });
  if (!data) return notFound();
  return data;
}

const Settings = async () => {
  const session = await auth();
  if (!session?.user) {
    return;
  }
  const data = await getData(session?.user?.id as string);

  return (
    <div className="">
      <SettingsForm data={data} />
    </div>
  );
};

export default Settings;
