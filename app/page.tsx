import Base from "@/components/base";
import Container from "@/components/container";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Base>
      <Container>
        <section className="flex justify-between">
          <div className="mt-16">
            <h1 className="text-6xl font-extrabold text-blue-600">
              Media Space
            </h1>
            <h2 className="text-3xl mt-6 leading-10 mb-12">
              The <b className="border-b-4 pb-1 border-blue-500">easier way</b>{" "}
              to have all your contacts linked.
            </h2>
            <Link
              href="/login"
              className="bg-blue-600 text-white rounded-md py-3 px-8"
            >
              Start now
            </Link>
          </div>

          <div className="">
            <Image src={"/image.png"} alt="image" width={500} height={500} />
          </div>
        </section>
      </Container>
    </Base>
    // <Container>
    // </Container>
  );
}
