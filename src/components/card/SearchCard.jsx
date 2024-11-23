import useEcomStore from "@/store/ecom-store";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
const { createSliderWithTooltip } = Slider;

const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const actionSearchFilters = useEcomStore(
    (state) => state.actionSearchFilters
  );
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [ok, setOk] = useState(false);

  const [text, setText] = useState("");

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearchFilters({ query: text });
      } else {
        getProduct();
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [text]);

  const hdlCheck = (e) => {
    const inCheck = e.target.value;
    const inState = [...selectedCategory];
    const findCheck = inState.indexOf(inCheck);
    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setSelectedCategory(inState);
    if (inState.length > 0) {
      actionSearchFilters({ category: inState });
    } else {
      getProduct();
    }
  };

  useEffect(() => {
    actionSearchFilters({ price: priceRange });
  }, [ok]);

  const hdlPriceChange = (value) => {
    setPriceRange(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-100 shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-blue-300 pb-2">
        Search Products
      </h1>
      <div className="relative">
        <input
          type="text"
          className="border-2 border-blue-300 rounded-full py-2 px-4 w-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 shadow-sm"
          placeholder="Enter product name..."
          onChange={(e) => setText(e.target.value)}
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>
      <hr />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
          <span className="mr-2">Category</span>
          <div className="flex-grow border-b border-gray-300"></div>
        </h1>
        <div className="p-4">
          {categories.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="checkbox"
                value={item.id}
                className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                onChange={hdlCheck}
              />
              <label className="ml-2 text-gray-700 hover:text-blue-600 cursor-pointer">
                {item.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
        <span className="mr-2">Search by price</span>
        <div className="flex-grow border-b border-gray-300"></div>
      </h1>
      <div className="">
        <div className="">
          <div className="flex justify-between">
            <span>Min: {priceRange[0]} </span>
            <span>Max: {priceRange[1]}</span>
          </div>
          <Slider
            onChange={hdlPriceChange}
            range
            min={0}
            max={1000}
            value={priceRange}
            defaultValue={[0, 1000]}
            railStyle={{ backgroundColor: "#e2e8f0", height: 4 }}
            trackStyle={[{ backgroundColor: "#3b82f6", height: 4 }]}
            handleStyle={[
              {
                borderColor: "#3b82f6",
                height: 20,
                width: 20,
                marginLeft: -10,
                marginTop: -8,
                backgroundColor: "#fff",
              },
              {
                borderColor: "#3b82f6",
                height: 20,
                width: 20,
                marginLeft: -10,
                marginTop: -8,
                backgroundColor: "#fff",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
