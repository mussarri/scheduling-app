import { conformZodMessage } from "@conform-to/zod";
import { z } from "zod";

export const onBoardingSchema = z.object({
  fullName: z.string().min(3).max(50),
  userName: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-zA-Z0-9-]+$/, {
      message: "Only letters, numbers and -.",
    }),
});

export const onBoardingSchemaValidation = (options?: {
  isUserNameUnique: () => Promise<Boolean>;
}) => {
  return z.object({
    fullName: z.string().min(3).max(50),
    userName: z
      .string()
      .min(3)
      .max(50)
      .regex(/^[a-zA-Z0-9-]+$/, {
        message: "Only letters, numbers and -.",
      })
      .pipe(
        z.string().superRefine((_, ctx) => {
          if (typeof options?.isUserNameUnique !== "function") {
            ctx.addIssue({
              code: "custom",
              message: conformZodMessage.VALIDATION_UNDEFINED,
            });
            return;
          }
          return options.isUserNameUnique().then((isUnique) => {
            if (!isUnique) {
              ctx.addIssue({
                code: "custom",
                message: "Username is already exist.",
              });
            }
          });
        })
      ),
  });
};
