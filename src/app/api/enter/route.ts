import { NextResponse } from "next/server";
import { GATE_COOKIE, GATE_MAX_AGE, gateToken, sameSecret } from "@/lib/gate";

/**
 * Takes the password from the gate (PasswordGate) and, if it is right, sets
 * the cookie the proxy checks. Answers only yes or no: no hint of how close a
 * guess came, and a wrong one waits most of a second before it is answered,
 * which costs a person nothing and makes guessing by script slow.
 */
export async function POST(request: Request) {
  const expected = process.env.SITE_PASSWORD;
  // No password set means no gate (local development): there is nothing to enter.
  if (!expected) return NextResponse.json({ ok: true });

  let given = "";
  try {
    const body = (await request.json()) as { password?: unknown };
    if (typeof body.password === "string") given = body.password;
  } catch {
    // Not JSON. Treated as a wrong password.
  }

  if (!sameSecret(given, expected)) {
    await new Promise((resolve) => setTimeout(resolve, 700));
    return NextResponse.json({ ok: false }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }

  const response = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  response.cookies.set(GATE_COOKIE, gateToken(expected), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: GATE_MAX_AGE,
  });
  return response;
}
