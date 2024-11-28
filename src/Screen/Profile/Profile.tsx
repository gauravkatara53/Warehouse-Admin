import { useState, useEffect } from "react";
import Sidebar from "@/Components/Common/SideBar/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faSignOutAlt,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import "./style.css";

export default function Profile() {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false); // State to control edit mode for all fields
  const [newName, setNewName] = useState("");
  const [newMobile, setNewMobile] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [actionLoading, setActionLoading] = useState(false); // Spinner for logout and edit
  const [logoutLoading, setLogoutLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/signin");
          return;
        }

        const response = await fetch(
          "https://bookmywarehouse-cwd2a3hgejevh8ht.eastus-01.azurewebsites.net/api/v1/admin/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          navigate("/signin");
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

  const handleLogout = async () => {
    setLogoutLoading(true);
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
    } finally {
      setLogoutLoading(false);
    }
  };

  // Handle saving edited information for all fields
  const handleEditInfo = async () => {
    setActionLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://bookmywarehouse-cwd2a3hgejevh8ht.eastus-01.azurewebsites.net/api/v1/admin/update-profile",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: newName,
            phone: newMobile,
            address: newLocation,
          }),
        }
      );

      if (response.ok) {
        const updatedProfile = {
          ...profileData,
          data: {
            ...profileData.data,
            name: newName,
            phone: newMobile,
            address: newLocation,
          },
        };
        setProfileData(updatedProfile);
        setEditing(false); // Exit edit mode
      } else {
        throw new Error("Failed to update the profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap overflow-hidden">
      <Sidebar />

      <div className="flex-1 p-2 -mt-3 sm:p-4 lg:mt-0 sm:mt-6">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="dot-container">
              <div className="loading-text -ml-4">Loading</div>
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
                      src={profileData.data.avatar || "userde.jpg"}
                      alt="Profile"
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <span
                      className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md cursor-pointer"
                      onClick={() => {
                        const fileInput = document.getElementById(
                          "fileInput"
                        ) as HTMLInputElement | null;
                        if (fileInput) fileInput.click();
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
                    {logoutLoading ? (
                      <div className="bg-[#9F8EF2] py-2 px-4 rounded ">
                        <ClipLoader size={20} color={"#FFFFFF"} />
                      </div>
                    ) : (
                      <button
                        className="group border flex items-center bg-white text-black px-4 py-2 rounded-md hover:bg-[#9F8EF2] hover:text-white"
                        onClick={handleLogout}
                        disabled={logoutLoading}
                      >
                        <FontAwesomeIcon
                          icon={faSignOutAlt}
                          className="mr-2 text-black group-hover:text-white"
                        />
                        Logout
                      </button>
                    )}
                  </div>
                </section>
              </div>
            </div>

            <div className="flex flex-wrap lg:flex-nowrap gap-6 mt-4">
              <div className="flex flex-col w-full lg:w-[55%] space-y-6 flex-shrink-0">
                <div className="bg-white rounded-md shadow-md p-6 mx-4 sm:mx-6">
                  <h3 className="text-lg font-bold text-gray-800">Role</h3>
                  <div>
                    <span className="text-gray-500">
                      {profileData?.data?.role ?? "NA"}
                    </span>
                  </div>

                  <hr className="my-4" />

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-gray-700">
                          Full Name:{" "}
                        </span>
                        {editing ? (
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
                      {editing ? (
                        <button
                          className="text-green-500 px-2 py-1 rounded-md"
                          onClick={handleEditInfo}
                          disabled={actionLoading}
                        >
                          {actionLoading ? (
                            <ClipLoader size={15} color={"#10B981"} />
                          ) : (
                            <FontAwesomeIcon icon={faCheck} />
                          )}
                        </button>
                      ) : (
                        <FontAwesomeIcon
                          icon={faPencilAlt}
                          className="ml-2 text-gray-500 cursor-pointer"
                          onClick={() => {
                            setEditing(true);
                            setNewName(profileData?.data?.name || "");
                            setNewMobile(profileData?.data?.phone || "");
                            setNewLocation(profileData?.data?.address || "");
                          }}
                        />
                      )}
                    </div>

                    <div>
                      <span className="font-semibold text-gray-700">
                        Mobile:{" "}
                      </span>
                      {editing ? (
                        <input
                          type="text"
                          value={newMobile}
                          onChange={(e) => setNewMobile(e.target.value)}
                          className="border p-2 rounded-md"
                        />
                      ) : (
                        <span className="text-gray-500">
                          {profileData?.data?.phone ?? "NA"}
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="font-semibold text-gray-700">
                        Location:{" "}
                      </span>
                      {editing ? (
                        <input
                          type="text"
                          value={newLocation}
                          onChange={(e) => setNewLocation(e.target.value)}
                          className="border p-2 rounded-md"
                        />
                      ) : (
                        <span className="text-gray-500">
                          {profileData?.data?.address ?? "NA"}
                        </span>
                      )}
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
