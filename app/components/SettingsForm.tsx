"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import SubmitButton from "./SubmitButton";
import { settingsAction } from "../action";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { settingsSchema } from "@/lib/zodSchema";
import Image from "next/image";
import { Trash2 } from "lucide-react";

interface settingsFormProps {
  name: string;
  email: string;
  image: string;
}

const SettingsForm = ({ data }: { data: any }) => {
  const [lastResult, action] = useFormState(settingsAction, undefined);
  const [image, setImg] = useState(data.image);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: settingsSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle className="text-3xl">Settings</CardTitle>
        <CardDescription>Manage your account settings!</CardDescription>
      </CardHeader>
      <form id={form.id} onSubmit={form.onSubmit} action={action}>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              defaultValue={data.name}
              key={fields.fullName.key}
              name={fields.fullName.name}
              id="fullName"
              placeholder="Full name"
            />
          </div>
          <small>{fields.fullName.errors}</small>
          <div className="flex flex-col gap-2 mt-4">
            <Label htmlFor="email">Email</Label>
            <Input
              defaultValue={data.email}
              disabled
              id="email"
              placeholder="Email"
            />
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <Label htmlFor="email">Profile Image</Label>
            {image && (
              <div className="relative w-fit">
                <Image
                  height={40}
                  width={40}
                  className="rounded-full"
                  src={data.image}
                  alt=""
                />
                <div
                  className="absolute -right-5 top-0 cursor-pointer"
                  onClick={() => {
                    setImg("");
                  }}
                >
                  <Trash2 className="size-4 text-red-500 hover:text-red-400" />
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Save" className="w-fit px-5" />
        </CardFooter>
      </form>
    </Card>
  );
};

export default SettingsForm;
