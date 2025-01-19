import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import StatusTag from "../../../../Components/Customers/StatusTag";
import Pagination from "../../../../Components/Common/Pagination/Pagination";
import FilterBar from "../FilterBar/Filterbar";
import apiService from "@/Components/APIService/apiService";
import Message from "@/Components/Common/NotFoundPage/Message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faBell, faEnvelope, faSms } from "@fortawesome/free-solid-svg-icons";

interface Partner {
  _id: string;
  name: string;
  address: string;
  email: String;
  phone: string;
  membershipStatus: string;
  kycStatus: string;
  date: string;
  createdAt: string;
  gender: String;
  lastActive: String;
  dob: String;
  avatar: string;
  businessName: string;
  rentOrSell: string;
  numberOfBooking: string;
  price: { amount: number; title: string; discount: number }[];
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
  const [allPartners, setAllPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchAllPartners = async () => {
      setLoading(true);
      let page = 1;
      let fetchedPartners: Partner[] = [];
      let totalFetchedPartners = 0;

      try {
        do {
          const response = await apiService.get<{
            data: Partner[];
            page: number;
            pages: number;
            pageSize: number;
            total: number;
          }>(
            `/admin/partner/all-partners?page=${page}&pageSize=${usersPerPage}`
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
            fetchedPartners = [...fetchedPartners, ...formattedData];
            totalFetchedPartners = response.total;
            page++;
          }
        } while (page <= Math.ceil(totalFetchedPartners / usersPerPage));
        setAllPartners(fetchedPartners);
      } catch (error) {
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllPartners();
  }, []);

  const filteredUsers = allPartners.filter((partner) => {
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
      // Sort by display ID (1, 2, 3...) based on the order they appear in the sorted users
      sortedUsers.sort((a, b) => {
        const indexA = allPartners.findIndex((u) => u._id === a._id);
        const indexB = allPartners.findIndex((u) => u._id === b._id);
        return indexA - indexB; // Ascending order based on original position
      });
    } else if (selectedOrderType === "50-1") {
      // Sort by display ID (1, 2, 3...) in reverse order
      sortedUsers.sort((a, b) => {
        const indexA = allPartners.findIndex((u) => u._id === a._id);
        const indexB = allPartners.findIndex((u) => u._id === b._id);
        return indexB - indexA; // Descending order based on original position
      });
    }

    return sortedUsers;
  };
  const [selectedPartners, setSelectedPartners] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelectedPartners((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((partnerId) => partnerId !== id)
        : [...prevSelected, id]
    );
  };

  const sortedUsers = sortFilteredUsers(filteredUsers);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  // Get users for the current page
  const paginatedPartner = sortedUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );
  return (
    <div className="relative overflow-hidden">
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
        <div className="table-responsive overflow-x-auto max-w-full  sm:overflow-hidden">
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
                <th scope="col" className="px-6 py-3">
                  Action
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
              ) : error ? (
                <td colSpan={7} className="text-center py-6">
                  <Message message="Something went Wrong" />
                </td>
              ) : paginatedPartner.length === 0 ? (
                <td colSpan={7} className="text-center py-6">
                  <Message message="No Partner found." />
                </td>
              ) : (
                paginatedPartner.map((partner) => (
                  <tr
                    key={partner._id}
                    className="bg-white border-b cursor-pointer"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={selectedPartners.includes(partner._id)}
                          onChange={() => toggleSelection(partner._id)}
                        />
                        <span>
                          {allPartners.findIndex((u) => u._id === partner._id) +
                            1}
                        </span>
                      </div>
                    </th>

                    <td
                      className="px-6 py-4 whitespace-nowrap "
                      onClick={() => onSelectPartner(partner)}
                    >
                      {partner.name || "N/A"}
                    </td>
                    <td
                      className="px-6 py-4 max-w-[190px] truncate overflow-hidden whitespace-nowrap"
                      onClick={() => onSelectPartner(partner)}
                    >
                      {partner.address || "N/A"}
                    </td>

                    <td
                      className="px-6 py-4 whitespace-nowrap"
                      onClick={() => onSelectPartner(partner)}
                    >
                      {partner.phone || "N/A"}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap"
                      onClick={() => onSelectPartner(partner)}
                    >
                      {partner.membershipStatus || "N/A"}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap"
                      onClick={() => onSelectPartner(partner)}
                    >
                      {isValidKYCStatus(partner.kycStatus) ? (
                        <StatusTag status={partner.kycStatus} />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap"
                      onClick={() => onSelectPartner(partner)}
                    >
                      {partner.date || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className=" -mr-4 -ml-2">
                        <FontAwesomeIcon
                          icon={faWhatsapp}
                          className="self-stretch h-4 w-4 ho"
                        />
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className=" ml-2 self-stretch h-4 w-4"
                        />
                        <FontAwesomeIcon
                          icon={faSms}
                          className=" ml-2  self-stretch h-4 w-4"
                        />
                        <FontAwesomeIcon
                          icon={faBell}
                          className="ml-2 self-stretch h-4 w-4"
                        />
                      </div>
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
