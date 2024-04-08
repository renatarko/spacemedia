import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Request) {
  const origin = req.headers.get("origin");

  try {
    const { token, uid } = await req.json();

    if (!token || !uid)
      return NextResponse.json({ message: "Not token found" }, { status: 400 });

    const cookieOption: Omit<ResponseCookie, "name" | "value"> = {
      maxAge: 60 * 60 * 24,
      expires: 1200,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    };

    const response = new NextResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
      },
    });

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

export async function GET(req: Request, res: Response) {
  const origin = req.headers.get("origin");
  try {
    const uid = cookies().get(process.env.NEXT_PUBLIC_COOKIE_UID!)?.value;

    if (!uid) return NextResponse.json(null);

    return new NextResponse(JSON.stringify(uid), {
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE() {
  try {
    const tokenSaved = process.env.NEXT_PUBLIC_COOKIE_UID!;
    const uidSaved = process.env.NEXT_PUBLIC_COOKIE_KEY!;
    cookies().delete(tokenSaved);
    cookies().delete(uidSaved);

    return new NextResponse(null, {
      statusText: "Cookie removed successful",
    });
  } catch (error) {
    console.log(error);
  }
}
