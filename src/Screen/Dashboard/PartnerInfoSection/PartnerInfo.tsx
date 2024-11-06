import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "@/Components/Common/button";
import axios from "axios";
import KYCVerificationPopup from "@/Screen/Partner/PartnerInfo/KYCVerificationPopup";
import { ClipLoader } from "react-spinners";
import Pagination from "@/Components/Common/Pagination/Pagination"; // Import the common Pagination component

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
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleKYCNavigation = () => {
    navigate("/partners", { state: { initialTab: "kyc" } });
  };
  const fetchKYCPartners = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token is missing.");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://bookmywarehouse-cwd2a3hgejevh8ht.eastus-01.azurewebsites.net/api/v1/admin/kyc/partners`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { limit, page, status: "Pending", search: searchTerm },
        }
      );

      const data = response.data;
      setPartners(data.data);
      setTotalPages(data.pages);
    } catch (error) {
      setError("Failed to fetch data. Please check your authentication.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKYCPartners();
  }, [page, limit, searchTerm]);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedPartner(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

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
        <p className="text-red-500">{error}</p>
      ) : partners.length === 0 ? (
        <p className="text-center pt-2 text-gray-600">
          No Partner for KYC verification
        </p>
      ) : (
        <>
          <ul className="mt-6 space-y-4">
            {partners.map((partner) => (
              <li
                key={partner._id}
                className="flex justify-between items-center p-4 pl-1 pt-1 border-b border-gray-200"
              >
                <div className="flex items-center">
                  <img
                    src={partner.avatar || "userde.jpg"}
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

          {/* Use the Pagination component */}
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            setCurrentPage={setPage}
          />
        </>
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

export default PartnerInfoSection;
