import { nylas, nylasConfig } from "@/lib/nylas";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return;
  }

  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json("Code error", { status: 400 });
  }

  try {
    const response = await nylas.auth.exchangeCodeForToken({
      clientId: nylasConfig.clientId as string,
      clientSecret: nylasConfig.apiKey,
      redirectUri: nylasConfig.redirectUrl,
      code: code,
    });
    const { grantId, email } = response;

    await prisma.user.update({
      where: {
        id: session.user?.id,
      },
      data: {
        grandEmail: email,
        grantId: grantId,
      },
    });
  } catch (error) {
    console.log("Error ", error);
  }

  redirect("/");
}
