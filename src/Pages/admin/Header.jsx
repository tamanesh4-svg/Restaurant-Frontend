import React from 'react'

import { useState } from "react";
import {
  ChefHat,
  LayoutDashboard,
  Utensils,
  Users,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();

  // ================= LOGOUT =================
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");

    navigate("/login");
  };

  // ================= NAV LINKS =================
  const navLinks = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Menu",
      path: "/admin/menu",
      icon: Utensils,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: Users,
    },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        <div className="h-16 flex items-center justify-between">

          {/* ================= LOGO ================= */}
          <Link
            to="/admin"
            className="flex items-center gap-2.5"
            onClick={() => setMobileOpen(false)}
          >

            <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center">
              <ChefHat
                size={21}
                className="text-white"
              />
            </div>

            <div className="flex flex-col leading-none">

              <span className="text-lg font-bold text-gray-900">
                RestTaste
              </span>

              <span className="text-[10px] text-orange-500 font-semibold uppercase tracking-wider mt-1">
                Admin Panel
              </span>

            </div>

          </Link>


          {/* ================= DESKTOP NAV ================= */}
          <div className="hidden md:flex items-center gap-2">

            {navLinks.map((link) => {

              const Icon = link.icon;

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/admin"}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                      isActive
                        ? "bg-orange-50 text-orange-500"
                        : "text-gray-600 hover:bg-gray-50 hover:text-orange-500"
                    }`
                  }
                >

                  <Icon size={17} />

                  {link.name}

                </NavLink>
              );
            })}

          </div>


          {/* ================= RIGHT SIDE ================= */}
          <div className="hidden md:flex items-center gap-4">

            {/* Admin Badge */}
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">

              <div className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center">
                <ChefHat
                  size={15}
                  className="text-orange-500"
                />
              </div>

              <div className="leading-tight">

                <p className="text-xs font-semibold text-gray-800">
                  Administrator
                </p>

                <p className="text-[10px] text-gray-400">
                  Manage Restaurant
                </p>

              </div>

            </div>


            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-500 transition"
            >
              <LogOut size={17} />
              Logout
            </button>

          </div>


          {/* ================= MOBILE BUTTON ================= */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition"
          >
            {mobileOpen ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>

        </div>


        {/* ================= MOBILE MENU ================= */}
        {mobileOpen && (

          <div className="md:hidden border-t border-gray-100 py-4">

            <div className="flex flex-col gap-1">

              {navLinks.map((link) => {

                const Icon = link.icon;

                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === "/admin"}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                        isActive
                          ? "bg-orange-50 text-orange-500"
                          : "text-gray-600 hover:bg-gray-50"
                      }`
                    }
                  >

                    <Icon size={18} />

                    {link.name}

                  </NavLink>
                );
              })}


              {/* Mobile Admin Info */}
              <div className="border-t border-gray-100 mt-3 pt-3">

                <div className="flex items-center gap-3 px-4 py-3">

                  <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center">
                    <ChefHat
                      size={18}
                      className="text-orange-500"
                    />
                  </div>

                  <div>

                    <p className="text-sm font-semibold">
                      Administrator
                    </p>

                    <p className="text-xs text-gray-400">
                      RestTaste Admin
                    </p>

                  </div>

                </div>


                {/* Mobile Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:text-red-500 transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </nav>
  );
};

export default Header;
