import React from "react";
import { Link } from "react-router-dom";
import { Utensils, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const AdminFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-10">

      {/* ================= MAIN FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">

          {/* ================= BRAND ================= */}
          <div>

            <Link
              to="/admin/dashboard"
              className="inline-flex items-center gap-3 mb-5"
            >
              <div className="bg-orange-500 p-2.5 rounded-xl">
                <Utensils
                  className="text-white"
                  size={21}
                />
              </div>

              <span className="text-2xl font-bold text-gray-800">
                Rest<span className="text-orange-500">Taste</span>
              </span>
            </Link>

            <p className="text-gray-500 text-sm leading-6 max-w-sm">
              Manage your restaurant efficiently with RestTaste.
              Keep your menu and users organized in one convenient place.
            </p>

            <p className="text-xs text-gray-400 mt-5">
              Restaurant Management System
            </p>

          </div>


          {/* ================= QUICK LINKS ================= */}
          <div>

            <h3 className="text-gray-800 font-semibold text-base mb-5">
              Quick Links
            </h3>

            <div className="grid grid-cols-2 gap-y-3 text-sm">

              <Link
                to="/admin/dashboard"
                className="group flex items-center gap-2 text-gray-500 hover:text-orange-500 transition"
              >
                Dashboard
                <ArrowRight
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition"
                />
              </Link>

              <Link
                to="/admin/menu"
                className="group flex items-center gap-2 text-gray-500 hover:text-orange-500 transition"
              >
                Manage Menu
                <ArrowRight
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition"
                />
              </Link>

              <Link
                to="/admin/addmenu"
                className="group flex items-center gap-2 text-gray-500 hover:text-orange-500 transition"
              >
                Add Menu Item
                <ArrowRight
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition"
                />
              </Link>

              <Link
                to="/admin/users"
                className="group flex items-center gap-2 text-gray-500 hover:text-orange-500 transition"
              >
                Manage Users
                <ArrowRight
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition"
                />
              </Link>

            </div>

          </div>


          {/* ================= CONTACT ================= */}
          <div>

            <h3 className="text-gray-800 font-semibold text-base mb-5">
              Contact Us
            </h3>

            <div className="space-y-4 text-sm">

              {/* Location */}
              <div className="flex items-start gap-3 text-gray-500">

                <div className="bg-orange-50 p-2 rounded-lg">
                  <MapPin
                    size={16}
                    className="text-orange-500"
                  />
                </div>

                <div>
                  <p className="text-gray-700 font-medium">
                    Location
                  </p>

                  <p className="mt-0.5">
                    Kolkata, India
                  </p>
                </div>

              </div>


              {/* Email */}
              <a
                href="mailto:support@resttaste.com"
                className="flex items-center gap-3 text-gray-500 hover:text-orange-500 transition"
              >

                <div className="bg-orange-50 p-2 rounded-lg">
                  <Mail
                    size={16}
                    className="text-orange-500"
                  />
                </div>

                <span>
                  support@resttaste.com
                </span>

              </a>


              {/* Phone */}
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-gray-500 hover:text-orange-500 transition"
              >

                <div className="bg-orange-50 p-2 rounded-lg">
                  <Phone
                    size={16}
                    className="text-orange-500"
                  />
                </div>

                <span>
                  +91 98765 43210
                </span>

              </a>

            </div>

          </div>

        </div>

      </div>


      {/* ================= COPYRIGHT ================= */}
      <div className="border-t border-gray-200">

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-5">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">

            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} RestTaste. All rights reserved.
            </p>

            <p className="text-xs text-gray-400">
              Admin Panel
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default AdminFooter;