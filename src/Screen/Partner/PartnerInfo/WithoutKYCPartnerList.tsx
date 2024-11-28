import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import Message from "@/Components/Common/NotFoundPage/Message";
interface Partner {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
}

interface WithoutKYCPartnerListProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}

const WithoutKYCPartnerList: React.FC<WithoutKYCPartnerListProps> = ({
  currentPage,
  setCurrentPage,
  setTotalPages,
}) => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const limit = 10; // Limit of 10 items per page

  useEffect(() => {
    const fetchPartners = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          "https://bookmywarehouse-cwd2a3hgejevh8ht.eastus-01.azurewebsites.net/api/v1/admin/partner/without-kyc",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.data) {
          throw new Error("No data returned from server");
        }

        setPartners(response.data.data);
        setTotalPages(Math.ceil(response.data.data.length / limit));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(
          error instanceof Error ? error.message : "An unknown error occurred."
        );
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  useEffect(() => {
    const filteredPartners = partners.filter(
      (partner) =>
        partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partner.phone.includes(searchTerm)
    );

    setTotalPages(Math.ceil(filteredPartners.length / limit));
    setCurrentPage(1); // Reset to page 1 on search
  }, [searchTerm, partners]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredPartners = partners.filter(
    (partner) =>
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.phone.includes(searchTerm)
  );

  const paginatedPartners = filteredPartners.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const Spinner = () => (
    <div className="flex justify-center items-center">
      <ClipLoader size={50} color={"#4FD1C5"} loading={loading} />
    </div>
  );

  if (loading) return <Spinner />;
  if (error) return <Message message="Something went Wrong" />;

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

      {paginatedPartners.length === 0 ? (
        <Message message="No partners found." />
      ) : (
        paginatedPartners.map((partner) => (
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
                <p className="font-semibold text-sm text-gray-900 text-center sm:text-left">
                  {partner.email || "No Email"}
                </p>
                <p className="text-gray-500 text-center sm:text-left">
                  {partner.phone}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default WithoutKYCPartnerList;
