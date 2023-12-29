import Base from "@/components/base";
import Container from "@/components/container";
import { Instagram, Link2Icon, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const medias = ["Web Design", "Portfolio", "Talk to me", "Instagram"];

export default function Home() {
  return (
    <Base>
      <Container>
        <section className="flex flex-col sm:flex-row justify-center sm:justify-between pb-28 mt-12 sm:mt-0">
          <div className="sm:mt-16 md:w-[50%] sm:w-[80%] text-center sm:text-start">
            <h1 className="text-xl font-bold text-blue-600">media space</h1>
            <h2 className="sm:text-5xl text-3xl mt-6 font-bold sm:leading-normal mb-12">
              The{" "}
              <b className="relative before:w-full before:z-[-1] before:bottom-1 before:absolute before:bg-[#56B3C8]/60 before:left-0 before:h-4">
                easier way
              </b>{" "}
              to have all your contacts linked.
            </h2>

            <Link
              href="/login"
              className="bg-blue-600 text-white rounded-md py-3 px-8"
            >
              Start now
            </Link>
          </div>

          <aside className="sm:w-[40%] w-full flex justify-center items-center mt-24 sm:mt-12 relative">
            <div className="w-full max-w-max  self-center h-full flex bg-gradient-to-l shadow-xl shadow-cyan-200 from-blue-600 to-blue-800 rounded-2xl items-center flex-col">
              <div className="w-24 h-24 overflow-auto rounded-full sm:mt-16 mt-8 overflow-hidden">
                <Image
                  src={"/imageRe.png"}
                  alt="image"
                  width={150}
                  height={150}
                  className=""
                />
              </div>

              <div className="mt-8 text-white px-8 md:px-12 text-center">
                <h1 className="text-xl font-bold">Renata Karolina</h1>
                <h2>Software Developer</h2>
              </div>

              <ul className="w-full px-4 mt-6 pb-10">
                {medias.map((item, i) => (
                  <li
                    key={i}
                    className="w-full mt-2 bg-blue-900 p-2 rounded-full text-center text-white"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="absolute right-12 bottom-[-2rem] flex gap-3 bg-yellow-500 p-2 rounded-lg shadow-xl">
              <span className="p-3 bg-white rounded-full text-yellow-700">
                <Instagram />
              </span>
              <span className="p-3 bg-white rounded-full text-yellow-700">
                <Youtube />
              </span>
              <span className="p-3 bg-white rounded-full text-yellow-700">
                <Link2Icon />
              </span>
            </div>
          </aside>
        </section>
      </Container>
    </Base>
  );
}
