import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const host = req.headers.get("host");
  if (host?.startsWith("www.")) {
    const url = req.nextUrl.clone();
    url.host = host.slice(4);
    url.port = "";
    url.protocol = "https";
    return NextResponse.redirect(url, 308);
  }

  const path = req.nextUrl.pathname;
  if (path.startsWith("/admin") && path !== "/admin/login" && !req.auth?.user) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.search = "";
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.href);
    return NextResponse.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
