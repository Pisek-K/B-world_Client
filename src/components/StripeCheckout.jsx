import "./stripe.css";
import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { saveOrder } from "@/api/user";
import useEcomStore from "@/store/ecom-store";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({ dpmCheckerLink }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const clearCart = useEcomStore((state) => state.clearCart);

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = useEcomStore((state) => state.token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const payload = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (payload.error) {
      setMessage(payload.error.message);
    } else {
      saveOrder(token, payload)
        .then((res) => {
          console.log(res);
          clearCart();
          navigate("/user/order-success");
        })
        .catch((err) => {
          console.log(err);
          setMessage("Failed to create order. Please try again.");
        });
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div className="container mx-auto p-6 max-w-md bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Checkout</h2>
      <form className="space-y-6" id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          className="stripe-button w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-300"
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && (
          <div className="mt-4 text-center text-red-500" id="payment-message">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
