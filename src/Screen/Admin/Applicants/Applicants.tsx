import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import CustomButton2 from "@/Screen/Partner/PartnerInfo/CustomButton2";
import ReplyModal from "./ReplyModal";
import Pagination from "@/Components/Common/Pagination/Pagination";
import apiService from "@/Components/APIService/apiService"; // import the common API service
import { ToastContainer, toast } from "react-toastify"; // import toastify
import "react-toastify/dist/ReactToastify.css"; // import styles for toastify

interface Applicant {
  _id: string;
  email: string;
  type: string;
  role: string;
  name?: string;
  status: "Approved" | "Pending" | "Rejected";
  address: string;
  phone: string;
}
interface VerifyProfileResponse {
  success: boolean;
  message?: string;
}

const Applicants: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Pending");
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [filteredApplicants, setFilteredApplicants] = useState<Applicant[]>([]);
  const [replyComplaint, setReplyComplaint] = useState<null | Applicant>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(""); // Unified search query
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [userRole, setUserRole] = useState<string>(""); // Role of the logged-in user

  const itemsPerPage = 10;

  // Fetch logged-in user's profile to check if they're a superadmin
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await apiService.get<{
          success: boolean;
          data: { role: string };
        }>("/admin/profile");
        if (data?.success) {
          setUserRole(data.data.role); // Save user role
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  // Fetch applicants based on the active tab status
  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://bookmywarehouse-cwd2a3hgejevh8ht.eastus-01.azurewebsites.net/api/v1/admin/get-admins-status?status=${activeTab}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          console.error("Unauthorized: Please check your token.");
          return;
        }

        const data = await response.json();
        if (data.success) {
          setApplicants(data.data);
          setFilteredApplicants(data.data);
          setTotalPages(Math.ceil(data.data.length / itemsPerPage));
        }
      } catch (error) {
        console.error(`Failed to fetch ${activeTab} admins:`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, [activeTab]);

  useEffect(() => {
    // Filter applicants based on search query and active tab
    const filtered = applicants.filter((applicant) => {
      const queryLower = searchQuery.toLowerCase();
      const matchesSearch =
        (applicant.name?.toLowerCase().includes(queryLower) ||
          applicant.email.toLowerCase().includes(queryLower)) &&
        (activeTab === "All" || applicant.status === activeTab);

      return matchesSearch;
    });
    setFilteredApplicants(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  }, [searchQuery, activeTab, applicants]);

  // Pagination handling
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPaginatedApplicants = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredApplicants.slice(startIndex, endIndex);
  };

  const handleStatusChange = async (
    applicantId: string,
    status: "Approved" | "Rejected"
  ) => {
    try {
      const response = await apiService.post<VerifyProfileResponse>(
        "/admin/verify-profile",
        {
          adminDocId: applicantId,
          status,
        }
      );

      if (response?.success) {
        // Update the status of the applicant locally
        const updatedApplicants = applicants.map((applicant) =>
          applicant._id === applicantId ? { ...applicant, status } : applicant
        );
        setApplicants(updatedApplicants);
        setFilteredApplicants(updatedApplicants);

        // Show a toast notification
        toast.success(
          `Applicant ${
            status === "Approved" ? "accepted" : "rejected"
          } successfully!`
        );

        // Reset the active tab to 'Pending'
        setActiveTab("Pending");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error updating applicant status.");
    }
  };

  return (
    <div>
      <section className="px-3 lg:px-6 py-6 bg-white rounded-md">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg lg:text-md font-medium sm:text-xl">
            Approve Admins
          </h2>
        </div>

        <div className="mb-4">
          <div className="flex space-x-4 mb-6">
            {["Pending", "Approved", "Rejected"].map((tab) => (
              <CustomButton2
                key={tab}
                className={
                  activeTab === tab
                    ? "text-white w-20"
                    : "border border-gray-300 bg-white w-20"
                }
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </CustomButton2>
            ))}
          </div>

          <div className="flex space-x-4">
            <input
              type="text"
              className="border p-2 rounded w-full"
              placeholder="Search by Name or Email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Search on change
            />
          </div>
        </div>

        {/* Loading spinner */}
        {loading ? (
          <div className="flex justify-center my-6">
            <ClipLoader size={40} color={"#9F8EF2"} loading={loading} />
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {getPaginatedApplicants().map((applicant) => (
              <div
                key={applicant._id}
                className="flex flex-col sm:flex-row justify-between items-start bg-gray-100 p-4 rounded-md"
              >
                <div className="w-full">
                  <h3 className="text-md font-medium text-gray-700">
                    {applicant.name || "Unknown"}
                  </h3>
                  <p className="text-sm text-gray-400 my-2">{applicant.role}</p>
                  <hr className="border-gray-300 w-40 my-2 " />
                  <p className="text-xs text-gray-600 my-2 font-semibold">
                    Full Name:{" "}
                    <span className="text-gray-500 font-normal">
                      {applicant.name || "N/A"}
                    </span>
                  </p>
                  <p className="text-xs text-gray-600 my-2 font-semibold">
                    Mobile:{" "}
                    <span className="text-gray-500 font-normal">
                      {applicant.phone || "N/A"}
                    </span>
                  </p>
                  <p className="text-xs text-gray-600 my-2 font-semibold">
                    Email:{" "}
                    <span className="text-gray-500 font-normal">
                      {applicant.email}
                    </span>
                  </p>
                  <p className="text-xs text-gray-600 my-2 font-semibold">
                    Location:{" "}
                    <span className="text-gray-500 font-normal">
                      {applicant.address}
                    </span>
                  </p>
                </div>

                {(userRole === "superadmin" || userRole === "Super Admin") &&
                  activeTab === "Pending" && (
                    <div className="flex lg:flex-col items-end space-y-2 mt-2 sm:mt-0 sm:flex-row sm:space-x-2">
                      <button
                        className="bg-white text-xs border sm:w-28 text-gray-800 px-4 py-2 w-24 rounded hover:text-white hover:bg-[#9F8EF2]"
                        onClick={() =>
                          handleStatusChange(applicant._id, "Approved")
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="bg-white text-xs border text-gray-800 px-4 py-2 w-30 sm:w-28 mx-2 sm:mx-0 rounded hover:text-white hover:bg-[#9F8EF2]"
                        onClick={() =>
                          handleStatusChange(applicant._id, "Rejected")
                        }
                      >
                        Reject
                      </button>
                    </div>
                  )}
              </div>
            ))}
          </div>
        )}

        {replyComplaint && (
          <ReplyModal
            complaint={replyComplaint}
            onClose={() => setReplyComplaint(null)}
          />
        )}
      </section>

      {/* Pagination */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
      />

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Applicants;
