import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/(.*)/edit", "/(.*)/profile"]);
const isAuthRoute = createRouteMatcher(["/sign-in", "/sign-up"]);
const isHome = createRouteMatcher(["/"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims, debug } = auth();

  if (isAuthRoute(req) && userId !== null) {
    return NextResponse.redirect(
      new URL(`/${sessionClaims.email.split("@")[0]}/edit`, req.url)
    );
  }

  if (isProtectedRoute(req) && userId === null) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (isHome(req)) {
    if (userId) {
      return NextResponse.redirect(
        new URL(`/${sessionClaims.email.split("@")[0]}/edit`, req.url)
      );
    } else {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(.*)", "/(api|trpc)(.*)"],
};
