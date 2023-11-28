"use client";

import { useAuth } from "@/context/authGoogle";

export default function Form() {
  const { signWithGoogle } = useAuth();

  return (
    <div>
      <div className="flex flex-col">
        <label>Nome</label>
        <input />
      </div>

      <div className="flex flex-col">
        <label>Email</label>
        <input />
      </div>

      <div className="flex flex-col">
        <label>Pin</label>
        <input />
      </div>

      <button type="button" onClick={signWithGoogle}>
        Logar com Google
      </button>
    </div>
  );
}
