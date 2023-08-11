import { NextRequest, NextResponse } from "next/server";

import { pb } from "lib/pocketbase";

export async function middleware(req: NextRequest) {
  const cookies = req.headers.get("cookie");

  if (!cookies) {
    if (!["/login", "/register"].some((path) => req.url.endsWith(path))) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return;
  }

  pb.authStore.loadFromCookie(cookies);

  try {
    // get an up-to-date auth store state by veryfing and refreshing the loaded auth model (if any)
    pb.authStore.isValid && (await pb.collection("users").authRefresh());
    if (["/login", "/register"].some((path) => req.url.endsWith(path))) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } catch (_) {
    // clear the auth store on failed refresh
    pb.authStore.clear();
    if (!["/login", "/register"].some((path) => req.url.endsWith(path))) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
