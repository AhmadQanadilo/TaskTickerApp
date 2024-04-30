import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET() {
  const cookieStore = cookies();

  const token = cookieStore.get("session")?.value;

  if (!token) {
    return NextResponse.json({
      status: 401,
      message: "Invalid session",
    });
  } else {
    return NextResponse.json({
      status: 200,
      message: "user is authenticated",
    });
  }
}
