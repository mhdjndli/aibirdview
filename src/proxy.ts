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

  // Search and filter URLs (/tools?q=voice+clones) render the same page as
  // the clean URL. Google indexed some anyway despite the canonical, so tell
  // it plainly not to index them while still following their links. Listing
  // pages only: a tool page or post reached with ?utm_ tags keeps its canonical.
  if (req.nextUrl.search && /^\/(tools|blog|categories(\/[^/]+)?|blog\/category\/[^/]+)\/?$/.test(path)) {
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, follow");
    return res;
  }
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
