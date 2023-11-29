// type MySpaceMediaProps = {
//   params: {
//     slug: string;
//   };
// };

import Links from "@/components/links";
import NavBar from "@/components/navbar";

export default function MySpaceMedia() {
  return (
    <main className="mt-36 px-20 relative">
      <NavBar />
      <div className="w-full justify-between flex items-center">
        <h1 className="text-blue-500">My Media Space</h1>

        <div className="flex gap-16 items-center">
          <p className="text-gray-400">http://mediaspace/my-link-name</p>
          <button className="bg-blue-600 shadow-sm text-white p-2 rounded-md font-bold">
            + Create my link name
          </button>
        </div>
      </div>
      <Links />
    </main>
  );
}
