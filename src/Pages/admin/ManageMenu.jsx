import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  X,
  Save,
  Utensils,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";

const ManageMenu = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    availability: true,
  });

  const [existingImage, setExistingImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

 
  useEffect(() => {

    const fetchMenuItem = async () => {

      try {

        setLoading(true);

        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/user/menuitems/${id}`
        );

        if (response.data.success) {

          const item = response.data.data;

          setFormData({
            name: item.name || "",
            description: item.description || "",
            category: item.category || "",
            price: item.price || "",
            availability: item.availability,
          });

          if (item.image?.url) {
            setExistingImage(item.image.url);
          }

        }

      } catch (error) {

        console.error(
          "Error fetching menu item:",
          error
        );

        toast.error(
          error.response?.data?.message ||
          "Unable to load menu item"
        );

      } finally {

        setLoading(false);

      }

    };

    fetchMenuItem();

  }, [id]);


  
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

    setNewImage(file);

    setPreview(
      URL.createObjectURL(file)
    );

  };


 
  const removeNewImage = () => {

    setNewImage(null);
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


    try {

      setSaving(true);

      const token = Cookies.get("token");

      const data = new FormData();

      data.append("name", formData.name);
      data.append(
        "description",
        formData.description
      );
      data.append(
        "category",
        formData.category
      );
      data.append(
        "price",
        formData.price
      );
      data.append(
        "availability",
        formData.availability
      );

      
      if (newImage) {
        data.append("image", newImage);
      }


      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/admin/menuitems/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      if (response.data.success) {

        toast.success(
          "Menu item updated successfully"
        );

        setTimeout(() => {
          navigate("/admin/menu");
        }, 800);

      }

    } catch (error) {

      console.error(
        "Error updating menu item:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to update menu item"
      );

    } finally {

      setSaving(false);

    }

  };


  
  if (loading) {

    return (
      <div className="min-h-screen bg-[#F1F5F2] flex items-center justify-center">

        <div className="w-10 h-10 border-4 border-[#F0FDF4] border-t-[#14532D] rounded-full animate-spin"></div>

      </div>
    );

  }


  return (

    <div className="min-h-screen bg-[#F1F5F2]">

     
      <section className="bg-white border-b border-[#DDE5DF]">

        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-8">

          <Link
            to="/admin/menu"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#14532D] transition mb-5"
          >
            <ArrowLeft size={17} />
            Back to Menu
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
                Manage Menu Item
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Update the details of this menu item.
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
                    placeholder="Enter item name"
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


               
                <div className="relative h-80 rounded-2xl overflow-hidden bg-[#F0FDF4] border border-[#DDE5DF]">

                  {preview ? (

                    <img
                      src={preview}
                      alt="New preview"
                      className="w-full h-full object-cover"
                    />

                  ) : existingImage ? (

                    <img
                      src={existingImage}
                      alt={formData.name}
                      className="w-full h-full object-cover"
                    />

                  ) : (

                    <div className="w-full h-full flex flex-col items-center justify-center">

                      <ImageIcon
                        size={45}
                        className="text-[#14532D]/30"
                      />

                      <p className="text-sm text-gray-400 mt-3">
                        No image available
                      </p>

                    </div>

                  )}


                 
                  {preview && (

                    <button
                      type="button"
                      onClick={removeNewImage}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-gray-600 hover:text-red-500 shadow-sm transition"
                    >
                      <X size={18} />
                    </button>

                  )}

                </div>


                
                <label
                  htmlFor="newImage"
                  className="mt-4 flex items-center justify-center gap-2 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:border-[#14532D] hover:text-[#14532D] hover:bg-[#F0FDF4] cursor-pointer transition"
                >

                  <Upload size={17} />

                  Change Image

                  <input
                    id="newImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                </label>


                {newImage && (

                  <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">

                    <ImageIcon size={16} />

                    <span className="truncate">
                      {newImage.name}
                    </span>

                  </div>

                )}

              </div>

            </div>

          </div>


         
          <div className="border-t border-[#DDE5DF] bg-[#F1F5F2] px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <p className="text-xs text-gray-400">
              Changes will be saved immediately.
            </p>


            <div className="flex items-center gap-3">

              <Link
                to="/admin/menu"
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-white transition"
              >
                Cancel
              </Link>


              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#14532D] hover:bg-[#0F3D2E] disabled:bg-[#A7B8AE] text-white text-sm font-semibold transition"
              >

                {saving ? (

                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                    Saving...
                  </>

                ) : (

                  <>
                    <Save size={17} />
                    Save Changes
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

export default ManageMenu;