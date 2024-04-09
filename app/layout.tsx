"use client";

import PrivateRoute from "@/components/privateRoute";
import { AuthGoogleProvider } from "@/context/authGoogle";
import PreviewProvider from "@/context/preview";
import { routesApp } from "@/functions/constant";
import { Inter } from "next/font/google";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter()
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const checkRoutesPrivate = () => {
    const hasTab = searchParams.has("tab");
    const isPrivate = pathname.includes(routesApp.private.my_media) || hasTab
    return isPrivate;
  };

  const isPrivateRouter = checkRoutesPrivate();

  // if (isPrivateRouter) {
  //   router.push(routesApp.public.home)
  // }

  return (
    <html lang="en">
      <Head>
        <title>Media Space - Centralize Your Contacts and Social Media</title>
        <meta name="description" content="Create a centralized space to easily manage all your contacts and social media. With Media Space, you can organize your contact information and social media links in one convenient place. Simplify your online presence and stay connected with those who matter." />
      </Head>
      <body className={inter.className}>
        <NextTopLoader showSpinner={false} color="#26c9ea" height={4} />
        <AuthGoogleProvider>
          <PreviewProvider>
            <Toaster
              toastOptions={{
                position: "bottom-right",
                style: {
                  background: "#0b89af",
                  color: "#ffff",
                },
              }}
            />
            <main className="relative flex flex-col justify-between">
              {!isPrivateRouter && children}
              {isPrivateRouter && <PrivateRoute>{children}</PrivateRoute>}
            </main>
          </PreviewProvider>
        </AuthGoogleProvider>

      </body>
    </html>
  );
}
