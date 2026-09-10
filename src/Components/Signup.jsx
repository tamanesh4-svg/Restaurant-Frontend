import axios from "axios";
import { Loader2, UserPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Signup = () => {
  const [formdata, setformdata] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmpwd: "",
  });

  const [error, seterror] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setformdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const validate = () => {
    let errors = {};

    if (formdata.username === "") {
      errors.username = "Name is required";
    }

    if (formdata.email === "") {
      errors.email = "Email is required";
    } else if (
      !formdata.email.includes("@") ||
      !formdata.email.includes(".")
    ) {
      errors.email = "Invalid email";
    }

    if (formdata.phone === "") {
      errors.phone = "Phone number is required";
    }

    if (formdata.password === "") {
      errors.password = "Password is required";
    }

    if (formdata.confirmpwd !== formdata.password) {
      errors.confirmpwd = "Password doesn't match";
    }

    seterror(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validate()) {
      const payload = {
        username: formdata.username,
        email: formdata.email,
        phone: formdata.phone,
        password: formdata.password,
      };

      setisError("");
      setisLoading(true);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/auth/signup`,
          payload
        );

        console.log("response data", response);

        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/login");
        }
      } catch (error) {
        console.log("error", error?.response);

        const errMessage =
          error?.response?.data?.message || "Something went wrong";

        toast.error(errMessage);
        setisError(errMessage);
      } finally {
        setisLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md">

        {/* Signup Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">

          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
              <UserPlus
                className="text-orange-500"
                size={24}
              />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-7">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Create Account
            </h1>

            <p className="text-gray-500 text-sm mt-2">
              Join{" "}
              <span className="text-orange-500 font-medium">
                RestTaste
              </span>{" "}
              today
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                onChange={handleChange}
                name="username"
                placeholder="Enter your name"
                value={formdata.username}
                className={`w-full px-4 py-3 rounded-lg border ${
                  error.username
                    ? "border-red-400"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400 transition`}
              />

              {error.username && (
                <p className="text-red-500 text-sm mt-1">
                  {error.username}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                onChange={handleChange}
                name="email"
                placeholder="Enter your email"
                value={formdata.email}
                className={`w-full px-4 py-3 rounded-lg border ${
                  error.email
                    ? "border-red-400"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400 transition`}
              />

              {error.email && (
                <p className="text-red-500 text-sm mt-1">
                  {error.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                onChange={handleChange}
                name="phone"
                placeholder="Enter your phone number"
                value={formdata.phone}
                className={`w-full px-4 py-3 rounded-lg border ${
                  error.phone
                    ? "border-red-400"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400 transition`}
              />

              {error.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {error.phone}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                onChange={handleChange}
                name="password"
                placeholder="Create a password"
                value={formdata.password}
                className={`w-full px-4 py-3 rounded-lg border ${
                  error.password
                    ? "border-red-400"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400 transition`}
              />

              {error.password && (
                <p className="text-red-500 text-sm mt-1">
                  {error.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                onChange={handleChange}
                name="confirmpwd"
                placeholder="Confirm your password"
                value={formdata.confirmpwd}
                className={`w-full px-4 py-3 rounded-lg border ${
                  error.confirmpwd
                    ? "border-red-400"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400 transition`}
              />

              {error.confirmpwd && (
                <p className="text-red-500 text-sm mt-1">
                  {error.confirmpwd}
                </p>
              )}
            </div>

            {/* Backend Error */}
            {isError && (
              <p className="text-sm text-red-600 mb-4">
                {isError}
              </p>
            )}

            {/* Signup Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium py-3 rounded-lg transition duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login */}
          <div className="text-center mt-6 pt-5 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Already have an account?
            </p>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="mt-2 text-orange-500 font-medium hover:text-orange-600 transition"
            >
              Login to your account
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signup;