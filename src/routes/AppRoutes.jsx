import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import History from "../pages/History";
import Checkout from "../pages/user/Checkout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Layout from "../layouts/layout";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Category from "../pages/admin/Category";
import Product from "../pages/admin/Product";
import Manage from "../pages/admin/Manage";
import UserLayout from "../layouts/UserLayout";
import HomeUser from "../pages/user/HomeUser";
import ProtectRouteUser from "./ProtectRouteUser";
import ProtectRouteAdmin from "./ProtectRouteAdmin";
import EditProduct from "../pages/admin/EditProduct";
import Unauthorization from "@/pages/Unauthorization";
import Item from "../pages/Item";
import Payment from "@/pages/Payment";
import PaymentLayout from "@/layouts/PaymentLayout";
import OrderSuccess from "@/pages/user/OrderSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
      { path: "history", element: <History /> },
      { path: "unauthorization", element: <Unauthorization /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "product/:itemId", element: <Item /> },
    ],
  },
  {
    path: "/checkout",
    element: <ProtectRouteUser element={<PaymentLayout />}/>,
    children: [
      { index: true, element: <Checkout /> },
      { path: "payment", element: <Payment /> },
    ]
  },
  {
    path: "/admin",
    element: <ProtectRouteAdmin element={<AdminLayout />} allow={["ADMIN"]} />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "category", element: <Category /> },
      { path: "product", element: <Product /> },
      { path: "product/:id", element: <EditProduct /> },
      { path: "manage", element: <Manage /> },
    ],
  },
  {
    path: "/user",
    element: <ProtectRouteUser element={<Layout />} allow={["USER","ADMIN"]} />,
    children: [
      { index: true, element: <HomeUser /> },
      { path: "category", element: <Category /> },
      { path: "product", element: <Product /> },
      { path: "manage", element: <Manage /> },
      { path: "profile", element: <HomeUser /> },
      { path: "order-success", element: <OrderSuccess /> },
    ],
  },
]);

const AppRoutes = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default AppRoutes;
