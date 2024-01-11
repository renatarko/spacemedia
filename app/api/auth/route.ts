import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { token, uid } = await request.json();

    if (!token || !uid)
      return NextResponse.json({ message: "Not token found" }, { status: 400 });

    const cookieOption: Omit<ResponseCookie, "name" | "value"> = {
      maxAge: 60 * 60 * 24,
      expires: 1200,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    };

    const response = NextResponse.json({ status: 200 });
    response.cookies.set({
      name: process.env.NEXT_PUBLIC_COOKIE_KEY!,
      value: token,
      ...cookieOption,
    });
    response.cookies.set({
      name: process.env.NEXT_PUBLIC_COOKIE_UID!,
      value: uid,
      ...cookieOption,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function GET() {
  try {
    const uid = cookies().get(process.env.NEXT_PUBLIC_COOKIE_UID!)?.value;
    if (!uid) return NextResponse.json({ message: "UID not found" });

    return NextResponse.json({ uid });
  } catch (error) {
    console.log(error);
  }
}
