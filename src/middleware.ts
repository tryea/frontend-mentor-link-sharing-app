import {
  clerkMiddleware,
  createRouteMatcher,
  currentUser,
} from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/(.*)/edit", "/(.*)/profile"]);
const isAuthRoute = createRouteMatcher(["/sign-in", "/sign-up"]);

export default clerkMiddleware((auth, req) => {
  const { userId, sessionClaims } = auth();

  if (isAuthRoute(req) && userId !== null) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isProtectedRoute(req) && userId === null) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(.*)", "/(api|trpc)(.*)"],
};
