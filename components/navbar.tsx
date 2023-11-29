"use client";

import { useState } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <nav
      className={`w-16 flex flex-col items-center p-4 bg-blue-500 h-[50rem] absolute left-0 duration-200 hover:w-[10rem] hover:shadow-lg`}
    >
      <p>+</p>
      <p>-</p>
      <p>link</p>
    </nav>
  );
}
