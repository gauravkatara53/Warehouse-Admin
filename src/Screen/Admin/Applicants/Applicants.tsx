import React, { useState, useEffect } from "react";
import CustomButton2 from "@/Screen/Partner/PartnerInfo/CustomButton2";
import ReplyModal from "./ReplyModal";

// Define the type for an Applicant
interface Applicant {
  _id: string;
  email: string;
  type: string;
  role: string;
  name?: string; // Name is optional in case it's not provided in the data
  status: "Approved" | "Pending" | "Rejected";
}

const Applicants: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Pending");
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [replyComplaint, setReplyComplaint] = useState<null | Applicant>(null);

  // Fetch approved admins when "Approved" tab is selected
  useEffect(() => {
    if (activeTab === "Approved") {
      const fetchApprovedAdmins = async () => {
        try {
          const token = localStorage.getItem("token"); // Retrieve token from local storage
          const response = await fetch(
            "https://bookmywarehouse-cwd2a3hgejevh8ht.eastus-01.azurewebsites.net/api/v1/admin/get-admins-status?status=Approved",
            {
              headers: {
                Authorization: `Bearer ${token}`, // Add token to headers
              },
            }
          );

          if (response.status === 401) {
            console.error("Unauthorized: Please check your token.");
            return;
          }

          const data = await response.json();
          if (data.success) {
            setApplicants(data.data); // Update applicants state
          }
        } catch (error) {
          console.error("Failed to fetch approved admins:", error);
        }
      };
      fetchApprovedAdmins();
    }
  }, [activeTab]);

  const updateComplaintStatus = (
    index: number,
    status: "Approved" | "Rejected"
  ) => {
    const updatedComplaints = [...applicants];
    updatedComplaints[index].status = status;
    setApplicants(updatedComplaints);
  };

  const filteredApplicants = applicants.filter(
    (applicant) => applicant.status === activeTab
  );

  return (
    <section className="px-3 lg:px-6 py-6">
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
      </div>

      <div className="mt-4 space-y-4">
        {filteredApplicants.map((applicant, index) => (
          <div
            key={applicant._id}
            className="flex flex-col sm:flex-row justify-between items-start bg-gray-100 p-4 rounded-md"
          >
            <div className="w-full">
              <h3 className="text-md font-medium text-gray-700">
                {applicant.name || "Unknown"}
              </h3>{" "}
              {/* Optional name */}
              <p className="text-sm text-gray-400 my-4">{applicant.role}</p>
              <hr className="border-gray-300 w-40 my-2 mb-4" />
              <p className="text-xs text-gray-600 my-1 font-semibold">
                Email:{" "}
                <span className="text-gray-500 font-normal">
                  {applicant.email}
                </span>
              </p>
            </div>

            {activeTab === "Pending" && (
              <div className="flex lg:flex-col items-end space-y-2 mt-2 sm:mt-0 sm:flex-row sm:space-x-2">
                <button
                  className="bg-white text-xs border text-gray-800 px-4 py-2 w-30 sm:w-28 mx-2 sm:mx-0 rounded hover:text-white hover:bg-[#9F8EF2]"
                  onClick={() => updateComplaintStatus(index, "Rejected")}
                >
                  Reject
                </button>
                <button
                  className="bg-white text-xs border sm:w-28 text-gray-800 px-4 py-2 w-24 rounded hover:text-white hover:bg-[#9F8EF2]"
                  onClick={() => updateComplaintStatus(index, "Approved")}
                >
                  Accept
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {replyComplaint && (
        <ReplyModal
          complaint={replyComplaint}
          onClose={() => setReplyComplaint(null)}
        />
      )}
    </section>
  );
};

export default Applicants;
