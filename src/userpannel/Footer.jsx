import React from "react";
import { Link } from "react-router-dom";
import { Utensils, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">

      {/* ================= MAIN FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>

            <Link
              to="/"
              className="text-2xl font-bold tracking-tight text-white"
            >
              Rest<span className="text-orange-500">Taste</span>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mt-4 max-w-xs">
              Delicious food, made with care. Explore our menu and discover
              something you'll love.
            </p>

            <div className="flex items-center gap-2 mt-5 text-sm text-gray-400">
              <Utensils size={16} className="text-orange-500" />
              <span>Good food. Great taste.</span>
            </div>

          </div>


          {/* QUICK LINKS */}
          <div>

            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-sm">

              <Link
                to="/"
                className="hover:text-orange-500 transition"
              >
                Home
              </Link>

              <Link
                to="/menu"
                className="hover:text-orange-500 transition"
              >
                Menu
              </Link>

              <Link
                to="/login"
                className="hover:text-orange-500 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hover:text-orange-500 transition"
              >
                Sign Up
              </Link>

            </div>

          </div>


          {/* CATEGORIES */}
          <div>

            <h3 className="text-white font-semibold mb-4">
              Menu Categories
            </h3>

            <div className="flex flex-col gap-3 text-sm">

              <Link
                to="/menu?category=Starter"
                className="hover:text-orange-500 transition"
              >
                Starters
              </Link>

              <Link
                to="/menu?category=Main Course"
                className="hover:text-orange-500 transition"
              >
                Main Course
              </Link>

              <Link
                to="/menu?category=Dessert"
                className="hover:text-orange-500 transition"
              >
                Desserts
              </Link>

              <Link
                to="/menu?category=Beverage"
                className="hover:text-orange-500 transition"
              >
                Beverages
              </Link>

            </div>

          </div>


          {/* CONTACT */}
          <div>

            <h3 className="text-white font-semibold mb-4">
              Contact Us
            </h3>

            <div className="flex flex-col gap-4 text-sm">

              <div className="flex items-start gap-3">
                <MapPin
                  size={17}
                  className="text-orange-500 mt-0.5 flex-shrink-0"
                />

                <span>
                  Kolkata, West Bengal
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone
                  size={17}
                  className="text-orange-500"
                />

                <span>
                  +91 9832972869
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail
                  size={17}
                  className="text-orange-500"
                />

                <span>
                  restaste@gmail.com
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ================= COPYRIGHT ================= */}
      <div className="border-t border-gray-800">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-5">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">

            <p>
              © {new Date().getFullYear()} RestTaste. All rights reserved.
            </p>

            

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;