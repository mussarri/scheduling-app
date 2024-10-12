import AvailabityForm from "@/app/components/AvailabityForm";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

async function getData(id: string) {
  const data = await prisma.availabity.findMany({
    where: {
      userId: id,
    },
  });
  if (!data) return notFound();
  return data;
}

const page = async () => {
  const session = await auth();
  if (!session?.user) {
    return;
  }
  const data = await getData(session?.user?.id as string);

  return <AvailabityForm data={data} />;
};

export default page;
