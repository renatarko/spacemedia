import { NextResponse } from "next/server";

const allowedOrigins = [
  "https://spacemedia.vercel.app",
  "https://www.spacemedia.vercel.app",
];

export function middleware(req: Request) {
  const origin = req.headers.get("origin");

  if (process.env.NODE_ENV === "development") {
    return new NextResponse(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
      },
    });
  }

  if (origin && allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, POST",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
      },
    });
  } else {
    return new NextResponse(null, {
      status: 400,
      statusText: "Bad Request",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export const config = {
  matcher: "/api/auth",
};
