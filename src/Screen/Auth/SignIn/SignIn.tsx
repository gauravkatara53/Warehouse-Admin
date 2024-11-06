import React, { useEffect, useState } from "react";
import Switch from "react-switch";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface RememberMeSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const RememberMeSwitch: React.FC<RememberMeSwitchProps> = ({
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center mb-6">
      <Switch
        onChange={onChange}
        checked={checked}
        offColor="#BDC3C7"
        onColor="#4FD1C5"
        handleDiameter={20}
        uncheckedIcon={false}
        checkedIcon={false}
        className="react-switch"
        id="remember-me-switch"
      />
      <label htmlFor="remember-me-switch" className="ml-3 text-gray-700">
        Remember me
      </label>
    </div>
  );
};

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (nextChecked: boolean) => {
    setChecked(nextChecked);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scrolling
    return () => {
      document.body.style.overflow = "auto"; // Re-enable scrolling on unmount
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://bookmywarehouse-cwd2a3hgejevh8ht.eastus-01.azurewebsites.net/api/v1/admin/login",
        {
          email: email,
          password: password,
        }
      );

      if (response.data && response.data.token) {
        // Store token and user id in local storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.admin.id); // Store the admin id
        navigate("/"); // Redirect to dashboard or home
      }
    } catch (err: any) {
      // Handle error response with toast
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 px-2 pt-6 lg:mt-0 sm:mt-6 mt-[30px]">
        {/* Background Image */}
        <div className="relative">
          <img
            src="Image-s.png"
            alt=""
            className="w-full h-auto object-cover hidden sm:block"
          />

          {/* Section Overlay */}
          <div className="relative top-1/10 -mt-10 w-full lg:w-full">
            <div className="relative w-full h-screen bg-cover bg-center">
              <div className="flex justify-center items-center h-full">
                <div
                  className="relative bg-white p-8 rounded-3xl shadow-lg w-full max-w-md z-10"
                  style={{ marginTop: "-40%" }}
                >
                  {/* Logo */}
                  <div className="absolute top-4 left-4">
                    <img src="logo1.png" alt="Logo" className="h-12" />
                  </div>

                  {/* Welcome Heading */}
                  <h2
                    className="text-4xl font-bold mb-2 mt-16 text-center"
                    style={{ color: "#4FD1C5" }}
                  >
                    Welcome
                  </h2>
                  <p className="text-center mb-4 text-gray-400">
                    Enter your email and password
                  </p>

                  {/* Form */}
                  <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    {/* Password Input */}
                    <div className="mb-6">
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                        required
                      />
                    </div>

                    {/* Remember Me Switch */}
                    <RememberMeSwitch
                      checked={checked}
                      onChange={handleChange}
                    />

                    {/* Sign In Button */}
                    <div className="mb-4">
                      <button
                        type="submit"
                        className="w-full bg-[#4FD1C5] text-white py-2 px-4 rounded-md hover:bg-[#3acabb] transition"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>

                  {/* Sign Up Link */}
                  <p className="text-center text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-[#4FD1C5] hover:underline"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer /> {/* Add ToastContainer to render the toasts */}
    </div>
  );
}
