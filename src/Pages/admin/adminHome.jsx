import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Utensils,
  Users,
  AlertCircle,
  Plus,
  ArrowRight,
  ChefHat,
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminHome = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalMenuItems, setTotalMenuItems] = useState(0);
  const [unavailableItems, setUnavailableItems] = useState(0);

  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const [loadingUnavailable, setLoadingUnavailable] = useState(true);

  // ================= FETCH TOTAL USERS =================
  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const token = Cookies.get("token");

        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/admin/usercount`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setTotalUsers(response.data.totalUsers);
        }
      } catch (error) {
        console.error("Error fetching total users:", error);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchTotalUsers();
  }, []);

  // ================= FETCH TOTAL MENU ITEMS =================
  useEffect(() => {
    const fetchTotalMenuItems = async () => {
      try {
        const token = Cookies.get("token");

        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/admin/menuitemscount`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setTotalMenuItems(response.data.totalItems);
        }
      } catch (error) {
        console.error("Error fetching total menu items:", error);
      } finally {
        setLoadingMenu(false);
      }
    };

    fetchTotalMenuItems();
  }, []);

  // ================= FETCH UNAVAILABLE ITEMS =================
  useEffect(() => {
    const fetchUnavailableItems = async () => {
      try {
        const token = Cookies.get("token");

        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/admin/menu/unavailable`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setUnavailableItems(response.data.unavailableItems);
        }
      } catch (error) {
        console.error(
          "Error fetching unavailable menu items:",
          error
        );
      } finally {
        setLoadingUnavailable(false);
      }
    };

    fetchUnavailableItems();
  }, []);

  return (
    <div className="bg-[#F1F5F2]">

      {/* ================= HEADER ================= */}
      <section className="bg-white border-b border-[#DDE5DF]">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>

              <div className="inline-flex items-center gap-2 bg-[#F0FDF4] text-[#14532D] px-3 py-1.5 rounded-full text-xs font-semibold mb-4">

                <ChefHat size={15} />

                ADMIN PANEL

              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">

                Welcome back, Admin 👋

              </h1>

              <p className="text-gray-500 mt-2">

                Manage your restaurant and keep everything running smoothly.

              </p>

            </div>

            <Link
              to="/admin/addmenu"
              className="inline-flex items-center justify-center gap-2 bg-[#14532D] hover:bg-[#0F3D2E] text-white px-5 py-3 rounded-xl font-medium transition"
            >

              <Plus size={18} />

              Add Menu Item

            </Link>

          </div>

        </div>

      </section>


      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10">


        {/* ================= OVERVIEW ================= */}
        <div className="mb-8">

          <h2 className="text-xl font-bold text-gray-900">
            Dashboard Overview
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Here's what's happening with your restaurant.
          </p>

        </div>


        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">


          {/* TOTAL MENU ITEMS */}
          <div className="bg-white rounded-2xl p-6 border border-[#DDE5DF] shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Menu Items
                </p>

                <h3 className="text-3xl font-bold text-gray-800 mt-2">

                  {loadingMenu ? (
                    <span className="text-gray-300">
                      ...
                    </span>
                  ) : (
                    totalMenuItems
                  )}

                </h3>

                <p className="text-xs text-gray-400 mt-2">
                  Total items in menu
                </p>

              </div>


              <div className="w-12 h-12 rounded-xl bg-[#F0FDF4] flex items-center justify-center">

                <Utensils
                  size={24}
                  className="text-[#14532D]"
                />

              </div>

            </div>

          </div>


          {/* REGISTERED USERS */}
          <div className="bg-white rounded-2xl p-6 border border-[#DDE5DF] shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Registered Users
                </p>

                <h3 className="text-3xl font-bold text-gray-800 mt-2">

                  {loadingUsers ? (
                    <span className="text-gray-300">
                      ...
                    </span>
                  ) : (
                    totalUsers
                  )}

                </h3>

                <p className="text-xs text-gray-400 mt-2">
                  Total registered users
                </p>

              </div>


              <div className="w-12 h-12 rounded-xl bg-[#F0FDF4] flex items-center justify-center">

                <Users
                  size={24}
                  className="text-[#14532D]"
                />

              </div>

            </div>

          </div>


          {/* UNAVAILABLE ITEMS */}
          <div className="bg-white rounded-2xl p-6 border border-[#DDE5DF] shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Unavailable Items
                </p>

                <h3 className="text-3xl font-bold text-gray-800 mt-2">

                  {loadingUnavailable ? (
                    <span className="text-gray-300">
                      ...
                    </span>
                  ) : (
                    unavailableItems
                  )}

                </h3>

                <p className="text-xs text-gray-400 mt-2">
                  Currently unavailable
                </p>

              </div>


              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">

                <AlertCircle
                  size={24}
                  className="text-red-500"
                />

              </div>

            </div>

          </div>

        </div>


        {/* ================= QUICK ACTIONS ================= */}
        <div className="mb-8">

          <h2 className="text-xl font-bold text-gray-900">
            Quick Actions
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Manage the important parts of your restaurant.
          </p>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">


          {/* MANAGE MENU */}
          <Link
            to="/admin/menu"
            className="group bg-white rounded-2xl p-6 border border-[#DDE5DF] shadow-sm hover:shadow-md transition"
          >

            <div className="w-11 h-11 rounded-xl bg-[#F0FDF4] flex items-center justify-center mb-5">

              <Utensils
                size={22}
                className="text-[#14532D]"
              />

            </div>

            <div className="flex items-center justify-between">

              <div>

                <h3 className="font-semibold text-gray-900">
                  Manage Menu
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Add, edit or remove menu items.
                </p>

              </div>

              <ArrowRight
                size={18}
                className="text-gray-300 group-hover:text-[#14532D] group-hover:translate-x-1 transition"
              />

            </div>

          </Link>


          {/* MANAGE USERS */}
          <Link
            to="/admin/users"
            className="group bg-white rounded-2xl p-6 border border-[#DDE5DF] shadow-sm hover:shadow-md transition"
          >

            <div className="w-11 h-11 rounded-xl bg-[#F0FDF4] flex items-center justify-center mb-5">

              <Users
                size={22}
                className="text-[#14532D]"
              />

            </div>

            <div className="flex items-center justify-between">

              <div>

                <h3 className="font-semibold text-gray-900">
                  Manage Users
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  View and manage registered users.
                </p>

              </div>

              <ArrowRight
                size={18}
                className="text-gray-300 group-hover:text-[#14532D] group-hover:translate-x-1 transition"
              />

            </div>

          </Link>

        </div>


        {/* ================= BOTTOM INFO ================= */}
        <div className="bg-[#14532D] rounded-2xl p-6 sm:p-8 text-white">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>

              <h3 className="text-xl font-bold">
                Keep your menu up to date 🍽️
              </h3>

              <p className="text-green-100 text-sm mt-2 max-w-xl">
                Make sure your menu items have the correct prices,
                availability and images so customers always see
                accurate information.

              </p>

            </div>


            <Link
              to="/admin/menu"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#14532D] hover:bg-[#F0FDF4] px-5 py-3 rounded-xl font-semibold transition whitespace-nowrap"
            >

              Manage Menu

              <ArrowRight size={17} />

            </Link>

          </div>

        </div>

      </main>

    </div>
  );
};

export default AdminHome;