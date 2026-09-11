import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  X,
  Save,
  Utensils,
} from "lucide-react";
import { toast } from "sonner";

const AddMenu = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    availability: true,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleAvailability = (e) => {
    setFormData((prev) => ({
      ...prev,
      availability: e.target.value === "true",
    }));
  };

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

 
  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter the menu item name");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Please enter the description");
      return;
    }

    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }

    if (!formData.price || Number(formData.price) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    if (!image) {
      toast.error("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const token = Cookies.get("token");

      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("availability", formData.availability);
      data.append("image", image);

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/admin/addMenu`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Menu item added successfully");

        setFormData({
          name: "",
          description: "",
          category: "",
          price: "",
          availability: true,
        });

        setImage(null);
        setPreview(null);

        setTimeout(() => {
          navigate("/admin/addmenu");
        }, 800);
      }
    } catch (error) {
      console.error("Error adding menu item:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to add menu item"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F2]">

     
      <section className="bg-white border-b border-[#DDE5DF]">

        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-8">

          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#14532D] transition mb-5"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-[#F0FDF4] flex items-center justify-center">
              <Utensils
                size={24}
                className="text-[#14532D]"
              />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Add Menu Item
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Add a new item to your restaurant menu.
              </p>
            </div>

          </div>

        </div>

      </section>


      
      <main className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-10">

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-[#DDE5DF] shadow-sm overflow-hidden"
        >

          <div className="p-6 sm:p-8">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">


             
              <div className="space-y-6">

                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Item Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Chicken Biryani"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#14532D] focus:ring-2 focus:ring-[#F0FDF4] transition"
                  />
                </div>


               
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Describe the dish..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none resize-none focus:border-[#14532D] focus:ring-2 focus:ring-[#F0FDF4] transition"
                  />
                </div>


                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#14532D] focus:ring-2 focus:ring-[#F0FDF4] transition"
                  >

                    <option value="">
                      Select category
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


                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Price
                    </label>

                    <div className="relative">

                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4A017]">
                        ₹
                      </span>

                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#14532D] focus:ring-2 focus:ring-[#F0FDF4] transition"
                      />

                    </div>
                  </div>


                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Availability
                    </label>

                    <select
                      value={formData.availability}
                      onChange={handleAvailability}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#14532D] focus:ring-2 focus:ring-[#F0FDF4] transition"
                    >

                      <option value="true">
                        Available
                      </option>

                      <option value="false">
                        Unavailable
                      </option>

                    </select>
                  </div>

                </div>

              </div>


             
              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Item Image
                </label>

                {!preview ? (

                  <label
                    htmlFor="image"
                    className="border-2 border-dashed border-gray-200 rounded-2xl h-80 flex flex-col items-center justify-center cursor-pointer hover:border-[#14532D] hover:bg-[#F0FDF4] transition"
                  >

                    <div className="w-14 h-14 rounded-xl bg-[#F0FDF4] flex items-center justify-center mb-4">

                      <Upload
                        size={25}
                        className="text-[#14532D]"
                      />

                    </div>

                    <p className="font-semibold text-gray-700">
                      Upload food image
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      Click to select an image
                    </p>

                    <p className="text-xs text-gray-400 mt-3">
                      JPG, PNG or WEBP
                    </p>

                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />

                  </label>

                ) : (

                  <div className="relative h-80 rounded-2xl overflow-hidden bg-gray-100">

                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-gray-600 hover:text-red-500 shadow-sm transition"
                    >
                      <X size={18} />
                    </button>

                  </div>

                )}

                {image && (
                  <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">

                    <ImageIcon size={16} />

                    <span className="truncate">
                      {image.name}
                    </span>

                  </div>
                )}

              </div>

            </div>

          </div>


         
          <div className="border-t border-[#DDE5DF] bg-[#F1F5F2] px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <p className="text-xs text-gray-400">
              All fields are required except availability.
            </p>

            <div className="flex items-center gap-3">

              <Link
                to="/admin/addmenu"
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-white transition"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#14532D] hover:bg-[#0F3D2E] disabled:bg-[#A7B8AE] text-white text-sm font-semibold transition"
              >

                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                    Adding...
                  </>
                ) : (
                  <>
                    <Save size={17} />
                    Add Menu Item
                  </>
                )}

              </button>

            </div>

          </div>

        </form>

      </main>

    </div>
  );
};

export default AddMenu;