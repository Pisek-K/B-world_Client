import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useEcomStore from "@/store/ecom-store";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";

const Item = (item) => {
  const [product, setProduct] = useState(null);
  const { itemId } = useParams();
  const products = useEcomStore((state) => state.products);
  const carts = useEcomStore((state) => state.carts);
  const actionAddCart = useEcomStore((state) => state.actionAddCart);

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((p) => p.id === parseInt(itemId));
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [products, itemId]);

  const isInCart = carts.some((item) => item.id === parseInt(itemId));

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="hero-section bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <div
        className={cn(
          "product-detail p-8 max-w-4xl mx-auto",
          "bg-white shadow-2xl rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
        )}
      >
        <h1 className="text-5xl font-extrabold text-white mb-4">Product name</h1>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.title}</h1>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 pr-4">
            <img
              src={product.images[0]?.url}
              alt={product.title}
              className="w-full h-auto object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            />
          </div>
          <div className="md:w-1/2 mt-4 md:mt-0">
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-3xl font-semibold text-blue-600 mb-4">
              ฿{product.price.toFixed(2)}
            </p>
            <button
              className={cn(
                "bg-blue-500 text-white py-2 px-4 rounded-full",
                "hover:bg-blue-600 transition duration-300 ease-in-out",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
                { "opacity-50 cursor-not-allowed": isInCart }
              )}
              onClick={() => !isInCart && actionAddCart(product)} 
              disabled={isInCart}
            >
              {isInCart ? "Already in Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;