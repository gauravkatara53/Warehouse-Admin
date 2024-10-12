import { useState, useEffect } from "react";
import Sidebar from "@/Components/Common/SideBar/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faSignOutAlt,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function Profile() {
  const [image, setImage] = useState("user5.png");
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingName, setEditingName] = useState(false); // State to control editing mode
  const [newName, setNewName] = useState(""); // State to store the new name
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://bookmywarehouse-cwd2a3hgejevh8ht.eastus-01.azurewebsites.net/api/v1/admin/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile data.");
        }

        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        setError("Something went wrong while fetching the data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://bookmywarehouse-cwd2a3hgejevh8ht.eastus-01.azurewebsites.net/api/v1/admin/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (result.success) {
        alert(result.message);
        localStorage.removeItem("token");
        navigate("/signin");
      } else {
        alert("Failed to log out.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred while logging out.");
    }
  };

  // Handle name edit in the "Personal Information" section
  const handleEditName = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://bookmywarehouse-cwd2a3hgejevh8ht.eastus-01.azurewebsites.net/api/v1/admin/update-profile",
        {
          method: "PATCH", // Updated to PATCH
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: newName,
          }),
        }
      );

      if (response.ok) {
        const updatedProfile = {
          ...profileData,
          data: { ...profileData.data, name: newName },
        };
        setProfileData(updatedProfile);
        setEditingName(false); // Exit edit mode
      } else {
        throw new Error("Failed to update the profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap overflow-hidden">
      <Sidebar />

      <div className="flex-1 p-2 -mt-3 sm:p-4 lg:mt-0 sm:mt-6">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="dot-container">
              <div className="loading-text">Loading</div>
              <div className="flex space-x-2 mr-6">
                <div className="dot-1 w-6 h-6 bg-gray-600 rounded-full animate-bounce"></div>
                <div className="dot-2 w-6 h-6 bg-gray-600 rounded-full animate-bounce delay-150"></div>
                <div className="dot-3 w-6 h-6 bg-gray-600 rounded-full animate-bounce delay-300"></div>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-[90vh]">
            <p className="text-red-600 text-lg font-semibold">{error}</p>
          </div>
        ) : (
          <>
            {/* Background Image */}
            <div className="relative">
              <img
                src="Breadcrumb.png"
                alt=""
                className="w-full h-auto object-cover"
              />

              <div className="relative top-1/10 -mt-10 w-full lg:w-full">
                <section className="flex flex-col sm:flex-row justify-between items-center p-4 py-3 bg-white bg-opacity-80 rounded-md shadow-md mx-4 sm:mx-6 px-3 lg:px-8">
                  <div className="relative flex-shrink-0 mb-4 sm:mb-0">
                    <img
                      src={image}
                      alt="Profile"
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <span
                      className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md cursor-pointer"
                      onClick={() => {
                        const fileInput = document.getElementById(
                          "fileInput"
                        ) as HTMLInputElement | null;
                        if (fileInput) {
                          fileInput.click();
                        }
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faPencilAlt}
                        className="text-gray-500"
                      />
                    </span>
                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>

                  <div className="ml-0 sm:ml-6 flex-grow text-center sm:text-left">
                    <h2 className="text-lg font-semibold">
                      {profileData?.data?.name ?? "NA"}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      {profileData?.data?.email ?? "NA"}
                    </p>
                  </div>

                  <div className="mt-4 sm:mt-0">
                    <button
                      className="group border flex items-center bg-white text-black px-4 py-2 rounded-md hover:bg-[#9F8EF2] hover:text-white"
                      onClick={handleLogout}
                    >
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        className="mr-2 text-black group-hover:text-white"
                      />
                      Logout
                    </button>
                  </div>
                </section>
              </div>
            </div>

            <div className="flex flex-wrap lg:flex-nowrap gap-6 mt-4">
              <div className="flex flex-col w-full lg:w-[55%] space-y-6 flex-shrink-0">
                <div className="bg-white rounded-md shadow-md p-6 mx-4 sm:mx-6">
                  <h3 className="text-lg font-bold text-gray-800">
                    Personal Information
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    This information is used to identify you within the system.
                    Please ensure all your details are accurate.
                  </p>

                  <hr className="my-4" />

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-gray-700">
                          Full Name:{" "}
                        </span>
                        {editingName ? (
                          <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="border p-2 rounded-md"
                          />
                        ) : (
                          <span className="text-gray-500">
                            {profileData?.data?.name ?? "NA"}
                          </span>
                        )}
                      </div>
                      {editingName ? (
                        <button
                          className=" text-green-500 px-2 py-1 rounded-md"
                          onClick={handleEditName}
                        >
                          <FontAwesomeIcon icon={faCheck} />{" "}
                          {/* This adds the tick/check icon */}
                        </button>
                      ) : (
                        <FontAwesomeIcon
                          icon={faPencilAlt}
                          className="ml-2 text-gray-500 cursor-pointer"
                          onClick={() => {
                            setEditingName(true);
                            setNewName(profileData?.data?.name || ""); // Pre-fill with current name
                          }}
                        />
                      )}
                    </div>

                    <div>
                      <span className="font-semibold text-gray-700">
                        Mobile:{" "}
                      </span>
                      <span className="text-gray-500">
                        {profileData?.data?.mobile ?? "NA"}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">
                        Email:{" "}
                      </span>
                      <span className="text-gray-500">
                        {profileData?.data?.email ?? "NA"}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">
                        Location:{" "}
                      </span>
                      <span className="text-gray-500">
                        {profileData?.data?.location ?? "NA"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <span className="font-semibold text-gray-700">
                      Social Media:{" "}
                    </span>
                    <div className="flex space-x-4 mt-2">
                      <FontAwesomeIcon
                        icon={faFacebook}
                        className="text-blue-600"
                      />
                      <FontAwesomeIcon
                        icon={faTwitter}
                        className="text-blue-500"
                      />
                      <FontAwesomeIcon
                        icon={faInstagram}
                        className="text-pink-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
