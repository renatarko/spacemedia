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
    <main className="grid grid-cols-mediaSpace h-screen justify-items-center">
      <NavBar />

      <div className="grid grid-cols-2">{children}</div>
      {/* <Container>{children}</Container> */}
    </main>
  );
}
