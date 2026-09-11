import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Users,
  Trash2,
  User,
  Mail,
  Phone,
  Shield,
  CalendarDays,
} from "lucide-react";
import { toast } from "sonner";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const token = Cookies.get("token");

        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/admin/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setUsers(response.data.data);
        } else {
          setError("Unable to fetch users.");
        }

      } catch (error) {
        console.error("Error fetching users:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load registered users."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

 
  const handleDelete = async (id, username) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${username}?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = Cookies.get("token");

      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/admin/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== id)
        );

        toast.success("User deleted successfully");
      }

    } catch (error) {
      console.error("Error deleting user:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete user"
      );
    }
  };

  
  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#F1F5F2]">

     
      <section className="bg-white border-b border-[#DDE5DF]">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-[#F0FDF4] flex items-center justify-center">

              <Users
                size={25}
                className="text-[#14532D]"
              />

            </div>

            <div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                User Management
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                View and manage all registered users.
              </p>

            </div>

          </div>

        </div>

      </section>


      
      <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">


        
        {!loading && !error && (

          <div className="flex items-center justify-between mb-5">

            <div>

              <h2 className="text-lg font-bold text-gray-900">
                Registered Users
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Showing {users.length} registered users
              </p>

            </div>

            <div className="bg-[#F0FDF4] text-[#14532D] px-4 py-2 rounded-lg text-sm font-semibold">
              {users.length} Users
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

              <Users
                size={25}
                className="text-red-400"
              />

            </div>

            <h3 className="font-semibold text-gray-800">
              Unable to load users
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              {error}
            </p>

          </div>

        )}


       
        {!loading &&
          !error &&
          users.length === 0 && (

            <div className="bg-white rounded-2xl border border-[#DDE5DF] p-12 text-center">

              <div className="w-16 h-16 rounded-full bg-[#F0FDF4] flex items-center justify-center mx-auto mb-4">

                <Users
                  size={28}
                  className="text-[#14532D]"
                />

              </div>

              <h3 className="font-semibold text-gray-800">
                No users found
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                There are currently no registered users.
              </p>

            </div>

          )}


        
        {!loading &&
          !error &&
          users.length > 0 && (

            <div className="bg-white rounded-2xl border border-[#DDE5DF] shadow-sm overflow-hidden">

              {/* DESKTOP TABLE */}
              <div className="hidden md:block overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="bg-[#F1F5F2] border-b border-[#DDE5DF]">

                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        User
                      </th>

                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Email
                      </th>

                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Phone
                      </th>

                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Role
                      </th>

                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Registered
                      </th>

                      <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Action
                      </th>

                    </tr>

                  </thead>


                  <tbody className="divide-y divide-[#DDE5DF]">

                    {users.map((user) => (

                      <tr
                        key={user._id}
                        className="hover:bg-[#F1F5F2] transition"
                      >

                        
                        <td className="px-6 py-5">

                          <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-full bg-[#F0FDF4] flex items-center justify-center flex-shrink-0">

                              <User
                                size={18}
                                className="text-[#14532D]"
                              />

                            </div>

                            <div>

                              <p className="font-semibold text-gray-800">
                                {user.username}
                              </p>

                              <p className="text-xs text-gray-400">
                                User ID: {user._id.slice(-6)}
                              </p>

                            </div>

                          </div>

                        </td>


                        
                        <td className="px-6 py-5">

                          <div className="flex items-center gap-2 text-sm text-gray-600">

                            <Mail
                              size={15}
                              className="text-gray-400"
                            />

                            {user.email}

                          </div>

                        </td>


                       
                        <td className="px-6 py-5">

                          <div className="flex items-center gap-2 text-sm text-gray-600">

                            <Phone
                              size={15}
                              className="text-gray-400"
                            />

                            {user.phone || "—"}

                          </div>

                        </td>


                       
                        <td className="px-6 py-5">

                          {user.role === "admin" ? (

                            <span className="inline-flex items-center gap-1.5 bg-[#F0FDF4] text-[#14532D] border border-[#DDE5DF] px-3 py-1.5 rounded-full text-xs font-semibold">

                              <Shield size={13} />

                              Admin

                            </span>

                          ) : (

                            <span className="inline-flex items-center gap-1.5 bg-gray-50 text-gray-600 border border-gray-200 px-3 py-1.5 rounded-full text-xs font-semibold">

                              <User size={13} />

                              User

                            </span>

                          )}

                        </td>


                       
                        <td className="px-6 py-5">

                          <div className="flex items-center gap-2 text-sm text-gray-500">

                            <CalendarDays
                              size={15}
                              className="text-gray-400"
                            />

                            {formatDate(user.createdAt)}

                          </div>

                        </td>


                       
                        <td className="px-6 py-5 text-right">

                          <button
                            onClick={() =>
                              handleDelete(
                                user._id,
                                user.username
                              )
                            }
                            className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"
                            title="Delete user"
                          >

                            <Trash2 size={16} />

                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>


              
              <div className="md:hidden divide-y divide-[#DDE5DF]">

                {users.map((user) => (

                  <div
                    key={user._id}
                    className="p-5"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-full bg-[#F0FDF4] flex items-center justify-center">

                          <User
                            size={19}
                            className="text-[#14532D]"
                          />

                        </div>

                        <div>

                          <p className="font-semibold text-gray-800">
                            {user.username}
                          </p>

                          <p className="text-xs text-gray-400">
                            {user.role === "admin"
                              ? "Administrator"
                              : "Registered User"}
                          </p>

                        </div>

                      </div>


                      <button
                        onClick={() =>
                          handleDelete(
                            user._id,
                            user.username
                          )
                        }
                        className="w-9 h-9 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition"
                        title="Delete user"
                      >

                        <Trash2 size={16} />

                      </button>

                    </div>


                    <div className="mt-4 space-y-2.5">

                      <div className="flex items-center gap-2 text-sm text-gray-500">

                        <Mail
                          size={15}
                          className="text-gray-400"
                        />

                        <span className="break-all">
                          {user.email}
                        </span>

                      </div>


                      <div className="flex items-center gap-2 text-sm text-gray-500">

                        <Phone
                          size={15}
                          className="text-gray-400"
                        />

                        {user.phone || "—"}

                      </div>


                      <div className="flex items-center gap-2 text-sm text-gray-500">

                        <CalendarDays
                          size={15}
                          className="text-gray-400"
                        />

                        {formatDate(user.createdAt)}

                      </div>

                    </div>


                    <div className="mt-4">

                      {user.role === "admin" ? (

                        <span className="inline-flex items-center gap-1.5 bg-[#F0FDF4] text-[#14532D] border border-[#DDE5DF] px-3 py-1.5 rounded-full text-xs font-semibold">

                          <Shield size={13} />

                          Admin

                        </span>

                      ) : (

                        <span className="inline-flex items-center gap-1.5 bg-gray-50 text-gray-600 border border-gray-200 px-3 py-1.5 rounded-full text-xs font-semibold">

                          <User size={13} />

                          User

                        </span>

                      )}

                    </div>

                  </div>

                ))}

              </div>

            </div>

          )}

      </main>

    </div>
  );
};

export default AdminUsers;