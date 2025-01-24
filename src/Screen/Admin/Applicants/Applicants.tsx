import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import CustomButton2 from "@/Screen/Partner/PartnerInfo/CustomButton2";
import Pagination from "@/Components/Common/Pagination/Pagination";
import apiService from "@/Components/APIService/apiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Applicant {
  _id: string;
  email: string;
  role: string;
  name: string;
  status: "Approved" | "Pending" | "Rejected";
  phone: string;
  avatar: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

const Applicants: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 10;

  const fetchApplicants = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.get<{
        success: boolean;
        data: {
          admin: Applicant[];
          totalPages: number;
        };
      }>(
        `/admin/all/admin?page=${currentPage}&limit=${itemsPerPage}&status=${activeTab}&search=${searchTerm}`
      );

      if (response?.success) {
        setApplicants(response.data.admin);
        setTotalPages(response.data.totalPages);
      } else {
        setError("Failed to fetch applicants. Please check your connection.");
      }
    } catch (err) {
      setError("Failed to fetch applicants. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [activeTab, currentPage, searchTerm]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to the first page when tab changes
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page on search change
  };

  const handleVerifyAdmin = async (
    adminId: string,
    status: "Approved" | "Rejected"
  ) => {
    try {
      const response = await apiService.post<{ success: boolean }>(
        `/admin/verify-admin/${adminId}`,
        {
          status,
        }
      );

      if (response?.success) {
        toast.success(`Admin ${status.toLowerCase()} successfully!`);
        // Refresh applicants list after status change
        fetchApplicants();
      } else {
        toast.error("Failed to update status. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error verifying admin:", error);
    }
  };

  const Spinner = () => (
    <div className="flex justify-center items-center my-6">
      <ClipLoader size={50} color={"#4FD1C5"} loading={loading} />
    </div>
  );

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
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </CustomButton2>
            ))}
          </div>

          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Search by Name or Email"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {loading ? (
          <Spinner />
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : applicants.length === 0 ? (
          <p className="text-center text-gray-500">No applicants found.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {applicants.map((applicant) => (
              <div
                key={applicant._id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-md"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={applicant.avatar}
                    alt={applicant.name}
                    className="w-12 h-12 "
                  />
                  <div>
                    <h3 className="text-md font-medium text-gray-700">
                      {applicant.name}
                    </h3>
                    <p className="text-sm text-gray-400">{applicant.role}</p>
                    <p className="text-xs text-gray-600">
                      Email: {applicant.email}
                    </p>
                  </div>
                </div>
                {activeTab === "Pending" && (
                  <div className="flex lg:flex-col items-end space-y-2 mt-2 sm:mt-0 sm:flex-row sm:space-x-2">
                    <button
                      className="bg-white text-xs border sm:w-28 text-gray-800 px-4 py-2 w-24 rounded hover:text-white hover:bg-[#9F8EF2]"
                      onClick={() =>
                        handleVerifyAdmin(applicant._id, "Approved")
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="bg-white text-xs border text-gray-800 px-4 py-2 w-30 sm:w-28 mx-2 sm:mx-0 rounded hover:text-white hover:bg-[#9F8EF2]"
                      onClick={() =>
                        handleVerifyAdmin(applicant._id, "Rejected")
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
      </section>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <ToastContainer />
    </div>
  );
};

export default Applicants;
