import React, { useState, useEffect } from "react";
import CustomButton2 from "@/Screen/Partner/PartnerInfo/CustomButton2";
import ReplyModal from "./ReplyModal";
import { ClipLoader } from "react-spinners";
import Pagination from "@/Components/Common/Pagination/Pagination";
const ComplaintsList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Pending");
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [replyComplaint, setReplyComplaint] = useState<any | null>(null);
  const [replyText, setReplyText] = useState<string>("");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const complaintsPerPage = 4;

  useEffect(() => {
    fetchComplaints();
  }, [activeTab]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchComplaints = async () => {
    setLoading(true);
    setError(null);

    let apiUrl = "";
    if (activeTab === "Pending") {
      apiUrl =
        "https://bookmywarehouse-cwd2a3hgejevh8ht.eastus-01.azurewebsites.net/api/v1/admin/complaints?status=Pending";
    } else if (activeTab === "Solved") {
      apiUrl =
        "https://bookmywarehouse-cwd2a3hgejevh8ht.eastus-01.azurewebsites.net/api/v1/admin/complaints?status=Solved";
    } else if (activeTab === "On Hold") {
      apiUrl =
        "https://bookmywarehouse-cwd2a3hgejevh8ht.eastus-01.azurewebsites.net/api/v1/admin/complaints?status=On Hold";
    }

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch complaints");
      }
      const data = await response.json();
      if (data.success) {
        setComplaints(data.data);
      } else {
        throw new Error("Failed to load complaints");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredComplaints = complaints.filter((complaint) =>
    complaint.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const markAsSolved = async (complaintId: string) => {
    try {
      const response = await fetch(
        `https://bookmywarehouse-cwd2a3hgejevh8ht.eastus-01.azurewebsites.net/api/v1/admin/complaints/${complaintId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Solved" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update complaint status");
      }

      const updatedComplaint = await response.json();
      if (updatedComplaint.success) {
        await fetchComplaints();
        closeReplyModal(); // Close modal on success
      } else {
        throw new Error("Failed to update complaint status on server");
      }
    } catch (error) {
      console.error("Error updating complaint:", error);
    }
  };

  const markAsOnHold = async (complaintId: string) => {
    try {
      const response = await fetch(
        `https://bookmywarehouse-cwd2a3hgejevh8ht.eastus-01.azurewebsites.net/api/v1/admin/complaints/${complaintId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "On Hold" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update complaint status");
      }

      const updatedComplaint = await response.json();
      if (updatedComplaint.success) {
        await fetchComplaints();
        closeReplyModal(); // Close modal on success
      } else {
        throw new Error("Failed to update complaint status on server");
      }
    } catch (error) {
      console.error("Error updating complaint:", error);
    }
  };

  const markAsUnsolved = async (complaintId: string) => {
    try {
      const response = await fetch(
        `https://bookmywarehouse-cwd2a3hgejevh8ht.eastus-01.azurewebsites.net/api/v1/admin/complaints/${complaintId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Pending" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update complaint status");
      }

      const updatedComplaint = await response.json();
      if (updatedComplaint.success) {
        await fetchComplaints();
      } else {
        throw new Error("Failed to update complaint status on server");
      }
    } catch (error) {
      console.error("Error updating complaint:", error);
    }
  };

  const openReplyModal = (complaint: any) => {
    setReplyComplaint(complaint);
  };

  const closeReplyModal = () => {
    setReplyComplaint(null);
    setReplyText(""); // Reset the reply text when closing the modal
  };

  const handleSendReply = async () => {
    if (!replyComplaint || !replyText.trim()) return;

    try {
      const response = await fetch(
        `https://bookmywarehouse-cwd2a3hgejevh8ht.eastus-01.azurewebsites.net/api/v1/admin/complaints/${replyComplaint._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reply: replyText }),
        }
      );

      const result = await response.json();
      if (result.success) {
        closeReplyModal();
        await fetchComplaints(); // Refresh the complaints after reply
      } else {
        throw new Error("Failed to send reply");
      }
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  // Pagination logic
  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
  const currentComplaints = filteredComplaints.slice(
    indexOfFirstComplaint,
    indexOfLastComplaint
  );

  const totalPages = Math.ceil(filteredComplaints.length / complaintsPerPage);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <section className="px-3 lg:px-6 py-6 bg-white">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg lg:text-md font-medium sm:text-xl">
            Complaints
          </h2>
        </div>

        <div className="mb-4">
          <div className="relative">
            <div className="flex space-x-4 mb-6">
              <CustomButton2
                className={
                  activeTab === "Pending"
                    ? "text-white w-20"
                    : "border border-gray-300 bg-white w-20"
                }
                onClick={() => {
                  setActiveTab("Pending");
                  setCurrentPage(1); // Reset page when tab changes
                }}
              >
                Pending
              </CustomButton2>
              <CustomButton2
                className={
                  activeTab === "Solved"
                    ? "text-white w-20"
                    : "border border-gray-300 bg-white w-20"
                }
                onClick={() => {
                  setActiveTab("Solved");
                  setCurrentPage(1); // Reset page when tab changes
                }}
              >
                Solved
              </CustomButton2>
              <CustomButton2
                className={
                  activeTab === "On Hold"
                    ? "text-white w-20"
                    : "border border-gray-300 bg-white w-20"
                }
                onClick={() => {
                  setActiveTab("On Hold");
                  setCurrentPage(1); // Reset page when tab changes
                }}
              >
                On Hold
              </CustomButton2>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search complaints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <ClipLoader size={50} color={"#4FD1C5"} loading={loading} />
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {currentComplaints.map((complaint, index) => (
              <div
                key={index}
                className={`flex flex-col sm:flex-row justify-between items-start bg-gray-100 p-4 rounded-md ${
                  isMobile ? "bg-gray-100" : ""
                }`}
              >
                <div className="flex items-center space-x-4 w-full">
                  <img
                    src={complaint.image || "Group 48096434.png"}
                    alt={complaint.subject}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">
                      Subject:{" "}
                      <span className="text-gray-600 font-medium">
                        {complaint.subject || "NA"}
                      </span>
                    </p>
                    <p className="text-xs text-gray-400">
                      Time of Complaint:{" "}
                      <span className="text-gray-600">
                        {complaint.timeOfComplaint || "NA"}
                      </span>
                    </p>
                    <p className="text-xs text-gray-400">
                      Description:{" "}
                      <span className="text-gray-600">
                        {complaint.description}
                      </span>
                    </p>
                    <p className="text-xs text-gray-400">
                      Attachments:{" "}
                      {complaint.attachments ? (
                        <>
                          <span className="text-gray-600">
                            {complaint.attachments}
                          </span>{" "}
                          <a
                            href={complaint.attachments} // Assuming this contains a URL or file path
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 "
                          >
                            view
                          </a>
                        </>
                      ) : (
                        <span className="text-gray-600">No Attachments</span>
                      )}
                    </p>
                  </div>
                </div>

                {activeTab === "Pending" ? (
                  <div className="flex lg:flex-col items-end space-y-2 mt-2 sm:mt-0 sm:flex-row sm:space-x-2">
                    <button
                      className="bg-white text-xs border text-gray-800 px-4 py-2 w-30 sm:w-32 mx-2 sm:mx-0 rounded hover:text-white hover:bg-[#9F8EF2]"
                      onClick={() => markAsSolved(complaint._id)}
                    >
                      Mark as Solved
                    </button>
                    <button
                      className="bg-white text-xs border text-gray-800 px-4 py-2 w-30 sm:w-32 mx-2 sm:mx-0 rounded hover:text-white hover:bg-[#9F8EF2]"
                      onClick={() => openReplyModal(complaint)}
                    >
                      Reply
                    </button>
                  </div>
                ) : activeTab === "On Hold" ? (
                  <div className="flex lg:flex-col items-end space-y-2 mt-2 sm:mt-0 sm:flex-row sm:space-x-2">
                    <button
                      className="bg-white text-xs border text-gray-800 px-4 py-2 w-30 sm:w-32 mx-2 sm:mx-0 rounded hover:text-white hover:bg-[#9F8EF2]"
                      onClick={() => markAsSolved(complaint._id)}
                    >
                      Mark as Solved
                    </button>
                    <button
                      className="bg-white text-xs border text-gray-800 px-4 py-2 w-30 sm:w-32 mx-2 sm:mx-0 rounded hover:text-white hover:bg-[#9F8EF2]"
                      onClick={() => openReplyModal(complaint)}
                    >
                      Reply
                    </button>
                  </div>
                ) : (
                  <div className="flex lg:flex-col items-end space-y-2 mt-2 sm:mt-0 sm:flex-row sm:space-x-2">
                    <button
                      className="bg-white text-xs border text-gray-800 px-4 py-2 w-30 sm:w-32 mx-2 sm:mx-0 rounded hover:text-white hover:bg-[#9F8EF2]"
                      onClick={() => markAsUnsolved(complaint._id)}
                    >
                      Mark as Unsolved
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {replyComplaint && (
          <ReplyModal
            isOpen={!!replyComplaint}
            complaint={replyComplaint}
            replyText={replyText}
            setReplyText={setReplyText}
            onClose={closeReplyModal}
            onSendReply={handleSendReply}
            onMarkAsSolved={() => markAsSolved(replyComplaint._id)} // Pass complaint._id here
            onMarkAsOnHold={() => markAsOnHold(replyComplaint._id)} // Similarly for "On Hold"
          />
        )}
      </section>
      {/* Pagination Controls */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ComplaintsList;
