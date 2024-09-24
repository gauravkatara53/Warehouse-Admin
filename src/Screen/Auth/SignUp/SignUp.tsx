import Switch from "react-switch";
import React, { useState } from "react";
import { Link } from "react-router-dom";

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
        offColor="#BDC3C7" // Color when unchecked
        onColor="#4FD1C5" // Color when checked
        handleDiameter={20} // Adjust handle size if needed
        uncheckedIcon={false} // Hide unchecked icon (cross)
        checkedIcon={false} // Hide checked icon (tick)
        className="react-switch"
        id="remember-me-switch"
      />
      <label htmlFor="remember-me-switch" className="ml-3 text-gray-700">
        Remember me
      </label>
    </div>
  );
};
export default function SingUp() {
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = (nextChecked: boolean) => {
    setChecked(nextChecked);
  };
  return (
    <div className="flex flex-wrap lg:flex-nowrap overflow-hidden">
      {/* Sidebar */}

      {/* Main Content */}
      <div className=" flex-1 px-4 pt-6 mt-9 lg:mt-0 sm:mt-6">
        {/* Background Image */}
        <div className="relative">
          <img
            src="Image-s.png"
            alt=""
            className="w-full h-auto object-cover"
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

                  {/* Email Input */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="email">
                      Username
                    </label>
                    <input
                      type="Username"
                      id="Username"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your username"
                    />
                  </div>

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
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your password"
                    />
                  </div>

                  {/* Remember Me Switch */}
                  <RememberMeSwitch checked={checked} onChange={handleChange} />

                  {/* Sign In Button */}
                  <div className="mb-4">
                    <button className="w-full bg-[#4FD1C5] text-white py-2 px-4 rounded-md hover:bg-[#3acabb] transition">
                      Sign In
                    </button>
                  </div>

                  {/* Sign Up Link */}
                  <p className="text-center text-gray-600">
                    Don't have an account?{" "}
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
    </div>
  );
}