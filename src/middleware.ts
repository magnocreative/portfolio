import { NextResponse, type NextRequest } from "next/server";

/**
 * A password gate for the whole site, on while the work is unfinished.
 *
 * Vercel's own password protection is a Pro feature that does not cover
 * production on Hobby, so this does the job in about forty lines instead.
 *
 * ONE SWITCH. The gate is on when SITE_PASSWORD is set in the environment and
 * off when it is not. Nothing else has to be remembered: robots.ts reads the
 * same variable and flips between "index everything" and "index nothing", so
 * deleting the variable removes the password AND restores crawling in one
 * action. The failure mode worth designing against here is not someone
 * guessing the password. It is launching six months from now with a robots
 * file still telling Google to stay away because a second switch was missed.
 *
 * The password itself never appears in this repository. It lives in Vercel
 * project settings, which is also why local development is never gated: the
 * variable is simply absent there.
 */

export const config = {
  // Everything, including images and the favicon. A gate that serves the
  // artwork to anyone who asks is decoration.
  matcher: "/((?!_next/static|_next/image).*)",
};

/** Constant time, so a wrong password cannot be narrowed down by timing it. */
function matches(given: string, expected: string): boolean {
  if (given.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < given.length; i++) {
    diff |= given.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

export function middleware(request: NextRequest) {
  const expected = process.env.SITE_PASSWORD;
  if (!expected) return NextResponse.next();

  const header = request.headers.get("authorization");

  if (header) {
    const [scheme, encoded] = header.split(" ");
    if (scheme === "Basic" && encoded) {
      try {
        const decoded = atob(encoded);
        const separator = decoded.indexOf(":");
        const given = separator === -1 ? "" : decoded.slice(separator + 1);
        if (matches(given, expected)) return NextResponse.next();
      } catch {
        // Malformed base64. Falls through to the challenge below.
      }
    }
  }

  return new NextResponse("This site is not open yet.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="magnocreative.com", charset="UTF-8"',
      // Never let a proxy or a browser hold on to the challenge or the page
      // behind it, or removing the password later will not look removed.
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
