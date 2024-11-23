import React from "react";
import { Trash2 } from "lucide-react";
import useEcomStore from "@/store/ecom-store";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const CartCard = () => {
  const carts = useEcomStore((state) => state.carts);
  const actionUpdateQuantity = useEcomStore(
    (state) => state.actionUpdateQuantity
  );
  const actionDeleteCart = useEcomStore((state) => state.actionDeleteCart);
  const actionGetTotal = useEcomStore((state) => state.actionGetTotal);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Cart items</h1>
      <div className="border border-gray-300 p-4 rounded-md bg-white">
        {carts.map((cartItem, index) => (
          <div key={index} className={cn(
            "bg-white p-4 rounded-md shadow-md mb-4 transition-all duration-300",
            "hover:shadow-xl hover:scale-102"
          )}>
            <div className="flex justify-between mb-2">
              <div className="flex gap-2 items-center">
                {cartItem?.images[0]?.url ? (
                  <img
                    src={cartItem.images[0].url}
                    alt={cartItem.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-md flex text-center items-center justify-center text-sm text-gray-500">
                    No image
                  </div>
                )}
                <div>
                  <p className="font-bold">{cartItem.title}</p>
                  <p className="text-sm">{cartItem.description}</p>
                </div>
              </div>
              <div className="text-red-500">
                <Trash2
                  size={20}
                  onClick={() => actionDeleteCart(cartItem.id)}
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="border rounded-sm px-2 py-1">
                <button
                  className="px-2 py-1 bg-gray-200 rounded-sm hover:bg-red-300"
                  onClick={() =>
                    actionUpdateQuantity(cartItem.id, cartItem.count - 1)
                  }
                >
                  -
                </button>
                <span className="px-4">{cartItem.count}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded-sm hover:bg-gray-300"
                  onClick={() =>
                    actionUpdateQuantity(cartItem.id, cartItem.count + 1)
                  }
                >
                  +
                </button>
              </div>
              <div>
                <p className="font-bold text-blue-500">
                  ฿{cartItem.price.toFixed(2) * cartItem.count}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between px-2 font-bold">
          <span>Total</span>
          <span>฿{actionGetTotal().toFixed(2)}</span>
        </div>
        <Link to='/cart'>
        <button className="w-full bg-blue-500 text-white p-2 rounded-md mt-2 shadow-md hover:bg-blue-600">
          Checkout
        </button>
        </Link>
      </div>
    </div>
  );
};

export default CartCard;
