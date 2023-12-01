// type MySpaceMediaProps = {
//   params: {
//     slug: string;
//   };
// };

import Container from "@/components/container";
import Links from "@/components/links";
import NavBar from "@/components/navbar";
import Phone from "@/components/phone";
import { Plus } from "lucide-react";

export default function MySpaceMedia() {
  return (
    <>
      <NavBar />
      <div className="w-full justify-between flex mt-4 items-center px-24">
        <h1 className="text-blue-500">My Media Space</h1>

        <div className="flex gap-16 items-center">
          <p className="text-gray-400">http://mediaspace/my-link-name</p>
          <button className="bg-blue-600 shadow-sm flex gap-2 text-white p-2 rounded-md font-bold">
            <Plus /> Link name
          </button>
        </div>
      </div>

      <Container>
        <main className="mt-16 w-full mb-8 grid md:grid-cols-2 grid-cols-1 h-screen md:px-20 sm:pl-24 pr-0 pl-0 sm:pr-12 relative">
          <Links />

          <Phone />
          {/* <aside className="px-6 justify-self-end overflow-x-hidden relative pb-8 h-[44rem] overflow-y-auto border-[0.5rem] sm:border-[1.8rem] lg:w-[75%] w-full flex flex-col items-center rounded-2xl border-black">
            <Image
              src={"/image2.png"}
              alt={`Foto de`}
              className="w-24 h-24 rounded-full border-4 border-white mt-8 z-10 shadow-lg"
              width={300}
              height={300}
            />
            <div className="flex flex-col items-center z-10 mt-8">
              <h1 className="text-2xl font-bold">Renata Karolina</h1>
              <h2 className="text-xl">Software Developer</h2>

              <p className="mt-4 text-lg font-bold">@renata_rko</p>
            </div>

            <ul className="flex flex-col gap-4 mt-8 w-full">
              <Link path="whts" icon={<Phone />} background="#e4e">
                WhatsApp
              </Link>

              <Link path="whts" icon={<Instagram />} background="#e4e">
                Instagram
              </Link>

              <Link path="whts" icon={<Linkedin />} background="#e4e">
                Linkedin
              </Link>
            </ul>

            <p className="text-blue-500 font-bold text-sm mt-12">media space</p>
          </aside> */}
        </main>
      </Container>
    </>
  );
}
