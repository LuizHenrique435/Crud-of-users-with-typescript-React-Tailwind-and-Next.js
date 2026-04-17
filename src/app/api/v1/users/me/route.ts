import { NextRequest, NextResponse } from "next/server";
import { findMyself, updateCurrentUser } from "@/controllers/user.controller";
import { getSession } from "@/lib/auth/session";
import { failure } from "@/controllers/@base";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json(failure("Sessão inválida.", "Faça login novamente.", 401), { status: 401 });

  const response = await findMyself(session.userId);
  return NextResponse.json(response, { status: response.status });
}

export async function PATCH(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json(failure("Sessão inválida.", "Faça login novamente.", 401), { status: 401 });

  const body = await request.json();
  const response = await updateCurrentUser(session.userId, body);
  return NextResponse.json(response, { status: response.status });
}
