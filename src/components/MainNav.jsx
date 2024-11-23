import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
// import { c } from "vite/dist/node/types.d-aGj9QkWt";

const MainNav = () => {
  const isLoggedIn = !!useEcomStore((state) => state.token);
  const logout = useEcomStore((state) => state.logout);
  const navigate = useNavigate();
  const user = useEcomStore((state) => state.user);
  const carts = useEcomStore((state) => state.carts);
  const clearCart = useEcomStore((state) => state.clearCart);

  const cartItemCount = carts.length;

  const hdlLogout = () => {
    logout();
    clearCart();
    navigate("/login");
  };
  return (
    <nav className="bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg">
      <div className="mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-4">
            <Link
              to={"/"}
              className="text-2xl font-bold text-white hover:text-gray-200 flex items-center transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <img
                src="/bookworldlogo.png"
                alt="Logo"
                className="h-10 w-auto mr-2 filter drop-shadow-md"
              />
            </Link>
            <Link
              to={"/"}
              className="text-white hover:text-gray-200 transition duration-300 border-b-2 border-transparent hover:border-white "
            >
              Home
            </Link>
            <Link
              to={"/shop"}
              className="text-white hover:text-gray-200 transition duration-200"
            >
              Shop
            </Link>
            <Link
              to={"/cart"}
              className="relative text-white hover:text-gray-200 transition duration-200"
            >
              Cart
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-3 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex justify-between items-center w-full gap-4">
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <Link
                    to="/user/profile"
                    className="text-white font-semibold hover:underline"
                  >
                    Welcome, {user?.name}
                  </Link>
                </div>
                <button
                  onClick={hdlLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to={"/register"}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-md hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Register
                </Link>
                <Link
                  to={"/login"}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
