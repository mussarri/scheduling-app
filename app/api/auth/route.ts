import { nylas, nylasConfig } from "@/lib/nylas";
import { redirect } from "next/navigation";

export function GET() {
  const authUrl = nylas.auth.urlForOAuth2({
    clientId: nylasConfig.clientId as string,
    redirectUri: nylasConfig.redirectUrl as string,
  });

  return redirect(authUrl);
}
