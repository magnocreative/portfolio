import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * The password gate's two checks, shared by the proxy (every request) and the
 * route that takes the password (src/app/api/enter). Server only: the
 * password never reaches the browser, and neither does anything that could
 * test a guess one character at a time.
 *
 * Entering the password sets one cookie. Its value is not the password but an
 * HMAC of a fixed label keyed by it, so the cookie proves the visitor knew the
 * password without carrying it, and changing SITE_PASSWORD in Vercel signs
 * everyone out at once: every old cookie stops matching.
 */

export const GATE_COOKIE = "mc_gate";

/** Thirty days. Long enough that a reviewer coming back next week walks in. */
export const GATE_MAX_AGE = 60 * 60 * 24 * 30;

export function gateToken(password: string): string {
  return createHmac("sha256", password).update("magnocreative.com gate v1").digest("base64url");
}

/** Constant time, so a wrong guess cannot be narrowed down by timing it. */
export function sameSecret(given: string, expected: string): boolean {
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
