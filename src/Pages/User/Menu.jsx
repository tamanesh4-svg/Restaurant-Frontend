import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight, Search, Utensils } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();

  const categories = [
    "All",
    "Starter",
    "Main Course",
    "Dessert",
    "Beverage",
  ];

  // ================= FETCH MENU ITEMS =================
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/user/menuitems`,
        );

        if (response.data.success) {
          setMenuItems(response.data.data);
        }
      } catch (error) {
        console.error(error);
        setError("Unable to load menu items.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // ================= CATEGORY FROM URL =================
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");

    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setActiveCategory(categoryFromUrl);
    } else {
      setActiveCategory("All");
    }
  }, [searchParams]);

  // ================= FILTER MENU =================
  useEffect(() => {
    let items = [...menuItems];

    // Category filter
    if (activeCategory !== "All") {
      items = items.filter(
        (item) => item.category === activeCategory
      );
    }

    // Search filter
    if (search.trim() !== "") {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredItems(items);
  }, [menuItems, activeCategory, search]);

  return (
    <div className="bg-[#F6F5EF] min-h-screen text-gray-900">

      {/* ================= HEADER ================= */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-12 pb-8">

        <div className="text-center max-w-2xl mx-auto">

          <p className="text-[#166534] text-sm font-semibold uppercase tracking-wider">
            Our Menu
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold mt-2">
            Explore Our Menu
          </h1>

          <p className="text-gray-500 mt-3 leading-relaxed">
            Discover delicious dishes prepared with care.
            Choose something you love and enjoy great taste.
          </p>

        </div>

      </section>


      {/* ================= SEARCH + CATEGORY ================= */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">

          <div className="relative">

            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search for a dish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#F0FDF4] transition"
            />

          </div>

        </div>


        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-3 justify-start sm:justify-center">

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition ${
                activeCategory === category
                  ? "bg-[#166534] text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-[#166534]/40 hover:text-[#166534]"
              }`}
            >
              {category}
            </button>
          ))}

        </div>

      </section>


      {/* ================= MENU ITEMS ================= */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10">

        {/* ================= LOADING ================= */}
        {loading && (
          <div className="flex justify-center items-center py-20">

            <div className="w-10 h-10 border-4 border-[#D4A017]/30 border-t-[#166534] rounded-full animate-spin"></div>

          </div>
        )}


        {/* ================= ERROR ================= */}
        {!loading && error && (
          <div className="text-center py-20">

            <p className="text-red-500">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-5 py-2 bg-[#166534] hover:bg-[#14532D] text-white rounded-lg"
            >
              Try Again
            </button>

          </div>
        )}


        {/* ================= EMPTY ================= */}
        {!loading &&
          !error &&
          filteredItems.length === 0 && (
            <div className="text-center py-20">

              <Utensils
                size={40}
                className="mx-auto text-gray-300"
              />

              <h3 className="text-lg font-semibold mt-4">
                No dishes found
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Try another category or search term.
              </p>

            </div>
          )}


        {/* ================= CARDS ================= */}
        {!loading &&
          !error &&
          filteredItems.length > 0 && (

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

              {filteredItems.map((item) => (

                <div
                  key={item._id}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition duration-300"
                >

                  {/* ================= IMAGE ================= */}
                  <div className="relative h-52 overflow-hidden">

                    {item.image?.url ? (
                      <img
                        src={item.image.url}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#F0FDF4] flex items-center justify-center">
                        <Utensils
                          size={45}
                          className="text-[#166534]"
                        />
                      </div>
                    )}

                    {/* Category */}
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full">
                      {item.category}
                    </span>


                    {/* Availability */}
                    <span
                      className={`absolute top-3 right-3 text-xs font-medium px-3 py-1.5 rounded-full ${
                        item.availability
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.availability
                        ? "Available"
                        : "Unavailable"}
                    </span>

                  </div>


                  {/* ================= CONTENT ================= */}
                  <div className="p-5">

                    <h3 className="font-semibold text-lg">
                      {item.name}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed mt-2 line-clamp-2">
                      {item.description}
                    </p>


                    {/* Bottom */}
                    <div className="flex items-center justify-between mt-5">

                      <p className="text-[#D4A017] font-bold text-lg">
                        ₹{item.price}
                      </p>

                      <Link
                        to={`/menu/${item._id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-[#166534] transition"
                      >
                        View Details
                        <ArrowRight size={16} />
                      </Link>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

      </section>

    </div>
  );
};

export default Menu;