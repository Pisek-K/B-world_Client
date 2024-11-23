import React from "react";
import { ShoppingCart } from "lucide-react";
import useEcomStore from "@/store/ecom-store";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  const actionAddCart = useEcomStore((state) => state.actionAddCart);
  return (
    <div className="border rounded-md shadow-md p-2 w-48 flex flex-col justify-between">
      <Link to={`/product/${item.id}`} className="block">
        <div className="">
          {item?.images && item?.images.length > 0 ? (
            <img
              src={item.images[0]?.url}
              className="rounded-md w-full object-cover hover:scale-110  duration-300"
            />
          ) : (
            <div className="w-full h-24 bg-gray-200 rounded-md flex items-center justify-center shadow">
              No image
            </div>
          )}
        </div>

        <div className="py-2">
          <p className="text-xl">{item?.title}</p>
          <p className="text-sm text-gray-500">{item?.description}</p>  
        </div>
      </Link>
      <div className="flex justify-between items-baseline mt-auto">
        <span className="text-sm font-bold">฿{item?.price}</span>
        <button
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 shadow-md ml-2 w-10 h-10 flex items-center justify-center"
          onClick={() => actionAddCart(item)}
        >
          <ShoppingCart size={16} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
