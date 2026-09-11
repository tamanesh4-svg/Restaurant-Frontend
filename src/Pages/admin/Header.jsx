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

  
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");

    navigate("/login");
  };

  
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
    <nav className="bg-white border-b border-[#DDE5DF] sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        <div className="h-16 flex items-center justify-between">

         
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2.5"
            onClick={() => setMobileOpen(false)}
          >

            <div className="w-9 h-9 bg-[#14532D] rounded-xl flex items-center justify-center">
              <ChefHat
                size={21}
                className="text-white"
              />
            </div>

            <div className="flex flex-col leading-none">

             <Link
    to="/admin/dashboard"
    onClick={() => setIsOpen(false)}
    className="text-2xl font-bold tracking-tight text-gray-900"
>
    Tasty<span className="text-[#166534]">Bites</span>
</Link>
              <span className="text-[10px] text-[#D4A017] font-semibold uppercase tracking-wider mt-1">
                Admin Panel
              </span>

            </div>

          </Link>


         
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
                        ? "bg-[#F0FDF4] text-[#14532D]"
                        : "text-gray-600 hover:bg-[#F1F5F2] hover:text-[#14532D]"
                    }`
                  }
                >

                  <Icon size={17} />

                  {link.name}

                </NavLink>
              );
            })}

          </div>


          
          <div className="hidden md:flex items-center gap-4">

            {/* Admin Badge */}
            <div className="flex items-center gap-2 bg-[#F1F5F2] px-3 py-2 rounded-lg">

              <div className="w-7 h-7 bg-[#F0FDF4] rounded-full flex items-center justify-center">
                <ChefHat
                  size={15}
                  className="text-[#14532D]"
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


           
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-500 transition"
            >
              <LogOut size={17} />
              Logout
            </button>

          </div>


         
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-[#F1F5F2] transition"
          >
            {mobileOpen ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>

        </div>


        
        {mobileOpen && (

          <div className="md:hidden border-t border-[#DDE5DF] py-4">

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
                          ? "bg-[#F0FDF4] text-[#14532D]"
                          : "text-gray-600 hover:bg-[#F1F5F2]"
                      }`
                    }
                  >

                    <Icon size={18} />

                    {link.name}

                  </NavLink>
                );
              })}


             
              <div className="border-t border-[#DDE5DF] mt-3 pt-3">

                <div className="flex items-center gap-3 px-4 py-3">

                  <div className="w-9 h-9 bg-[#F0FDF4] rounded-full flex items-center justify-center">
                    <ChefHat
                      size={18}
                      className="text-[#14532D]"
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