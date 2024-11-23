import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useEcomStore from "@/store/ecom-store";
import { createPaymentIntent } from "@/api/checkout";
import CheckoutForm from "../StripeCheckout";


const promise = loadStripe(
  "pk_test_51QAnnEFswEXjzOY6P9iQyZI117d27ERaiNXYQ9oRPMAF38dOqfWn72hymvAsTrMnnF0S87Dl9STI6GGgBcQczMFA00ecyq9qF2"
);


const CheckOutFormCredit = () => {
  const token = useEcomStore((state) => state.token);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    createPaymentIntent(token)
    .then((res)=>{
      console.log(res)
      setClientSecret(res.data.clientSecret)
    })
    .catch((err)=>{
      console.log(err)
    })
  }, []);

  const appearance = {
    theme: "stripe",
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = "auto";

  return (
    <div className="">
      {clientSecret && (
        <Elements
          stripe={promise}
          options={{
            clientSecret,
            appearance,
            loader,
          }}
        >
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default CheckOutFormCredit;
