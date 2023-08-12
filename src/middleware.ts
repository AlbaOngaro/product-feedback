import { NextRequest, NextResponse } from "next/server";

import { surreal } from "lib/surreal";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    if (!["/login", "/register"].some((path) => req.url.endsWith(path))) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return;
  }

  try {
    surreal.authenticate(token);
    if (["/login", "/register"].some((path) => req.url.endsWith(path))) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } catch (error: unknown) {
    if (!["/login", "/register"].some((path) => req.url.endsWith(path))) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
