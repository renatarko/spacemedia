import { NextResponse } from "next/server";

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://spacemedia.vercel.app", "https://www.spacemedia.vercel.app"]
    : [
        "https://spacemedia.vercel.app",
        "https://www.spacemedia.vercel.app",
        "http://localhost:3000",
        "https://google.com.br",
        "https://www.google.com.br",
      ];

const allowedMethod = ["GET"];
export function middleware(req: Request) {
  const origin = req.headers.get("origin");

  if (origin && allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, POST",
        "Content-Type": "text/plain",
      },
    });
  } else {
    return new NextResponse(null, {
      status: 400,
      statusText: "Bad Request",
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}

export const config = {
  matcher: "/api/auth",
};
