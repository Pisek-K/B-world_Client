import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  ShoppingBasket,
  Layers3,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SidebarAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <div className="bg-gray-800 w-64 text-gray-100 flex flex-col h-screen">
      <div className="h-24 bg-gray-900 flex items-center justify-center text-2xl font-bold">
        Admin panel
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {[
          { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
          { to: "manage", icon: Settings, label: "Manage" },
          { to: "category", icon: Layers3, label: "Category" },
          { to: "product", icon: ShoppingBasket, label: "Product" },
        ].map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/admin"}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md transition-colors ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <Icon className="mr-2 h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default SidebarAdmin;
