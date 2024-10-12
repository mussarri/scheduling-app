"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  onBoardingSchema,
  onBoardingSchemaValidation,
  settingsSchema,
} from "@/lib/zodSchema";
import { parseWithZod } from "@conform-to/zod";
import { revalidatePath } from "next/cache";
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
      availabity: {
        createMany: {
          data: [
            {
              day: "Monday",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "Tuesday",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "Wednesday",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "Thursday",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "Friday",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "Saturday",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "Sunday",
              fromTime: "08:00",
              tillTime: "18:00",
            },
          ],
        },
      },
    },
  });
  redirect("/onboarding/grant-id");
};

export const settingsAction = async (prevState: any, data: FormData) => {
  const session = await auth();
  if (!session?.user) {
    return;
  }

  const submission = await parseWithZod(data, {
    schema: settingsSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  const update = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name: submission.value.fullName,
      image: submission.value.image,
    },
  });
  redirect("/dashboard");
};

export const actionAvailabity = async (data: FormData) => {
  const session = await auth();
  if (!session?.user) {
    return;
  }

  const object = Object.fromEntries(data.entries());

  const ids = Object.keys(object)
    .filter((item) => item.startsWith("id-"))
    .map((item) => item.replace("id-", ""))
    .map((id) => {
      return {
        id,
        isActive: object["isActive-" + id] === "on",
        fromTime: object["fromTime-" + id] as string,
        tillTime: object["tillTime-" + id] as string,
      };
    });

  try {
    await prisma.$transaction(
      ids.map((item) =>
        prisma.availabity.update({
          where: {
            id: item.id,
          },
          data: {
            isActive: item.isActive,
            fromTime: item.fromTime,
            tillTime: item.tillTime,
          },
        })
      )
    );

    revalidatePath("/dashboard/availabity");
  } catch (error) {
    console.log(error);
  }
};
