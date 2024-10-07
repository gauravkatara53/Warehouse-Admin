import React, { useState } from "react";
import { ListData } from "./List";
import CustomButton2 from "@/Screen/Warehouses/PartnerInfo/CustomButton2";
import ReplyModal from "./ReplyModal";

const Applicants: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Pending");
  const [Applicants, setApplicants] = useState(ListData);
  const [replyComplaint, setReplyComplaint] = useState(null);

  const filteredApplicants = Applicants.filter(
    (complaint) => complaint.status === activeTab
  );

  const updateComplaintStatus = (
    index: number,
    status: "Approved" | "Rejected"
  ) => {
    const updatedComplaints = [...Applicants];
    updatedComplaints[index].status = status;
    setApplicants(updatedComplaints);
  };

  return (
    <section className="px-3 lg:px-6 py-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg lg:text-md font-medium sm:text-xl">
          Complaints
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
        {filteredApplicants.map((Applicants, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row justify-between items-start bg-gray-100 p-4 rounded-md"
          >
            <div className="w-full">
              <h3 className="text-md font-medium text-gray-700 ">
                {Applicants.name}
              </h3>
              <p className="text-sm text-gray-400 my-4">Customer Support</p>
              <hr className="border-gray-300 w-40 my-2 mb-4" />
              <p className="text-xs text-gray-600 my-1 font-semibold">
                Full Name:{" "}
                <span className="text-gray-500 font-normal">
                  {Applicants.fullName}
                </span>
              </p>
              <p className="text-xs text-gray-600 mb-1 font-semibold">
                Mobile:{" "}
                <span className="text-gray-500 font-normal">
                  {Applicants.mobile}
                </span>
              </p>
              <p className="text-xs text-gray-600 font-semibold">
                Location:{" "}
                <span className="text-gray-500 font-normal">
                  {Applicants.location}
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
