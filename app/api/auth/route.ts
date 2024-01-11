import cors from "cors";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const corsMiddleware = cors({
  origin: ["http://localhost:3000", "https://spacemedia.vercel.app"],
  methods: ["POST", "GET"],
  optionsSuccessStatus: 204,
});

cors({
  origin: ["http://localhost:3000", "https://spacemedia.vercel.app"],
  methods: ["POST", "GET"],
});

export async function POST(request: Request, res: Request) {
  cors({
    origin: ["http://localhost:3000", "https://spacemedia.vercel.app"],
    methods: ["POST", "GET"],
  });
  res.headers.set(
    "Access-Control-Allow-Origin",
    "https://spacemedia.vercel.app/"
  );
  res.headers.set("Access-Control-Allow-Methods", "POST");
  res.headers.set(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

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

export async function GET(req: Request, res: Response) {
  res.headers.set(
    "Access-Control-Allow-Origin",
    "https://spacemedia.vercel.app/"
  );
  res.headers.set("Access-Control-Allow-Methods", "GET");
  res.headers.set(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  try {
    const uid = cookies().get(process.env.NEXT_PUBLIC_COOKIE_UID!)?.value;
    if (!uid) return NextResponse.json({ message: "UID not found" });

    return NextResponse.json({ uid });
  } catch (error) {
    console.log(error);
  }
}
