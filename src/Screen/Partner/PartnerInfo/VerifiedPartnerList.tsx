import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Message from "@/Components/Common/NotFoundPage/Message";
import apiService from "@/Components/APIService/apiService";

interface Partner {
  _id: string;
  partnerDocId: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status: string;
}

interface VerifiedPartnerListProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}

const VerifiedPartnerList: React.FC<VerifiedPartnerListProps> = ({
  currentPage,
  setCurrentPage,
  setTotalPages,
}) => {
  const navigate = useNavigate();
  const [allPartners, setAllPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const PARTNERS_PER_PAGE = 10;

  const fetchVerifiedPartners = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.get<{
        success: boolean;
        data: {
          partners: Partner[];
          totalPartners: number;
          currentPage: number;
          limit: number;
          totalPages: number;
        };
      }>(
        `/partner/all-partner?kycStatus=Verified&page=${currentPage}&limit=${PARTNERS_PER_PAGE}&search=${searchTerm}&sortBy=createdAt&sortOrder=desc`
      );

      if (response?.success) {
        const { partners, totalPages } = response.data;
        setAllPartners(partners);
        setTotalPages(totalPages);
      } else {
        setError("Failed to fetch data. Please check your authentication.");
      }
    } catch (err) {
      setError("Failed to fetch data. Please check your authentication.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerifiedPartners();
  }, [currentPage, searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search term change
  };

  const handlePartnerClick = (partnerId: string) => {
    if (partnerId) {
      navigate(`/partner-profile/${partnerId}`);
    } else {
      alert("Partner document ID is missing.");
    }
  };

  const Spinner = () => (
    <div className="flex justify-center items-center mt-4">
      <ClipLoader size={50} color={"#4FD1C5"} loading={loading} />
    </div>
  );

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
        <Spinner />
      ) : error ? (
        <Message message="Something went wrong" />
      ) : allPartners.length === 0 ? (
        <Message message="No Partner Found." />
      ) : (
        <>
          {allPartners.map((partner) => (
            <div
              key={partner._id}
              className="rounded-lg p-4 mb-4 border border-gray-200 hover:cursor-pointer"
              onClick={() => handlePartnerClick(partner._id)}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="flex items-start">
                  <img
                    src={partner.avatar || "userde.jpg"}
                    alt={partner.name}
                    className="w-12 h-12 rounded-full bg-gray-200 mr-4"
                  />
                  <div className="mt-2">
                    <p className="font-medium text-gray-900">{partner.name}</p>
                  </div>
                </div>
                <div className="mt-2 sm:mt-0 flex flex-col items-center sm:items-end sm:ml-4">
                  <div className="flex items-center">
                    <div className="flex flex-col items-end">
                      <p className="font-semibold text-sm text-gray-900 text-center sm:text-left">
                        {partner.email || "No Email"}
                      </p>
                      <p className="text-gray-500 text-center sm:text-left">
                        {partner.phone}
                      </p>
                    </div>
                    <div
                      className="p-3 rounded-xl ml-2 flex items-center justify-center"
                      style={{
                        backgroundColor: "#2D9CDB26",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faBell}
                        size="lg"
                        color="#2D9CDB"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default VerifiedPartnerList;
