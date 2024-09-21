import React, { useState } from "react";
import { ListData } from "./List";
import CustomButton2 from "@/Screen/Warehouses/PartnerInfo/CustomButton2";

const ComplaintsList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("verified");

  // Filter complaints based on the active tab
  const filteredComplaints =
    activeTab === "verified"
      ? ListData // Show all complaints for Pending tab
      : ListData.filter((complaint) => complaint.status === "solved"); // Adjust according to your data structure

  return (
    <section className="px-3 lg:px-6 py-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg lg:text-md font-medium sm:text-xl">
          Complaints
        </h2>
      </div>

      {/* Tabs */}
      <div className="mb-4">
        <div className="relative">
          <div className="flex space-x-4 mb-6">
            <CustomButton2
              className={
                activeTab === "verified"
                  ? "text-white w-20"
                  : "border border-gray-300 bg-white w-20"
              }
              onClick={() => setActiveTab("verified")}
            >
              Pending
            </CustomButton2>
            <CustomButton2
              className={
                activeTab === "premium"
                  ? "text-white w-20"
                  : "border border-gray-300 bg-white w-20"
              }
              onClick={() => setActiveTab("premium")}
            >
              Solved
            </CustomButton2>
          </div>
        </div>
      </div>

      {/* Complaints Cards */}
      <div className="mt-4 space-y-4">
        {filteredComplaints.map((complaint, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row justify-between items-start bg-gray-100 p-4 rounded-md"
          >
            {/* Image and Complaint Info */}
            <div className="flex items-center space-x-4 w-full">
              {/* Image */}
              <img
                src={complaint.imageSrc}
                alt={`${complaint.subject}`}
                className="w-20 h-20 object-cover rounded-md"
              />

              {/* Complaint Info */}
              <div className="flex-1">
                <h3 className="text-sm font-medium">{complaint.subject}</h3>
                <p className="text-xs text-gray-400">
                  Time of Complaint:{" "}
                  <span className="text-gray-600">
                    {complaint.timeOfComplaint || "12:30pm 2nd Sept 2024"}
                  </span>
                </p>
                <p className="text-xs text-gray-400">
                  Description:{" "}
                  <span className="text-gray-600">
                    {complaint.description || "Short description here"}
                  </span>
                </p>
                <p className="text-xs text-gray-400">
                  {complaint.attachments} Attachments:{" "}
                  <span className="text-gray-600">view</span>
                </p>
              </div>
            </div>

            {/* Buttons on the right */}
            {activeTab === "verified" && (
              <div className="flex lg:flex-col items-end space-y-2 mt-2 sm:mt-0 sm:flex-row sm:space-x-2">
                <button className="bg-white text-xs text-gray-800 px-4 py-2 w-30 sm:w-24 mx-2 sm:mx-0 rounded hover:text-white hover:bg-[#9F8EF2]">
                  Mark as Read
                </button>
                <button className="bg-white text-xs text-gray-800 px-4 py-2 w-24 rounded hover:text-white hover:bg-[#9F8EF2]">
                  Reply
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ComplaintsList;
