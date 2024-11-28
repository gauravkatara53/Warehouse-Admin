import React, { useEffect, useState } from "react";
import KYCVerificationPopup from "./KYCVerificationPopup";
import { ClipLoader } from "react-spinners";
import Message from "@/Components/Common/NotFoundPage/Message";
import apiService from "@/Components/APIService/apiService";

interface KYCVerificationListProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}

interface Partner {
  _id: string;
  status: string;
  kycDocId: string;
  partnerDocId: string;
  name: string;
  phone: string;
  avatar?: string;
}

const KYCVerificationList: React.FC<KYCVerificationListProps> = ({
  currentPage,
  setCurrentPage,
  setTotalPages,
}) => {
  const [allPartners, setAllPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const PARTNERS_PER_PAGE = 10;

  const fetchKYCPartners = async () => {
    setLoading(true);
    setError(null);

    try {
      let page = 1;
      const fetchedPartners: Partner[] = [];
      while (true) {
        const response = await apiService.get<{
          success: boolean;
          data: Partner[];
          page: number;
          pages: number;
          limit: number;
          total: number;
        }>(`/admin/kyc/partners?page=${page}&limit=${PARTNERS_PER_PAGE}`);

        if (response?.success && response.data?.length > 0) {
          fetchedPartners.push(...response.data);
          if (page >= response.pages) break;
          page++;
        } else {
          break;
        }
      }
      setAllPartners(fetchedPartners);
      setTotalPages(Math.ceil(fetchedPartners.length / PARTNERS_PER_PAGE));
    } catch (err) {
      setError("Failed to fetch data. Please check your authentication.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewAndVerify = (partner: Partner) => {
    setSelectedPartner(partner);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedPartner(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredPartners = allPartners.filter(
    (partner) =>
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPartners = filteredPartners.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const paginatedPartners = sortedPartners.slice(
    (currentPage - 1) * PARTNERS_PER_PAGE,
    currentPage * PARTNERS_PER_PAGE
  );

  useEffect(() => {
    fetchKYCPartners();
  }, []);

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or phone"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border p-2 rounded w-full"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader size={50} color={"#4FD1C5"} loading={loading} />
        </div>
      ) : error ? (
        <Message message={error} />
      ) : error ? (
        <Message message={error} />
      ) : sortedPartners.length === 0 ? (
        <Message message="No Partner for KYC verification" />
      ) : (
        paginatedPartners.map((partner) => (
          <div key={partner._id} className="rounded-lg border p-4 mb-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src={partner.avatar || "/default-avatar.jpg"}
                  alt={partner.name}
                  className="w-12 h-12 rounded-full bg-gray-200 mr-4"
                />
                <div>
                  <p className="font-medium">{partner.name}</p>
                  <p className="text-gray-400">{partner._id}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <button
                  className="text-green-500"
                  onClick={() => handleViewAndVerify(partner)}
                >
                  View and Verify
                </button>
                <p className="text-gray-400">{partner.phone}</p>
              </div>
            </div>
          </div>
        ))
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

export default KYCVerificationList;
