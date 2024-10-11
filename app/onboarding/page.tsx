"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SubmitButton from "../components/SubmitButton";
import { useFormState } from "react-dom";
import { onBoardingAction } from "../action";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { onBoardingSchema } from "@/lib/zodSchema";

const page = () => {
  const [lastResult, action] = useFormState(onBoardingAction, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: onBoardingSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="flex justify-center items-center w-full h-full">
      <Card className="w-[360px]">
        <CardHeader>
          <CardTitle>
            <div className="text-3xl font-semibold">
              Welcome to Sari<span className="text-primary">Cal</span>
            </div>
          </CardTitle>
          <CardDescription>
            We need to following information to setup your profile.
          </CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  name={fields.fullName.name}
                  defaultValue={fields.fullName.initialValue}
                  key={fields.fullName.key}
                  id="fullName"
                  placeholder="Full name"
                />
              </div>
              <small>{fields.fullName.errors}</small>
            </div>
            <div className="grid w-full items-center gap-4  mt-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <div className="flex">
                  <div className="bg-muted border border-r-none rounded-l flex items-center text-center justify-center px-3 text-sm text-muted-foreground">
                    SariCal.com/
                  </div>
                  <Input
                    id="username"
                    placeholder="Username"
                    className="rounded-l-none"
                    name={fields.userName.name}
                    defaultValue={fields.userName.initialValue}
                    key={fields.userName.key}
                  />
                </div>
                <small>{fields.userName.errors}</small>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <SubmitButton text="Submit" className="" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default page;
