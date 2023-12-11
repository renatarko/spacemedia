import NavBar from "@/components/navbar";
import { ReactNode } from "react";

type MediaSpaceLayoutProps = {
  children: ReactNode;
};

export default function MediaSpaceLayout({ children }: MediaSpaceLayoutProps) {
  // const currentUser = auth.currentUser?.uid;
  // console.log(currentUser);

  // if (currentUser === null) {
  //   return <div>faça o login</div>;
  // }
  return (
    <main className="grid sm:grid-cols-mediaSpace grid-cols-1 h-screen justify-items-center">
      <NavBar />

      <div className="grid md:grid-cols-2 grid-cols-1 pb-4 w-full divide-y-2 divide divide-gray-300 px-4 xl:px-48">
        {children}
      </div>
      {/* <Container>{children}</Container> */}
    </main>
  );
}
