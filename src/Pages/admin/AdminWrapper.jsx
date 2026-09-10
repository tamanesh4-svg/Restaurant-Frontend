import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import AdminFooter from "./AdminFooter";

const AdminWrapper = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <AdminFooter />

    </div>
  );
};

export default AdminWrapper;