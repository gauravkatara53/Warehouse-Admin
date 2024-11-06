import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

interface Partner {
  _id: string;
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
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const limit = 5;

  useEffect(() => {
    const fetchVerifiedPartners = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `https://bookmywarehouse-cwd2a3hgejevh8ht.eastus-01.azurewebsites.net/api/v1/admin/kyc/partners?status=Verified&limit=${limit}&page=${currentPage}&search=${searchTerm}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        setPartners(data.data);
        setTotalPages(Math.ceil(data.total / limit));
        setError(null);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data. Please check your authentication.");
        setLoading(false);
      }
    };

    fetchVerifiedPartners();
  }, [currentPage, searchTerm, currentPage]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page on search
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
          onChange={handleSearch}
          className="border p-2 rounded w-full"
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <Spinner />
      ) : partners.length === 0 ? (
        <p>No partners found.</p>
      ) : (
        <>
          {partners.map((partner) => (
            <div
              key={partner._id}
              className="rounded-lg p-4 mb-4 border border-gray-200"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="flex items-start">
                  <img
                    src={partner.avatar || "userde.jpg"}
                    alt={partner.name}
                    className="w-12 h-12 rounded-full bg-gray-200 mr-4"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{partner.name}</p>
                    <p className="text-gray-400">{partner._id}</p>
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
