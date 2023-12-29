import Base from "@/components/base";
import Container from "@/components/container";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Base>
      <Container>
        <section className="flex flex-col sm:flex-row justify-center sm:justify-between">
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

          <div className="w-[15rem] h-[30rem] bg-gradient-to-l from-blue-600 to-blue-800 rounded-2xl flex items-center flex-col">
            <div className="w-24 h-24 overflow-auto rounded-full mt-12">
              <Image
                src={"/image2.png"}
                alt="image"
                width={150}
                height={150}
                className=""
              />
            </div>

            <div className="mt-8 text-white">
              <h1 className="text-xl font-bold">Renata Karolina</h1>
              <h2>Software Developer</h2>
            </div>

            <ul className="w-full px-4 mt-6">
              <li className="w-full bg-blue-900 p-2 rounded-full text-center text-white">
                Whatsapp
              </li>
            </ul>
          </div>
        </section>
      </Container>
    </Base>
    // <Container>
    // </Container>
  );
}
