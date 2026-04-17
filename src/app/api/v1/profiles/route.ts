import { NextRequest, NextResponse } from "next/server";
import { createProfile, getProfiles } from "@/controllers/profile.controller";

export async function GET() {
  const response = await getProfiles();
  return NextResponse.json(response, { status: response.status });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const response = await createProfile(body);
  return NextResponse.json(response, { status: response.status });
}
