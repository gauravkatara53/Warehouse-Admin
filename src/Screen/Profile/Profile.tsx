import { useState, useEffect } from "react";
import Sidebar from "@/Components/Common/SideBar/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faSignOutAlt,
  faCheck,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import "./style.css";
import apiService from "@/Components/APIService/apiService";

interface ProfileData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  address?: string;
  city?: string;
  country?: string;
  pincode?: string;
  state?: string;
}

interface ApiResponse {
  success: boolean;
  data: ProfileData;
  message: string;
}

interface LogoutResponse {
  success: boolean;
  message: string;
  data: {};
  statusCode: number;
  errors: null | any;
  timestamp: string;
}

export default function Profile() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newMobile, setNewMobile] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [newPincode, setNewPincode] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProfileData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.get<ApiResponse>("/admin/get-admin");

      if (response?.success) {
        setProfileData(response.data);
      } else {
        setError("Failed to fetch profile data.");
      }
    } catch (error) {
      setError("Something went wrong while fetching the data.");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadOrUpdate = async (file: File | null) => {
    if (!file) {
      console.error("No file selected");
      return; // Exit if no file is selected
    }

    const formData = new FormData();
    formData.append("avatar", file); // Append the file to the FormData object

    try {
      const response = await apiService.patch<ApiResponse>(
        "/admin/update-avatar",
        formData // Axios will handle the Content-Type for FormData
      );

      if (response?.success) {
        // Update the profile data with the new avatar URL
        setProfileData((prevData) =>
          prevData
            ? {
                ...prevData,
                avatar: response.data.avatar, // Update the avatar
              }
            : null
        );
        alert(response.message); // Show success message
      } else {
        setError("Failed to update avatar.");
      }
    } catch (error) {
      console.error("Error updating avatar:", error); // Log the error for debugging
      setError("Something went wrong while updating the avatar.");
    }
  };

  const handleEditInfo = async () => {
    setActionLoading(true);
    setError(null);

    try {
      const response = await apiService.patch<ApiResponse>(
        "/admin/update-detail",
        {
          name: newName,
          phone: newMobile,
          address: newLocation,
          city: newCity,
          state: newState,
          country: newCountry,
          pincode: newPincode,
        }
      );

      if (response?.success) {
        setProfileData((prevData: ProfileData | null) => ({
          ...prevData,
          name: newName,
          phone: newMobile,
          address: newLocation,
          city: newCity || prevData?.city,
          state: newState || prevData?.state,
          country: newCountry || prevData?.country,
          pincode: newPincode || prevData?.pincode,
          _id: prevData?._id || "",
          email: prevData?.email || "",
          avatar: prevData?.avatar || "",
          role: prevData?.role || "",
          isVerified: prevData?.isVerified || false,
          createdAt: prevData?.createdAt || "",
          updatedAt: prevData?.updatedAt || "",
        }));
        setEditing(false); // Exit edit mode after saving
      } else {
        setError("Failed to update profile data.");
      }
    } catch (error) {
      setError("Something went wrong while updating the data.");
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleLogout = async () => {
    setLogoutLoading(true);
    setError(null);

    try {
      const response = await apiService.post<LogoutResponse>(
        "/admin/loginOut",
        {}
      ); // Provide an empty object as the second argument

      if (response?.success) {
        // Remove user data from local storage
        localStorage.removeItem("userData");

        // Clear cookies
        document.cookie.split(";").forEach((cookie) => {
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie =
            name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"; // Clear the cookie
        });

        alert(response.message);
        navigate("/"); // Redirect to login after logout
      } else {
        setError("Failed to log out.");
      }
    } catch (error) {
      setError("An error occurred while logging out.");
    } finally {
      setLogoutLoading(false);
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
                src="Untitled_design__1_-removebg-preview.png"
                alt=""
                className="w-full h-auto object-cover"
              />

              <div className="relative top-1/10 -mt-10 w-full lg:w-full">
                <section className="flex flex-col sm:flex-row justify-between items-center p-4 py-3 bg-white bg-opacity-80 rounded-md shadow-md mx-4 sm:mx-6 px-3 lg:px-8">
                  <div className="relative flex-shrink-0 mb-4 sm:mb-0">
                    <img
                      src={profileData?.avatar || "userde.jpg"}
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
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          console.log("Selected file:", file); // Debugging line
                          handleUploadOrUpdate(file); // Call the upload function with the selected file
                        } else {
                          console.error("No file selected"); // Debugging line
                        }
                      }}
                    />
                  </div>

                  <div className="ml-0 sm:ml-6 flex-grow text-center sm:text-left">
                    <h2 className="text-lg font-semibold">
                      {profileData?.name ?? "NA"}
                      {profileData?.isVerified && (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="text-blue-500 ml-2"
                        />
                      )}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      {profileData?.email ?? "NA"}
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
                      {profileData?.role ?? "NA"}
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
                            {profileData?.name ?? "NA"}
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
                            setNewName(profileData?.name || "");
                            setNewMobile(profileData?.phone || "");
                            setNewLocation(profileData?.address || "");
                            setNewCity(profileData?.city || ""); // Set newCity from profileData
                            setNewState(profileData?.state || ""); // Set newState from profileData
                            setNewCountry(profileData?.country || ""); // Set newCountry from profileData
                            setNewPincode(profileData?.pincode || ""); // Set newPincode from profileData
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
                          {profileData?.phone ?? "NA"}
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
                          {profileData?.address ?? "NA"},{" "}
                        </span>
                      )}
                    </div>

                    {/* New fields for city, state, country, and pincode */}
                    <div>
                      <span className="font-semibold text-gray-700">
                        City:{" "}
                      </span>
                      {editing ? (
                        <input
                          type="text"
                          value={newCity}
                          onChange={(e) => setNewCity(e.target.value)}
                          className="border p-2 rounded-md"
                        />
                      ) : (
                        <span className="text-gray-500">
                          {profileData?.city ?? "NA"}
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="font-semibold text-gray-700">
                        State:{" "}
                      </span>
                      {editing ? (
                        <input
                          type="text"
                          value={newState}
                          onChange={(e) => setNewState(e.target.value)}
                          className="border p-2 rounded-md"
                        />
                      ) : (
                        <span className="text-gray-500">
                          {profileData?.state ?? "NA"}
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="font-semibold text-gray-700">
                        Country:{" "}
                      </span>
                      {editing ? (
                        <input
                          type="text"
                          value={newCountry}
                          onChange={(e) => setNewCountry(e.target.value)}
                          className="border p-2 rounded-md"
                        />
                      ) : (
                        <span className="text-gray-500">
                          {profileData?.country ?? "NA"}
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="font-semibold text-gray-700">
                        Pincode:{" "}
                      </span>
                      {editing ? (
                        <input
                          type="text"
                          value={newPincode}
                          onChange={(e) => setNewPincode(e.target.value)}
                          className="border p-2 rounded-md"
                        />
                      ) : (
                        <span className="text-gray-500">
                          {profileData?.pincode ?? "NA"}
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
