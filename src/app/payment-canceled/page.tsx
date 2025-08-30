import Link from "next/link";

export default function PaymentCanceled() {
  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <svg
          className="w-16 h-16 mx-auto text-red-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
        <h2 className="text-2xl font-bold text-gray-800 mt-4">
          Payment Canceled
        </h2>
        <p className="text-gray-600 mt-2">
          Your payment has been canceled. If this was a mistake, you can try
          again.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/plan-bills/subscriptions"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
          >
            Try Again
          </Link>
          <Link href="/" className="text-gray-500 hover:underline">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
