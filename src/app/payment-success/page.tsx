"use client";
import { useRouter } from "next/navigation";
import { BiCheckCircle } from "react-icons/bi";

export default function PaymentSuccess() {
  const router = useRouter();

  return (
    <div className="w-full flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-xl">
        <BiCheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        <h2 className="text-2xl font-bold mt-4 text-gray-800">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mt-2">
        Thank you for your payment. Your transaction has been completed.You
          now have full access to your dashboard and are ready to post a job.
        </p>

        <div className="mt-6 space-x-4">
          <button
            onClick={() => router.replace("/")}
            className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition cursor-pointer"
          >
            Go to Home
          </button>
          <button
            onClick={() => router.replace("/overview")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
