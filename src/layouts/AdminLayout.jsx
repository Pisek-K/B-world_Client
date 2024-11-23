import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../components/admin/SidebarAdmin";
import HeaderbarAdmin from "../components/admin/HeaderbarAdmin";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <SidebarAdmin />
      <div className="flex flex-1 flex-col">
        <HeaderbarAdmin />
        <main className="flex-1 p-6 bg-slate-200 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
