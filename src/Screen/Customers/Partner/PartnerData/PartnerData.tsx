import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import StatusTag from "../../../../Components/Customers/StatusTag";
import Pagination from "../../../../Components/Common/Pagination/Pagination";
import FilterBar from "../FilterBar/Filterbar";
import apiService from "@/Components/APIService/apiService";

interface Partner {
  _id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  membershipStatus: string;
  kycStatus: string;
  date: string;
  createdAt: string;
  gender: string;
  lastActive: string;
  dob: string;
  positionNumber: number;
}

interface PartnerDataProps {
  onSelectPartner: (partner: Partner) => void;
}

const acceptedKYCStatuses = [
  "completed",
  "Verified",
  "processing",
  "rejected",
  "Not completed",
  "Not Found",
] as const;

type KYCStatus = (typeof acceptedKYCStatuses)[number];
const isValidKYCStatus = (status: string): status is KYCStatus =>
  acceptedKYCStatuses.includes(status as KYCStatus);

const PartnerData = ({ onSelectPartner }: PartnerDataProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedKYCStatus, setSelectedKYCStatus] = useState<
    "completed" | "Verified" | "Processing" | "Rejected" | "Not Found" | null
  >(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedOrderType, setSelectedOrderType] = useState<string | null>(
    null
  );
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const usersPerPage = 5;

  useEffect(() => {
    const fetchPartners = async () => {
      setLoading(true);
      try {
        const response = await apiService.get<{ data: Partner[] }>(
          "/admin/partner/all-partners"
        );
        if (response && response.data) {
          const formattedData = response.data.map((partner, index) => ({
            ...partner,
            kycStatus:
              partner.kycStatus === "Pending"
                ? "processing"
                : partner.kycStatus === "Cancel"
                ? "rejected"
                : partner.kycStatus,
            date: partner.createdAt
              ? new Intl.DateTimeFormat("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }).format(new Date(partner.createdAt))
              : "N/A",
            positionNumber: index + 1, // Assign a permanent position number here
          }));
          setPartners(formattedData);
        }
      } catch (error) {
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  const filteredUsers = partners.filter((partner) => {
    const matchesDate = selectedDate ? partner.date === selectedDate : true;
    const matchesKYCStatus = selectedKYCStatus
      ? partner.kycStatus?.toLowerCase() === selectedKYCStatus.toLowerCase()
      : true;
    const matchesSearchQuery =
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.phone.includes(searchQuery);

    return matchesDate && matchesKYCStatus && matchesSearchQuery;
  });

  const sortFilteredUsers = (users: Partner[]) => {
    if (!selectedOrderType) return users;

    const sortedUsers = [...users];
    if (selectedOrderType === "A-Z") {
      sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedOrderType === "Z-A") {
      sortedUsers.sort((a, b) => b.name.localeCompare(a.name));
    } else if (selectedOrderType === "1-50") {
      sortedUsers.sort((a, b) => a.positionNumber - b.positionNumber);
    } else if (selectedOrderType === "50-1") {
      sortedUsers.sort((a, b) => b.positionNumber - a.positionNumber);
    }

    return sortedUsers;
  };

  const sortedUsers = sortFilteredUsers(filteredUsers);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentPartners = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="relative overflow-hidden">
      {error && <div className="error-message">{error}</div>}
      <FilterBar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedKYCStatus={selectedKYCStatus}
        setSelectedKYCStatus={setSelectedKYCStatus}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedOrderType={selectedOrderType}
        setSelectedOrderType={setSelectedOrderType}
      />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4">
        <div className="table-responsive overflow-x-auto max-w-full max-h-[70vh] sm:overflow-hidden">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No.
                </th>
                <th scope="col" className="px-6 py-3">
                  NAME
                </th>
                <th scope="col" className="px-6 py-3">
                  ADDRESS
                </th>
                <th scope="col" className="px-6 py-3">
                  NUMBER
                </th>
                <th scope="col" className="px-6 py-3">
                  MEMBERSHIP
                </th>
                <th scope="col" className="px-6 py-3">
                  KYC
                </th>
                <th scope="col" className="px-6 py-3">
                  DATE
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-6">
                    <ClipLoader size={50} color={"#4FD1C5"} loading={loading} />
                  </td>
                </tr>
              ) : (
                currentPartners.map((partner) => (
                  <tr
                    key={partner._id}
                    onClick={() => onSelectPartner(partner)}
                    className="bg-white border-b cursor-pointer"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      {partner.positionNumber}
                    </th>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {partner.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 ">{partner.address || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {partner.phone || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {partner.membershipStatus || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isValidKYCStatus(partner.kycStatus) ? (
                        <StatusTag status={partner.kycStatus} />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {partner.date || "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default PartnerData;
