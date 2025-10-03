"use client";

import { useRouter } from "next/navigation";
import { BiHome } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";

export default function Unauthorized() {
  const router = useRouter();
  return (
    <main className="h-screen flex flex-col justify-center items-center gap-2.5">
      <h1 className="text-lg lg:text-xl">401 - Unauthorized !!</h1>
      <p className="text-center max-w-xl">
        Please log in to access this page.
        Based on your role, you'll have access to specific features. Ensure you
        have the appropriate permissions to continue.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-3">
        <button
          onClick={() => router.replace("/")}
          className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-all duration-200 group shadow-sm hover:shadow-md"
        >
          <BiHome size={20} />
          Home
        </button>
        <button
          onClick={() => router.push("/sign-in")}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 group shadow-lg hover:shadow-xl"
        >
          Sign In
          <BsArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform duration-200"
          />
        </button>
      </div>
    </main>
  );
}
