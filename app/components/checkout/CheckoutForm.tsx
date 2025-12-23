"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import { getStripe } from "@/app/lib/stripe";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Stripe } from "@stripe/stripe-js";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";

interface OrderFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  orderNotes: string;
}

function PaymentForm({
  stripe,
  formData,
}: {
  stripe: Stripe | null;
  formData: OrderFormData;
}) {
  const elements = useElements();
  const { cart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const subtotal = cart.reduce(
    (a: number, c: any) => a + c.price * c.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const shippingCost = 5.0;
  const total = subtotal + tax + shippingCost;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !formData.fullName) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Step 1: Create Payment Intent
      const paymentIntentResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/payment-intent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cart.map((item: any) => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.price,
              productTitle: item.name,
            })),
            subtotal: parseFloat(subtotal.toFixed(2)),
            tax: parseFloat(tax.toFixed(2)),
            shippingCost,
            total: parseFloat(total.toFixed(2)),
            shippingAddress: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country,
            email: formData.email,
            phone: formData.phone,
            orderNotes: formData.orderNotes,
          }),
        }
      );

      if (!paymentIntentResponse.ok) {
        const errorData = await paymentIntentResponse.json();
        throw new Error(errorData.message || "Failed to create payment intent");
      }

      const paymentData = await paymentIntentResponse.json();
      const newOrderId = paymentData.order._id;
      const clientSecret = paymentData.payment.clientSecret;

      if (!clientSecret || !newOrderId) {
        throw new Error("Failed to get client secret or order ID");
      }

      setOrderId(newOrderId);

      // Step 2: Confirm Card Payment
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Card element not found");
      }

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: formData.fullName,
              email: formData.email,
            },
          },
        });

      if (confirmError) {
        setError(confirmError.message || "Payment failed. Please try again.");
        setLoading(false);
        return;
      }

      if (!paymentIntent) {
        throw new Error("Payment intent not returned");
      }

      // Step 3: Handle Payment Result
      handlePaymentResult(paymentIntent.status, newOrderId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  const handlePaymentResult = (status: string, id: string) => {
    if (status === "succeeded") {
      setSuccess(true);
      setOrderId(id);
      localStorage.removeItem("cart");
      window.location.href = `/order-confirmation/${id}`;
    } else if (status === "requires_action") {
      setError("Payment requires authentication. Please complete the process.");
      pollOrderStatus(id);
    } else if (status === "processing") {
      setError("Payment is being processed. Please wait...");
      pollOrderStatus(id);
    } else {
      setError("Payment failed. Please try again.");
    }
    setLoading(false);
  };

  const pollOrderStatus = async (id: string) => {
    let attempts = 0;
    const maxAttempts = 30;

    const checkStatus = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/${id}`
        );
        const data = await response.json();

        if (data.data.paymentStatus === "paid") {
          setSuccess(true);
          setError(null);
          window.location.href = `/order-confirmation/${id}`;
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(checkStatus, 2000);
        }
      } catch (err) {
        console.error("Error checking order status:", err);
      }
    };

    checkStatus();
  };

  return (
    <>
      {success && <SuccessModal orderId={orderId} />}
      {error && <ErrorModal message={error} onClose={() => setError(null)} />}

      <form onSubmit={handlePayment} className="space-y-4">
        <div className="border p-4 rounded bg-gray-50">
          <label className="block text-sm font-medium mb-2">Card Details</label>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !stripe}
          className="w-full bg-primary text-white py-3 rounded font-semibold hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? "Processing..." : `Pay $${total.toFixed(2)}`}
        </button>
      </form>
    </>
  );
}

export default function CheckoutForm() {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    orderNotes: "",
  });
  const { cart } = useCart();

  useEffect(() => {
    const initStripe = async () => {
      const stripeInstance = await getStripe();
      setStripe(stripeInstance);
    };
    initStripe();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const subtotal = cart.reduce(
    (a: number, c: any) => a + c.price * c.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const shippingCost = 5.0;
  const total = subtotal + tax + shippingCost;

  if (!stripe) {
    return <div className="text-center py-10">Loading payment system...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>

          <form className="space-y-4">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full border p-3 rounded"
              placeholder="Full Name"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border p-3 rounded"
              placeholder="Email"
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full border p-3 rounded"
              placeholder="Phone"
              required
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full border p-3 rounded"
              placeholder="Street Address"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full border p-3 rounded"
                placeholder="City"
                required
              />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full border p-3 rounded"
                placeholder="State"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="w-full border p-3 rounded"
                placeholder="ZIP Code"
                required
              />
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full border p-3 rounded"
                placeholder="Country"
                required
              />
            </div>

            <textarea
              name="orderNotes"
              value={formData.orderNotes}
              onChange={handleInputChange}
              className="w-full border p-3 rounded"
              placeholder="Order Notes (Optional)"
              rows={3}
            />
          </form>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Payment Method</h2>

          <Elements stripe={stripe}>
            <PaymentForm stripe={stripe} formData={formData} />
          </Elements>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-4 border p-4 rounded">
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <>
                {cart.map((item: any) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.name} (x{item.quantity})
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8%):</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>

                  <div className="text-xl font-bold flex justify-between border-t pt-4">
                    <span>Total:</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
