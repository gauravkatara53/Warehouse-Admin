import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "@/Components/Common/button";
import KYCVerificationPopup from "@/Screen/Partner/PartnerInfo/KYCVerificationPopup";
import { ClipLoader } from "react-spinners";
import Message from "@/Components/Common/NotFoundPage/Message";
import apiService from "@/Components/APIService/apiService";

interface Partner {
  _id: string;
  status: string;
  kycDocId: string;
  partnerDocId: string;
  name: string;
  phone: string;
  avatar?: string;
}

const PartnerInfoSection: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [allPartner, setAllPartner] = useState<Partner[]>([]);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const PARTNERS_PER_PAGE = 10;

  const handleKYCNavigation = () => {
    navigate("/partners", { state: { initialTab: "kyc" } });
  };

  const fetchKYCPartners = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.get<{
        success: boolean;
        data: {
          partners: Partner[]; // Adjusted to match API response key
        };
        message: string;
      }>(
        `partner/all-partner?kycStatus=Processing&limit=${PARTNERS_PER_PAGE}&search=${searchTerm}`
      );

      if (response && response.success && response.data.partners.length > 0) {
        setAllPartner(response.data.partners);
      } else {
        setAllPartner([]);
      }
    } catch (error: any) {
      setError("Failed to fetch data. Please check your authentication.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKYCPartners();
  }, [searchTerm]);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedPartner(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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
        <Message message={error} />
      ) : allPartner.length === 0 ? (
        <Message message="No Partner for KYC verification" />
      ) : (
        <>
          <ul className="mt-6 space-y-4">
            {allPartner.map((partner) => (
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
