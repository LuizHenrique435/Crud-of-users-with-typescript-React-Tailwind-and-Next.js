import { createHmac } from "node:crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "user-manager-session";

function sign(value: string) {
  return createHmac("sha256", process.env.AUTH_SECRET ?? "dev-secret").update(value).digest("hex");
}

export async function createSessionCookie(payload: { userId: number }) {
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const value = `${encoded}.${sign(encoded)}`;
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    path: "/"
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSession() {
  const cookieStore = await cookies();
  const value = cookieStore.get(SESSION_COOKIE)?.value;
  if (!value) return null;

  const [encoded, signature] = value.split(".");
  if (!encoded || !signature) return null;
  if (sign(encoded) !== signature) return null;

  try {
    return JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as { userId: number };
  } catch {
    return null;
  }
}
