"use client";

export default function SuccessModal({ orderId }: { orderId: string | null }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
        <div className="mb-4">
          <svg
            className="w-16 h-16 mx-auto text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-4">
          Your order has been placed successfully.
        </p>

        {orderId && (
          <div className="bg-gray-100 p-3 rounded mb-4">
            <p className="text-sm text-gray-600">Order ID:</p>
            <p className="font-mono font-semibold">{orderId}</p>
          </div>
        )}

        <p className="text-gray-600 text-sm mb-6">
          You will receive an email confirmation shortly with order details and
          tracking information.
        </p>

        <a
          href="/"
          className="inline-block bg-primary text-white px-6 py-2 rounded font-semibold hover:bg-primary/90"
        >
          Continue Shopping
        </a>
      </div>
    </div>
  );
}
