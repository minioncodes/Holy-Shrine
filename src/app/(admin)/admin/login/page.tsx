"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("adminToken");
    if (t) router.replace("/admin");
  }, [router]);

  return (
    <div className="max-w-md mx-auto rounded-2xl border p-6 space-y-3">
      <h1 className="text-2xl font-semibold">Admin login</h1>
      <p className="text-sm text-gray-700">
        Paste your <span className="font-mono">ADMIN_TOKEN</span> (from server env). Stored in your browser only.
      </p>

      <input
        className="w-full rounded-xl border px-3 py-2 font-mono"
        placeholder="ADMIN_TOKEN"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />

      <button
        className="rounded-xl bg-black text-white px-4 py-2"
        onClick={() => {
          localStorage.setItem("adminToken", token.trim());
          router.push("/admin");
        }}
      >
        Continue
      </button>
    </div>
  );
}
