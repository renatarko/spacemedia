import ProfileSkeleton from "@/components/Skeletons/profile";

export default function Loading() {
  return (
    <div className="h-full md:px-12 px-1 flex flex-col items-center w-full max-w-xl">
      <ProfileSkeleton />
      <p className="w-full h-2 bg-gray-400 animate-pulse">carregando...</p>
      {/* <div className="px-6 h-60 shadow-2xl mt-20 relative pb-16 bg-gray-300 animate-pulse lg:w-[75%] w-full flex flex-col items-center rounded-2xl border-gray-700">
        <p>carregando...</p>

        <div className="w-24 relative h-24 rounded-full border-4 animate-pulse bg-gray-200 border-white mt-8 z-10 shadow-lg overflow-hidden"></div>

        <ul className="mt-8">
          {Array(3)
            .fill(0)
            .map((item) => (
              <li className="w-full h-2 rounded-full bg-gray-400" key={item}>
                {item}
              </li>
            ))}
        </ul>
      </div> */}
    </div>
  );
}
