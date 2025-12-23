"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface OrderDetailsPage {
  params: Promise<{ id: string }>;
}

export default function OrderConfirmation({ params }: OrderDetailsPage) {
  const [orderId, setOrderId] = useState<string>("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const resolveParams = async () => {
      const { id } = await params;
      setOrderId(id);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/${id}`
        );
        const data = await response.json();

        if (data.success) {
          setOrder(data.data);
        }
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };

    resolveParams();
  }, [params]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-10 text-center">
        <p className="text-gray-500">Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-10">
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center mb-8">
        <svg
          className="w-16 h-16 mx-auto text-green-500 mb-4"
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

        <h1 className="text-3xl font-bold text-green-600 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-gray-600">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
      </div>

      {order && (
        <div className="space-y-6">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-mono font-semibold">{order._id}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Order Status:</span>
                <span
                  className={`font-semibold ${
                    order.status === "completed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Payment Status:</span>
                <span
                  className={`font-semibold ${
                    order.paymentStatus === "paid"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {order.paymentStatus.charAt(0).toUpperCase() +
                    order.paymentStatus.slice(1)}
                </span>
              </div>

              {order.stripePaymentIntentId && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Intent:</span>
                  <span className="font-mono text-sm">
                    {order.stripePaymentIntentId}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-600">Order Date:</span>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Order confirmation email sent to your inbox</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>You will receive shipping updates via email</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Track your order in your account dashboard</span>
              </li>
            </ul>
          </div>

          <div className="flex gap-4">
            <Link
              href="/"
              className="flex-1 bg-primary text-white py-3 rounded font-semibold text-center hover:bg-primary/90"
            >
              Continue Shopping
            </Link>
            <Link
              href="/account"
              className="flex-1 border border-primary text-primary py-3 rounded font-semibold text-center hover:bg-primary/10"
            >
              View Account
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
