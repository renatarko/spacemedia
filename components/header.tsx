import Link from "next/link";

export default function Header() {
  const headerLinks = ["product"];
  return (
    <header className="flex z-50 justify-between fixed top-0 left-0 right-0 items-center py-8 px-16 bg-white">
      <Link href={"/"} className="font-extrabold text-blue-500 text-lg">
        media space
      </Link>

      <nav className="inline-flex gap-4 items-center">
        {headerLinks.map((link, i) => (
          <Link
            key={i}
            href={`/${link}`}
            className="font-medium hover:bg-blue-50 py-2 px-4 rounded-md"
          >
            {link}
          </Link>
        ))}

        <Link
          href={"/login"}
          className="ml-10 bg-blue-600 font-medium py-2 px-4 text-white rounded-md"
        >
          Login
        </Link>
      </nav>
    </header>
  );
}
