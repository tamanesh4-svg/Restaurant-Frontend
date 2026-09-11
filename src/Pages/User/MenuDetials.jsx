import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, CheckCircle, XCircle, Utensils } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const MenuDetails = () => {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/user/menuitems/${id}`,
        );

        if (response.data.success) {
          setItem(response.data.data);
        } else {
          setError("Menu item not found.");
        }
      } catch (error) {
        console.error(error);
        setError("Unable to load menu item.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItem();
  }, [id]);

  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F5EF] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#D4A017]/30 border-t-[#166534] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-[#F6F5EF] flex flex-col items-center justify-center px-5">

        <Utensils
          size={50}
          className="text-gray-300"
        />

        <h2 className="text-xl font-semibold mt-5">
          Menu item not found
        </h2>

        <p className="text-gray-500 mt-2 text-center">
          The menu item you are looking for does not exist.
        </p>

        <Link
          to="/menu"
          className="mt-6 inline-flex items-center gap-2 bg-[#166534] text-white px-5 py-2.5 rounded-lg hover:bg-[#14532D] transition"
        >
          <ArrowLeft size={18} />
          Back to Menu
        </Link>

      </div>
    );
  }

  return (
    <div className="bg-[#F6F5EF] min-h-screen text-gray-900">

     
      <section className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-10">

        
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#166534] transition mb-8"
        >
          <ArrowLeft size={18} />
          Back to Menu
        </Link>


        
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">

          <div className="grid md:grid-cols-2">

            
            <div className="h-80 md:h-[500px] bg-[#F0FDF4]">

              {item.image?.url ? (
                <img
                  src={item.image.url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Utensils
                    size={70}
                    className="text-[#166534]"
                  />
                </div>
              )}

            </div>


            
            <div className="p-7 sm:p-10 flex flex-col justify-center">

             
              <span className="self-start bg-[#F0FDF4] text-[#166534] text-sm font-semibold px-4 py-2 rounded-full">
                {item.category}
              </span>


              
              <h1 className="text-3xl sm:text-4xl font-bold mt-5">
                {item.name}
              </h1>


              
              <p className="text-gray-500 leading-relaxed mt-5 text-base">
                {item.description}
              </p>


              
              <div className="mt-7">

                <p className="text-sm text-gray-400">
                  Price
                </p>

                <p className="text-3xl font-bold text-[#D4A017] mt-1">
                  ₹{item.price}
                </p>

              </div>


             
              <div className="mt-6">

                {item.availability ? (
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2.5 rounded-lg text-sm font-medium">
                    <CheckCircle size={18} />
                    Available
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2.5 rounded-lg text-sm font-medium">
                    <XCircle size={18} />
                    Currently Unavailable
                  </div>
                )}

              </div>


              
              <Link
                to="/menu"
                className="mt-8 inline-flex items-center justify-center gap-2 bg-[#166534] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#14532D] transition"
              >
                <ArrowLeft size={18} />
                Explore More Dishes
              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default MenuDetails;