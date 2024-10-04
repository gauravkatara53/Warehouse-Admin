import { useState } from "react";
import Sidebar from "@/Components/Common/SideBar/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

export default function Profile() {
  const [image, setImage] = useState("user5.png"); // State to store the uploaded image

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Use optional chaining to safely access files
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImage(reader.result as string); // Assert that result is a string
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-2 -mt-3 sm:p-4 lg:mt-0 sm:mt-6">
        {/* Background Image */}
        <div className="relative">
          <img
            src="Breadcrumb.png"
            alt=""
            className="w-full h-auto object-cover"
          />

          {/* Section Overlay */}
          <div className="relative top-1/10 -mt-10 w-full lg:w-full">
            <section className="flex flex-col sm:flex-row justify-between items-center p-4 py-3 bg-white bg-opacity-80 rounded-md shadow-md mx-4 sm:mx-6 px-3 lg:px-8">
              {/* Left Side - Profile Image with Pencil Icon */}
              <div className="relative flex-shrink-0 mb-4 sm:mb-0">
                <img
                  src={image} // Use the image state for the profile image
                  alt="Profile"
                  className="w-20 h-20 rounded-lg object-cover"
                />
                {/* Pencil Icon at bottom right of the image */}
                <span
                  className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md cursor-pointer"
                  onClick={() => {
                    const fileInput = document.getElementById(
                      "fileInput"
                    ) as HTMLInputElement | null; // Type assertion
                    if (fileInput) {
                      fileInput.click(); // Trigger file input if it exists
                    }
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPencilAlt}
                    className="text-gray-500"
                  />
                </span>
                {/* Hidden file input for image upload */}
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden" // Hide the file input
                />
              </div>

              {/* Middle Section - Heading and Subheading */}
              <div className="ml-0 sm:ml-6 flex-grow text-center sm:text-left">
                <h2 className="text-lg font-semibold">Cody Rhodes</h2>
                <p className="text-gray-400 text-sm">cody@ricoz.com</p>
              </div>

              {/* Right Side - Log Out Button */}
              <Link to="/signin">
                <div className="mt-4 sm:mt-0">
                  <button className="group border flex items-center bg-white text-black px-4 py-2 rounded-md hover:bg-[#9F8EF2] hover:text-white">
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      className="mr-2 text-black group-hover:text-white"
                    />
                    Log Out
                  </button>
                </div>
              </Link>
            </section>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-wrap lg:flex-nowrap gap-6 mt-4">
          {/* Left part */}
          <div className="flex flex-col w-full lg:w-[55%] space-y-6 flex-shrink-0">
            <div className="bg-white rounded-md shadow-md p-6 mx-4 sm:mx-6">
              {/* Heading */}
              <h3 className="text-lg font-bold text-gray-800">
                Personal Information
              </h3>
              {/* Description */}
              <p className="text-sm text-gray-500 mt-2">
                This information is used to identify you within the system.
                Please ensure all your details are accurate.
              </p>

              {/* Horizontal Line */}
              <hr className="my-4" />

              {/* Personal Details */}
              <div className="space-y-4">
                <div>
                  <span className="font-semibold text-gray-700">
                    Full Name:{" "}
                  </span>
                  <span className="text-gray-500">Cody Rhodes</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Mobile: </span>
                  <span className="text-gray-500">+123 456 7890</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Email: </span>
                  <span className="text-gray-500">cody@ricoz.com</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">
                    Location:{" "}
                  </span>
                  <span className="text-gray-500">New York, USA</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-6">
                <span className="font-semibold text-gray-700">
                  Social Media:{" "}
                </span>
                <div className="flex space-x-4 mt-2">
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className="text-blue-600"
                  />
                  <FontAwesomeIcon icon={faTwitter} className="text-blue-400" />
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="text-pink-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
