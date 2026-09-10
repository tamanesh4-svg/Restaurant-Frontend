import axios from "axios";
import { useState } from "react";
import { Loader2, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "js-cookie";

const Login = () => {
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
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

    if (formdata.email === "") {
      errors.email = "Email is required";
    } else if (
      !formdata.email.includes("@") ||
      !formdata.email.includes(".")
    ) {
      errors.email = "Invalid email";
    }

    if (formdata.password === "") {
      errors.password = "Password is required";
    }

    seterror(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validate()) {
      setisError("");
      setisLoading(true);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/auth/login`,
          formdata
        );

        console.log("response data", response);

        if (response.data.success) {
          toast.success(response.data.message);

          Cookies.set("token", response.data.token);
          Cookies.set("role", response.data.user.role);
          Cookies.set(
            "userDetails",
            JSON.stringify(response.data.user)
          );

          if (response.data.user.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/");
          }
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
    <div className="min-h-screen bg-[#F6F5EF] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md">

        {/* Login Card */}
        <div className="bg-white border border-[#DDE5DF] rounded-2xl shadow-sm p-6 sm:p-8">

          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div className="w-12 h-12 rounded-full bg-[#F0FDF4] flex items-center justify-center">
              <LogIn className="text-[#166534]" size={24} />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-7">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Welcome Back
            </h1>

            <p className="text-gray-500 text-sm mt-2">
              Login to continue to{" "}
              <span className="text-[#166534] font-medium">
                RestTaste
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="mb-5">
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
                } focus:outline-none focus:ring-2 focus:ring-[#F0FDF4] focus:border-[#166534] transition`}
              />

              {error.email && (
                <p className="text-red-500 text-sm mt-1">
                  {error.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                onChange={handleChange}
                name="password"
                placeholder="Enter your password"
                value={formdata.password}
                className={`w-full px-4 py-3 rounded-lg border ${
                  error.password
                    ? "border-red-400"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#F0FDF4] focus:border-[#166534] transition`}
              />

              {error.password && (
                <p className="text-red-500 text-sm mt-1">
                  {error.password}
                </p>
              )}
            </div>

            {/* Backend Error */}
            {isError && (
              <p className="text-sm text-red-600 mb-4">
                {isError}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-[#166534] hover:bg-[#14532D] disabled:bg-[#A7B8AE] text-white font-medium py-3 rounded-lg transition duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Signup */}
          <div className="text-center mt-6 pt-5 border-t border-[#DDE5DF]">
            <p className="text-sm text-gray-500">
              Don't have an account?
            </p>

            <button
              type="button"
              onClick={() => navigate("/register")}
              className="mt-2 text-[#166534] font-medium hover:text-[#14532D] transition"
            >
              Create an account
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;