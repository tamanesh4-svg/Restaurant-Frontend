import React from "react";
import { ArrowRight, Clock, MapPin, Utensils } from "lucide-react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Home = () => {
  const token = Cookies.get("token");
  const userDetails = Cookies.get("userDetails");
  const username = userDetails ? JSON.parse(userDetails).username : null;

  return (
    <div className="bg-[#faf9f7] text-gray-900">
      {/* ================= HERO SECTION ================= */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            {/* HELLO USER */}
            {token && username && (
              <p className="text-orange-500 font-semibold text-lg mb-4">
                Hello, {username} 👋
              </p>
            )}

            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Utensils size={16} />
              Delicious food, made with care
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Good food.
              <br />
              <span className="text-orange-500">Great taste.</span>
            </h1>

            <p className="mt-6 text-gray-600 text-base sm:text-lg leading-relaxed max-w-lg">
              Discover delicious meals made for every craving. Explore our menu
              and find something you'll love at RestTaste.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                to="/menu"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-lg transition duration-200"
              >
                Explore Menu
                <ArrowRight size={18} />
              </Link>

              {!token && (
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:border-orange-400 hover:text-orange-500 transition duration-200"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Small Info */}
            <div className="flex flex-wrap gap-6 mt-10 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Clock size={17} className="text-orange-500" />
                <span>Open Daily</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={17} className="text-orange-500" />
                <span>Fresh & Local</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85"
                alt="Delicious food"
                className="w-full h-[320px] sm:h-[420px] lg:h-[500px] object-cover"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7 bg-white rounded-xl shadow-lg px-5 py-4">
              <p className="text-xs text-gray-500 mb-1">
                Today's recommendation
              </p>

              <p className="font-semibold text-gray-900">Chef's Special</p>

              <p className="text-orange-500 text-sm mt-1">Freshly prepared</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORY SECTION ================= */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14">
          <div className="text-center mb-10">
            <p className="text-orange-500 text-sm font-semibold uppercase tracking-wider">
              Explore
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold mt-2">
              Something for every taste
            </h2>

            <p className="text-gray-500 mt-3">Explore our menu by category</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Starter */}
            <Link
              to="/menu?category=Starter"
              className="group bg-[#faf9f7] border border-gray-100 rounded-xl p-6 text-center hover:border-orange-200 hover:shadow-sm transition"
            >
              <div className="text-3xl mb-4">🥗</div>
              <h3 className="font-semibold">Starters</h3>
              <p className="text-sm text-gray-500 mt-1">Start your meal</p>
            </Link>

            {/* Main Course */}
            <Link
              to="/menu?category=Main Course"
              className="group bg-[#faf9f7] border border-gray-100 rounded-xl p-6 text-center hover:border-orange-200 hover:shadow-sm transition"
            >
              <div className="text-3xl mb-4">🍛</div>
              <h3 className="font-semibold">Main Course</h3>
              <p className="text-sm text-gray-500 mt-1">Hearty favourites</p>
            </Link>

            {/* Dessert */}
            <Link
              to="/menu?category=Dessert"
              className="group bg-[#faf9f7] border border-gray-100 rounded-xl p-6 text-center hover:border-orange-200 hover:shadow-sm transition"
            >
              <div className="text-3xl mb-4">🍰</div>
              <h3 className="font-semibold">Desserts</h3>
              <p className="text-sm text-gray-500 mt-1">Something sweet</p>
            </Link>

            {/* Beverage */}
            <Link
              to="/menu?category=Beverage"
              className="group bg-[#faf9f7] border border-gray-100 rounded-xl p-6 text-center hover:border-orange-200 hover:shadow-sm transition"
            >
              <div className="text-3xl mb-4">🥤</div>
              <h3 className="font-semibold">Beverages</h3>
              <p className="text-sm text-gray-500 mt-1">Refresh yourself</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= WHY RESTTASTE ================= */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="w-11 h-11 rounded-lg bg-orange-50 flex items-center justify-center mb-4">
              <Utensils size={21} className="text-orange-500" />
            </div>

            <h3 className="font-semibold text-lg">Quality Food</h3>

            <p className="text-gray-500 text-sm leading-relaxed mt-2">
              Carefully prepared dishes using quality ingredients.
            </p>
          </div>

          <div>
            <div className="w-11 h-11 rounded-lg bg-orange-50 flex items-center justify-center mb-4">
              <Clock size={21} className="text-orange-500" />
            </div>

            <h3 className="font-semibold text-lg">Freshly Prepared</h3>

            <p className="text-gray-500 text-sm leading-relaxed mt-2">
              Every dish is prepared with attention to freshness and taste.
            </p>
          </div>

          <div>
            <div className="w-11 h-11 rounded-lg bg-orange-50 flex items-center justify-center mb-4">
              <MapPin size={21} className="text-orange-500" />
            </div>

            <h3 className="font-semibold text-lg">Simple Experience</h3>

            <p className="text-gray-500 text-sm leading-relaxed mt-2">
              Browse our menu and discover your next favourite meal with ease.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-5 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto bg-gray-900 rounded-2xl px-6 sm:px-10 py-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Ready to explore?
          </h2>

          <p className="text-gray-400 mt-3 max-w-md mx-auto">
            Take a look at our menu and discover something delicious.
          </p>

          <Link
            to="/menu"
            className="inline-flex items-center gap-2 mt-7 bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-lg transition"
          >
            View Menu
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
