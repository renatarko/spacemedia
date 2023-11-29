import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-[#f8f8f8] relative items-center justify-between p-24 gap-4">
      <div className="mt-16 ">
        <h1 className="text-6xl font-extrabold text-blue-600">Media Space</h1>
        <h2 className="text-3xl mt-6 leading-10">
          The <b className="border-b-4 pb-2 border-blue-500">easier way</b> to
          have all your contacts linked.
        </h2>

        <button className="bg-blue-600 text-white rounded-md mt-12 py-2 px-8">
          Start now
        </button>
      </div>

      <div className="absolute right-0 top-28">
        <Image src={"/image.png"} alt="image" width={500} height={500} />
      </div>
    </main>
  );
}
