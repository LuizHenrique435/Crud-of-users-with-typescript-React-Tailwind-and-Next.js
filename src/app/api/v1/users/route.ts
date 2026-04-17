import { NextRequest, NextResponse } from "next/server";
import { createUser, getUsers } from "@/controllers/user.controller";

export async function GET() {
  const response = await getUsers();
  return NextResponse.json(response, { status: response.status });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const response = await createUser(body);
  return NextResponse.json(response, { status: response.status });
}
