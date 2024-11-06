import React, { useEffect, useState } from "react";
import axios from "axios";
import KYCVerificationPopup from "./KYCVerificationPopup";
import { ClipLoader } from "react-spinners";

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
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const limit = 5;

  const fetchKYCPartners = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token is missing.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        "https://bookmywarehouse-cwd2a3hgejevh8ht.eastus-01.azurewebsites.net/api/v1/admin/kyc/partners",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            status: "Pending",
            limit,
            page: currentPage,
            search: searchTerm,
          },
        }
      );

      const data = response.data.data || [];
      const totalRecords = response.data.total || 0;

      setPartners(data);
      setTotalPages(Math.ceil(totalRecords / limit));
    } catch (error) {
      setError("Failed to fetch data. Please check your authentication.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKYCPartners();
  }, [searchTerm, currentPage, setTotalPages]);

  const handleViewAndVerify = (partner: Partner) => {
    setSelectedPartner(partner);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedPartner(null);
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or phone"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border p-2 rounded w-full"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader size={50} color={"#4FD1C5"} loading={loading} />
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : partners.length === 0 ? (
        <p className="text-center text-gray-600">
          No Partner for KYC verification
        </p>
      ) : (
        partners.map((partner) => (
          <div key={partner._id} className="rounded-lg border p-4 mb-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src={partner.avatar || "userde.jpg"}
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
            fetchKYCPartners(); // Refresh data on verification
            handleClosePopup();
          }}
          onReject={() => {
            fetchKYCPartners(); // Refresh data on rejection
            handleClosePopup();
          }}
        />
      )}
    </div>
  );
};

export default KYCVerificationList;
