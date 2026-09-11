import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Search,
  Plus,
  Utensils,
  Eye,
  Filter,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        setError("");

        const token = Cookies.get("token");

        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/admin/menuitems`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setMenuItems(response.data.data);
        } else {
          setError("Unable to fetch menu items.");
        }
      } catch (error) {
        console.error("Error fetching menu items:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load menu items."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this menu item?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = Cookies.get("token");

      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/admin/menuitems/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
       
        setMenuItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );

        toast.success("Menu item deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting menu item:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete menu item"
      );
    }
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.description
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#F1F5F2]">

     
      <section className="bg-white border-b border-[#DDE5DF]">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>

              <div className="flex items-center gap-3 mb-2">

                <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] flex items-center justify-center">

                  <Utensils
                    size={21}
                    className="text-[#14532D]"
                  />

                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Menu Management
                </h1>

              </div>

              <p className="text-sm text-gray-500">
                View and manage all your restaurant menu items.
              </p>

            </div>


            
            <Link
              to="/admin/addmenu"
              className="inline-flex items-center justify-center gap-2 bg-[#14532D] hover:bg-[#0F3D2E] text-white px-5 py-3 rounded-xl text-sm font-semibold transition"
            >

              <Plus size={18} />

              Add Menu Item

            </Link>

          </div>

        </div>

      </section>


      
      <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">


        
        <div className="bg-white rounded-2xl border border-[#DDE5DF] shadow-sm p-4 mb-7">

          <div className="flex flex-col md:flex-row gap-4">

           
            <div className="relative flex-1">

              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search menu items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#14532D] focus:ring-2 focus:ring-[#F0FDF4] transition text-sm"
              />

            </div>


          
            <div className="relative md:w-56">

              <Filter
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#14532D] focus:ring-2 focus:ring-[#F0FDF4] transition text-sm"
              >

                <option value="All">
                  All Categories
                </option>

                <option value="Starter">
                  Starter
                </option>

                <option value="Main Course">
                  Main Course
                </option>

                <option value="Dessert">
                  Dessert
                </option>

                <option value="Beverage">
                  Beverage
                </option>

              </select>

            </div>

          </div>

        </div>


        
        {!loading && !error && (
          <div className="flex items-center justify-between mb-5">

            <div>

              <h2 className="text-lg font-bold text-gray-900">
                All Menu Items
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Showing {filteredItems.length} of{" "}
                {menuItems.length} items
              </p>

            </div>

          </div>
        )}


        
        {loading && (

          <div className="flex items-center justify-center py-24">

            <div className="w-10 h-10 border-4 border-[#F0FDF4] border-t-[#14532D] rounded-full animate-spin"></div>

          </div>

        )}


       
        {!loading && error && (

          <div className="bg-white rounded-2xl border border-red-100 p-10 text-center">

            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">

              <Utensils
                size={25}
                className="text-red-400"
              />

            </div>

            <h3 className="font-semibold text-gray-800">
              Unable to load menu
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              {error}
            </p>

          </div>

        )}


        {!loading &&
          !error &&
          filteredItems.length === 0 && (

            <div className="bg-white rounded-2xl border border-[#DDE5DF] p-12 text-center">

              <div className="w-16 h-16 rounded-full bg-[#F0FDF4] flex items-center justify-center mx-auto mb-4">

                <Utensils
                  size={28}
                  className="text-[#14532D]"
                />

              </div>

              <h3 className="font-semibold text-gray-800">
                No menu items found
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Try changing your search or category filter.
              </p>

            </div>

          )}


        
        {!loading &&
          !error &&
          filteredItems.length > 0 && (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

              {filteredItems.map((item) => (

                <div
                  key={item._id}
                  className="bg-white rounded-2xl border border-[#DDE5DF] shadow-sm overflow-hidden hover:shadow-md transition"
                >

                 
                  <div className="relative h-52 bg-[#F0FDF4] overflow-hidden">

                    {item.image?.url ? (

                      <img
                        src={item.image.url}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                      />

                    ) : (

                      <div className="w-full h-full flex items-center justify-center">

                        <Utensils
                          size={45}
                          className="text-[#14532D]/30"
                        />

                      </div>

                    )}


                   
                    <div className="absolute top-3 right-3">

                      {item.availability ? (

                        <span className="bg-green-50 text-green-600 border border-green-100 px-3 py-1 rounded-full text-xs font-semibold">
                          Available
                        </span>

                      ) : (

                        <span className="bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded-full text-xs font-semibold">
                          Unavailable
                        </span>

                      )}

                    </div>

                  </div>


                  
                  <div className="p-5">

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <p className="text-xs font-semibold text-[#D4A017] uppercase tracking-wide">
                          {item.category}
                        </p>

                        <h3 className="font-bold text-gray-900 text-lg mt-1">
                          {item.name}
                        </h3>

                      </div>

                    </div>


                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                      {item.description}
                    </p>


                 
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#DDE5DF]">

                      <span className="text-lg font-bold text-gray-900">
                        ₹{item.price}
                      </span>


                      <div className="flex items-center gap-3">

                       
                        <Link
                          to={`/admin/menu/manage/${item._id}`}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#14532D] transition"
                        >

                          <Eye size={16} />

                          Manage

                        </Link>


                        
                        <button
                          type="button"
                          onClick={() => handleDelete(item._id)}
                          className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-red-500 bg-red-50 hover:bg-red-100 transition"
                          title="Delete menu item"
                        >

                          <Trash2 size={16} />

                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

      </main>

    </div>
  );
};

export default AdminMenu;