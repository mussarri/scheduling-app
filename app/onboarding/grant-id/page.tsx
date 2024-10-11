import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarCheck2 } from "lucide-react";

const onBoardingRoute2 = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Card className="w-[360px]">
        <CardHeader>
          <CardTitle>
            <div className="text-3xl font-semibold">You are almost done.</div>
          </CardTitle>
          <CardDescription>
            We have to connect your calender to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full flex gap-2">
            <CalendarCheck2 className="size-4" />
            <Link href={"/api/auth"}>Connect calender to your account.</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default onBoardingRoute2;
