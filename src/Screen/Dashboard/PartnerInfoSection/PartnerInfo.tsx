import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "@/Components/Common/button";
import KYCVerificationPopup from "@/Screen/Partner/PartnerInfo/KYCVerificationPopup";
import { ClipLoader } from "react-spinners";
import Pagination from "@/Components/Common/Pagination/Pagination";
import { toast } from "react-toastify";
import apiService from "@/Components/APIService/apiService";
import Message from "@/Components/Common/NotFoundPage/Message";

interface Partner {
  _id: string;
  status: string;
  kycDocId: string;
  partnerDocId: string;
  name: string;
  phone: string;
  avatar?: string;
  email?: string;
}

const PartnerInfoSection: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allPartner, setAllPartner] = useState<Partner[]>([]);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const PartnerPerPage = 10;

  const handleKYCNavigation = () => {
    navigate("/partners", { state: { initialTab: "kyc" } });
  };

  const fetchKYCPartners = async () => {
    setLoading(true);
    setError(null);
    try {
      let page = 1;
      const fetchKYCPartners: Partner[] = [];
      while (true) {
        const response = await apiService.get<{
          success: boolean;
          data: Partner[];
          page: number;
          pages: number;
          limit: number;
          total: number;
        }>(`/admin/kyc/partners?page=${page}&limit=${PartnerPerPage}`);

        // Ensure response and data are defined before accessing them
        if (response && response.success && response.data.length > 0) {
          fetchKYCPartners.push(...response.data);
          if (page >= response.pages) break;
          page++;
        } else {
          break; // Exit the loop if no more data
        }
      }
      setAllPartner(fetchKYCPartners);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch data.");
      setError("Failed to fetch data. Please check your authentication.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKYCPartners();
  }, []);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedPartner(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredPartner = allPartner.filter((partner) => {
    const matchesSearchTerm =
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner._id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearchTerm;
  });

  const sortedPartner = filteredPartner.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const paginatedPartner = sortedPartner.slice(
    (currentPage - 1) * PartnerPerPage,
    currentPage * PartnerPerPage
  );

  return (
    <div className="p-4 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Pending Partners Information</h2>
        <div
          className="text-[#4FD1C5] hover:cursor-pointer"
          onClick={handleKYCNavigation}
        >
          View All
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or phone"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <CustomButton
        onClick={handleKYCNavigation}
        className="text-sm -ml-1 -mt-2"
      >
        KYC to be verified
      </CustomButton>

      {loading ? (
        <div className="flex justify-center items-center mt-4">
          <ClipLoader size={50} color={"#4FD1C5"} loading={loading} />
        </div>
      ) : error ? (
        <Message message={error} />
      ) : sortedPartner.length === 0 ? (
        <Message message="No Partner for KYC verification" />
      ) : (
        <>
          <ul className="mt-6 space-y-4">
            {paginatedPartner.map((partner) => (
              <li
                key={partner._id}
                className="flex justify-between items-center p-4 border-b border-gray-200"
              >
                <div className="flex items-center">
                  <img
                    src={partner.avatar || "/path/to/default-avatar.jpg"}
                    alt={partner.name}
                    className="w-8 h-8 rounded-full mr-4"
                  />
                  <span className="text-md text-gray-600 font-semibold">
                    {partner.name}
                  </span>
                </div>

                <div className="text-sm flex text-[#47A374] font-medium">
                  <p
                    className="mr-1 cursor-pointer"
                    onClick={() => {
                      setSelectedPartner(partner);
                      setIsPopupOpen(true);
                    }}
                  >
                    View
                  </p>
                  <p
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedPartner(partner);
                      setIsPopupOpen(true);
                    }}
                  >
                    Verify
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <Pagination
            totalPages={Math.ceil(sortedPartner.length / PartnerPerPage)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}

      {isPopupOpen && selectedPartner && (
        <KYCVerificationPopup
          partner={selectedPartner}
          onClose={handleClosePopup}
          onVerify={() => {
            fetchKYCPartners();
            handleClosePopup();
          }}
          onReject={() => {
            fetchKYCPartners();
            handleClosePopup();
          }}
        />
      )}
    </div>
  );
};

export default PartnerInfoSection;
