import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiService from "@/Components/APIService/apiService"; // Import the common API file
import ClipLoader from "react-spinners/ClipLoader";

export default function SignUpDesktop() {
  const [roleOpen, setRoleOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const navigate = useNavigate();

  const handleRoleToggle = () => {
    setRoleOpen(!roleOpen);
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setRoleOpen(false);
  };

  const handleSubmit = async () => {
    if (!email || !password || !selectedRole) {
      toast.error("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true); // Start loading
    const signupData = { email, password, role: selectedRole };

    try {
      const result = await apiService.post("/admin/signup", signupData);

      if (result) {
        toast.success("Signup successful!");
        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      } else {
        toast.error("Signup failed. Please try again later.");
      }
    } catch (error) {
      toast.error("Signup failed. Please try again later.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 px-2 pt-6 mt-[55px] lg:mt-0 sm:mt-6">
        <div className="relative">
          <img
            src="Image-s.png"
            alt=""
            className="w-full h-auto object-cover hidden sm:block"
          />

          <div className="relative top-1/10 -mt-10">
            <div className="relative h-screen bg-cover bg-center">
              <div className="flex justify-center items-center h-full">
                <div
                  className="relative bg-white p-6 rounded-3xl shadow-lg overflow-y-auto max-h-[90vh] z-10"
                  style={{ marginTop: "-40%", width: "70%" }}
                >
                  <div className="absolute top-4 left-4">
                    <img src="logo1.png" alt="Logo" className="h-12" />
                  </div>

                  <h2
                    className="text-4xl font-bold mb-2 mt-16 text-center"
                    style={{ color: "#4FD1C5" }}
                  >
                    Welcome
                  </h2>
                  <p className="text-center mb-4 text-gray-400">
                    Enter your email and password
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
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
                        />
                      </div>

                      <div className="relative mb-4">
                        <label
                          className="block text-gray-700 mb-2"
                          htmlFor="role"
                        >
                          Role
                        </label>
                        <div
                          className="w-full px-4 py-2 border rounded-lg cursor-pointer flex justify-between items-center"
                          onClick={handleRoleToggle}
                        >
                          {selectedRole || "Select a role"}
                          <span
                            className={`transform transition-transform ${
                              roleOpen ? "rotate-180" : ""
                            }`}
                          >
                            ▼
                          </span>
                        </div>
                        {roleOpen && (
                          <div className="absolute bg-white border mt-1 w-full rounded-lg z-10">
                            {[
                              "Customer Support",
                              "Warehouse Support",
                              "Sale Support",
                              "Complaints Support",
                              "Super Admin",
                            ].map((role) => (
                              <div
                                key={role}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleRoleSelect(role)}
                              >
                                {role}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="mb-4">
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
                        />
                      </div>

                      <div className="mb-6">
                        <label
                          className="block text-gray-700 mb-2"
                          htmlFor="confirm-password"
                        >
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id="confirm-password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Confirm your password"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 flex justify-center">
                    <button
                      onClick={handleSubmit}
                      className="w-1/2 bg-[#4FD1C5] text-white py-2 px-4 rounded-md hover:bg-[#3acabb] transition flex justify-center items-center"
                    >
                      {loading ? (
                        <ClipLoader size={20} color="#ffffff" />
                      ) : (
                        "Sign Up"
                      )}
                    </button>
                  </div>

                  <p className="text-center text-gray-600">
                    Already have an account?{" "}
                    <Link
                      to="/signin"
                      className="text-[#4FD1C5] hover:underline"
                    >
                      Sign In
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
