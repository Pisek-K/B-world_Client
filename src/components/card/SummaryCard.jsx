import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useEcomStore from "../../store/ecom-store";
import { cn } from "../../lib/utils";
import { createUserOrder } from "@/api/user";
import { updateAddress } from "@/api/auth";
import { toast } from "react-toastify";

const SummaryCard = () => {
  const navigate = useNavigate();
  const cartItems = useEcomStore((state) => state.carts);
  const [loading, setLoading] = useState(false);
  const token = useEcomStore((state) => state.token);
  const [address, setAddress] = useState("");
  const [saveAddress, setSaveAddress] = useState(false);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  const handleConfirmPayment = async () => {
    if (!saveAddress) {
      toast.error("Please enter your address");
      return
    }
    setLoading(true);
    navigate("/checkout/payment");
  };
  const handleSaveAddress = async () => {
    try {
      setLoading(true);
      const res = await updateAddress(token, { address });
      console.log(res);
      setSaveAddress(true);
      setLoading(false);
      toast.success("Address saved successfully");
    } catch (error) {
      toast.error("Failed to save address");
      console.error("Error updating address:", error);
      setLoading(false);
    }
  };
  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg space-y-4">
            <h1 className="font-bold text-2xl text-gray-800">
              Address for shipping
            </h1>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="4"
              placeholder="Enter your shipping address"
            />
            <button
              onClick={handleSaveAddress}
              className={cn(
                "px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-200",
                "rounded-md shadow-md text-white font-semibold",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              )}
            >
              Save Address
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg space-y-4">
            <h1 className="font-bold text-2xl text-gray-800">Summary</h1>
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="text-xl font-bold text-gray-700">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.count} x ฿{item.price}
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-700">
                      ฿{item.price * item.count}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-gray-200" />
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <p>Shipping price</p>
                <p>฿0.00</p>
              </div>
              <div className="flex justify-between text-gray-600">
                <p>Discount</p>
                <p>฿0.00</p>
              </div>
            </div>
            <hr className="border-gray-200" />
            <div>
              <div className="flex justify-between items-baseline">
                <p className="text-lg font-semibold text-gray-700">
                  Total amount:
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  ฿{totalPrice}
                </p>
              </div>
            </div>

            <button
              onClick={handleConfirmPayment}
              disabled={loading || !address.trim() || !saveAddress }
              className={cn(
                "w-full px-6 py-3 bg-green-600 hover:bg-green-700 transition-colors duration-200",
                "rounded-md shadow-md text-white font-semibold text-lg",
                "focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
                loading && "opacity-50 cursor-not-allowed"
              )}
            >
              {loading ? "Processing..."  : address.trim() ? "Confirm Payment" : "Please Enter Address"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
