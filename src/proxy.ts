import { NextResponse, type NextRequest } from "next/server";
import { GATE_COOKIE, gateToken, sameSecret } from "@/lib/gate";

/**
 * A password gate for the whole site, on while the work is unfinished.
 *
 * Vercel's own password protection is a Pro feature that does not cover
 * production on Hobby, so the site does it itself.
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
 *
 * HOW IT LETS PEOPLE IN (November 2026). It used to answer with the browser's
 * own Basic auth prompt: a system dialog with no welcome, no brand, and no way
 * to say what the password is for. Now a page asked for without the gate
 * cookie is answered with /gate, under the address that was asked for: the
 * home page's opening, blurred, behind a card with the mark, a welcome and the
 * password field (PasswordGate). The password goes to /api/enter, which sets
 * the cookie, and the visitor lands on the page they came for. Anything else
 * asked for without the cookie (an image, a PDF, a prefetch) gets a plain 401:
 * the gate shows the opening of the home page and nothing further in.
 *
 * Basic auth is still accepted, silently, for scripts (`npm run resume:pdf`,
 * curl -u). No browser is ever asked for it: there is no challenge header.
 *
 * `proxy.ts`, not `middleware.ts`: Next 16 renamed the convention. The
 * runtime is Node, which the HMAC in src/lib/gate.ts needs.
 */

export const config = {
  // Everything but the build's own scripts and styles, which the gate page
  // itself needs and which hold no content. Images are inside the gate now,
  // both optimized (/_next/image) and as built (/_next/static/media): they
  // used to be excluded, which left every case study image one URL away from
  // anyone. The fonts in /_next/static/media are let through below.
  matcher: "/((?!_next/static/(?!media/)).*)",
};

/** Reached without the cookie: the gate itself, the route it posts to, and the
 *  site's icons. Safari and iOS also ask for /apple-touch-icon.png (and the
 *  -precomposed name) at the root whatever the page declares, and an answer
 *  of 401 there left them showing whatever icon they had cached for the
 *  domain: for magnocreative.com, the old host's (Alejandro, November 2026).
 *  public/ has both, copies of the 180px apple-icon. */
const OPEN = new Set([
  "/gate",
  "/api/enter",
  "/favicon.ico",
  "/icon.svg",
  "/apple-icon.png",
  "/apple-touch-icon.png",
  "/apple-touch-icon-precomposed.png",
]);

function basicAuthPasses(request: NextRequest, expected: string): boolean {
  const header = request.headers.get("authorization");
  if (!header) return false;
  const [scheme, encoded] = header.split(" ");
  if (scheme !== "Basic" || !encoded) return false;
  try {
    const decoded = atob(encoded);
    const separator = decoded.indexOf(":");
    return separator !== -1 && sameSecret(decoded.slice(separator + 1), expected);
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  const expected = process.env.SITE_PASSWORD;
  if (!expected) return NextResponse.next();

  const { pathname } = request.nextUrl;
  const cookie = request.cookies.get(GATE_COOKIE)?.value;
  const inside = (cookie !== undefined && sameSecret(cookie, gateToken(expected))) || basicAuthPasses(request, expected);

  if (inside) {
    // Someone already in who opens /gate directly has nothing to enter.
    if (pathname === "/gate") return NextResponse.redirect(new URL("/", request.url));
    return NextResponse.next();
  }

  if (OPEN.has(pathname)) return NextResponse.next();
  // The gate's own type: Poppins, self-hosted, from the build's media folder.
  if (pathname.startsWith("/_next/static/media/") && /\.(woff2?|ttf)$/.test(pathname)) return NextResponse.next();

  // A page, asked for by a browser: answer with the gate, under the same
  // address, so entering the password lands the visitor where they meant to
  // go. A client-side navigation or prefetch (an RSC request) is not a page
  // load, and gets the 401 below instead of a copy of the gate.
  const wantsPage =
    request.method === "GET" &&
    (request.headers.get("accept") ?? "").includes("text/html") &&
    !request.headers.has("rsc");
  if (wantsPage) {
    const response = NextResponse.rewrite(new URL("/gate", request.url));
    // Never let a proxy or a browser hold on to the gate under a real
    // address, or entering the password would show it again from cache.
    response.headers.set("Cache-Control", "no-store, max-age=0");
    response.headers.set("X-Robots-Tag", "noindex");
    return response;
  }

  return new NextResponse("This site is not open yet.", {
    status: 401,
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}
