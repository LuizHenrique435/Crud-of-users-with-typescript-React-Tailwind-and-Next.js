import { NextRequest, NextResponse } from "next/server";
import { createSessionCookie, clearSessionCookie } from "@/lib/auth/session";
import { signIn } from "@/controllers/user.controller";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const response = await signIn(body.username ?? "", body.password ?? "");

  if (!response.success) {
    return NextResponse.json(response, { status: response.status });
  }

  await createSessionCookie(response.data);
  return NextResponse.json(response, { status: 200 });
}

export async function DELETE() {
  await clearSessionCookie();
  return NextResponse.json({ success: true }, { status: 200 });
}
