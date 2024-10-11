"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { onBoardingSchema, onBoardingSchemaValidation } from "@/lib/zodSchema";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

export const onBoardingAction = async (prevState: any, data: FormData) => {
  const session = await auth();
  if (!session?.user) {
    return;
  }

  const submission = await parseWithZod(data, {
    schema: onBoardingSchemaValidation({
      async isUserNameUnique() {
        const isUnique = await prisma.user.findUnique({
          where: {
            userName: data.get("userName") as string,
          },
        });
        return !isUnique;
      },
    }),
    async: true,
  });

  console.log(submission);

  if (submission.status !== "success") {
    return submission.reply();
  }
  const update = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      userName: submission.value.userName,
      name: submission.value.fullName,
    },
  });
  redirect("/dashboard");
};
