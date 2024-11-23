import React from "react";
import { ListCheck, Trash2, Edit, ShoppingBag } from "lucide-react";
import useEcomStore from "@/store/ecom-store";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { createUserCart } from "@/api/user";
import { toast } from "react-toastify";

const ListCart = () => {
  const cart = useEcomStore((state) => state.carts);
  const actionGetTotal = useEcomStore((state) => state.actionGetTotal);
  const user = useEcomStore((state) => state.user);
  const token = useEcomStore((state) => state.token);
  const navigate = useNavigate();

  const hdlSaveCart = async () => {
    await createUserCart(token, { cart })
      .then((res) => {
        console.log(res);
        toast.success("Add cart complete", {
          position: "top-center",
        });
        navigate("/checkout");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 rounded-lg p-8 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200 rounded-full -mr-16 -mt-16 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-200 rounded-full -ml-12 -mb-12 opacity-50"></div>

      <div className="flex gap-4 items-center mb-8 relative z-10">
        <ShoppingBag className="text-primary" size={32} />
        <h2 className="text-3xl font-bold text-foreground">
          Your Cart <span className="text-primary">({cart.length})</span>
        </h2>
      </div>

      <div className="space-y-6 relative z-10">
        {cart.map((cartItem, index) => (
          <div
            key={index}
            className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
          >
            <div className="flex justify-between mb-2">
              <div className="flex gap-4 items-center">
                {cartItem?.images[0]?.url ? (
                  <img
                    src={cartItem.images[0].url}
                    alt={cartItem.title}
                    className="w-32 h-32 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center text-sm text-muted-foreground">
                    No image
                  </div>
                )}
                <div>
                  <p className="font-bold text-foreground">{cartItem.title}</p>
                  <p className="text-sm mt-8 text-muted-foreground">
                    {cartItem.price} x {cartItem.count}
                  </p>
                </div>
              </div>
              <p className="font-bold text-primary">
                ฿{cartItem.price.toFixed(2) * cartItem.count}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white bg-opacity-90 p-6 rounded-lg shadow-md relative z-10">
        <p className="text-3xl font-bold text-foreground mb-4">Order Summary</p>
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg text-muted-foreground">Total amount</span>
          <span className="text-3xl font-bold text-primary">
            ฿ {actionGetTotal()}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center w-full space-y-4">
          {user ? (
            <Link to="/checkout">
              <Button
                className="w-full text-lg py-6 hover:bg-primary-dark transition-colors duration-300"
                onClick={hdlSaveCart}
              >
                Proceed to Checkout
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button className="w-full text-lg py-6 hover:bg-primary-dark transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg rounded-full">
                Proceed to Checkout
              </Button>
            </Link>
          )}
          <Link to="/shop" className="w-full max-w-sm">
            <Button
              variant="outline"
              size="lg"
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 transition-all duration-300"
            >
              <Edit className="h-5 w-5" />
              Modify Order
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListCart;
