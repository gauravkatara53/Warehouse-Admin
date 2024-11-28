import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import apiService from "@/Components/APIService/apiService";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scrolling
    return () => {
      document.body.style.overflow = "auto"; // Re-enable scrolling on unmount
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiService.post<{
        token: string;
        admin: { id: string };
      }>("/admin/login", {
        email: email,
        password: password,
      });

      if (response?.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("id", response.admin.id);
        navigate("/"); // Redirect to dashboard or home
      }
    } catch (err: any) {
      // Display specific error messages
      if (err.message === "User not found") {
        toast.error("User not found. Please check your credentials.");
      } else if (err.message === "Incorrect password") {
        toast.error("Incorrect password. Please try again.");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap overflow-hidden">
      <div className="flex-1 px-2 pt-6 lg:mt-0 sm:mt-6 mt-[30px]">
        <div className="relative">
          <img
            src="Image-s.png"
            alt=""
            className="w-full h-auto object-cover hidden sm:block"
          />
          <div className="relative top-1/10 -mt-10 w-full lg:w-full">
            <div className="relative w-full h-screen bg-cover bg-center">
              <div className="flex justify-center items-center h-full">
                <div
                  className="relative bg-white p-8 rounded-3xl shadow-lg w-full max-w-md z-10"
                  style={{ marginTop: "-40%" }}
                >
                  <div className="absolute top-4 left-4">
                    <img src="logo1.png" alt="Logo" className="h-12" />
                  </div>

                  <h2
                    className="text-4xl font-bold mb-2 mt-16 text-center"
                    style={{ color: "#4FD1C5" }}
                  >
                    Welcome Back
                  </h2>
                  <p className="text-center mb-4 text-gray-400">
                    Enter your email and password to sign in
                  </p>

                  <form onSubmit={handleSubmit}>
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

                    <div className="mb-4">
                      <button
                        type="submit"
                        className="w-full bg-[#4FD1C5] text-white py-2 px-4 rounded-md hover:bg-[#3acabb] transition"
                        disabled={loading}
                      >
                        {loading ? (
                          <ClipLoader size={20} color="#fff" />
                        ) : (
                          "Sign In"
                        )}
                      </button>
                    </div>
                  </form>

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
      <ToastContainer />
    </div>
  );
}
