// "use client";

import Form from "@/components/register/form";

export default function Home() {
  return (
    // <AuthGoogleProvider>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Media Space</h1>
      <Form />
    </main>
    // </AuthGoogleProvider>
  );
}
