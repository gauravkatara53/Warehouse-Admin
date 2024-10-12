import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Switch from "react-switch";

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

export default function SignUpMobile() {
  const [checked, setChecked] = useState<boolean>(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate(); // Used for redirection

  const handleRoleToggle = () => {
    setRoleOpen(!roleOpen);
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setRoleOpen(false);
  };

  const handleChange = (nextChecked: boolean) => {
    setChecked(nextChecked);
  };

  const handleSubmit = async () => {
    // Validate fields
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!email || !selectedRole || !password) {
      toast.error("All fields are required", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await axios.post(
        "https://bookmywarehouse-cwd2a3hgejevh8ht.eastus-01.azurewebsites.net/api/v1/admin/signup",
        {
          email,
          password,
          role: selectedRole,
        }
      );
      console.log("Signup successful:", response.data);
      toast.success("Signup successful! Redirecting to Sign In...", {
        position: "top-right",
        autoClose: 3000,
      });

      // Redirect to Sign In after 3 seconds
      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error(
            `Signup failed: ${error.response.status} ${error.response.statusText}`
          );
          toast.error(
            `Signup failed: ${
              error.response.data.message || "Internal Server Error"
            }`,
            {
              position: "top-right",
              autoClose: 3000,
            }
          );
        } else if (error.request) {
          // Request was made but no response was received
          console.error("No response received from server:", error.request);
          toast.error("No response received from server. Please try again.", {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          // Something happened in setting up the request
          console.error("Error in setting up request:", error.message);
          toast.error("An error occurred. Please try again.", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-2 pt-6 mt-0">
        <div className="relative w-full max-w-md bg-white p-6 rounded-3xl shadow-lg overflow-y-auto h-full">
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

          {/* Fields Section */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              {/* Email Input */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Role Input */}
              <div className="relative mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="role">
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
              {/* Password Input */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Confirm Password Input */}
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
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Remember Me Switch */}
          <RememberMeSwitch checked={checked} onChange={handleChange} />

          {/* Sign In Button */}
          <div className="mb-4 flex justify-center">
            <button
              className="w-full bg-[#4FD1C5] text-white py-2 px-4 rounded-md hover:bg-[#3acabb] transition"
              onClick={handleSubmit}
            >
              Sign In
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signin" className="text-[#4FD1C5] font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
