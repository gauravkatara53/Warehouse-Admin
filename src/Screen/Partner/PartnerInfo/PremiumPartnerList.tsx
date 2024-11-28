import { useState, useEffect, ChangeEvent } from "react";
import { partners } from "../../../Data/PPPartnerData";
import Message from "@/Components/Common/NotFoundPage/Message";
interface PremiumPartnerListProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setTotalPages: (pages: number) => void;
}

const PremiumPartnerList: React.FC<PremiumPartnerListProps> = ({
  currentPage,
  setCurrentPage,
  setTotalPages,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const partnersPerPage = 10;

  // Filter partners based on search query and premium status
  const filteredPartners = partners.filter(
    (partner) =>
      partner.status === "premium" &&
      (partner.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        (partner.mobile?.startsWith(searchQuery) ?? false))
  );

  // Calculate total pages and inform the parent component
  useEffect(() => {
    const pages = Math.ceil(filteredPartners.length / partnersPerPage);
    setTotalPages(pages);
  }, [filteredPartners.length, setTotalPages]);

  // Slice the filtered results for the current page
  const displayedPartners = filteredPartners.slice(
    (currentPage - 1) * partnersPerPage,
    currentPage * partnersPerPage
  );

  // Update search query and reset to the first page on new search
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page on a new search
  };

  return (
    <div className="">
      {/* Search Bar */}
      <div className="my-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search premium partners by name or phone number"
          className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Partner List */}
      {displayedPartners.map((partner) => (
        <div
          key={partner.id}
          className="rounded-lg p-2 mb-4 shadow-md bg-white border border-yellow-300"
        >
          <div className="flex justify-between items-center">
            {/* Left Section: Profile Image and Name */}
            <div className="flex items-start">
              <img
                src={partner.imageUrl || "userde.jpg"}
                alt={partner.name}
                className="w-16 h-16 rounded-full  bg-gray-200 mr-4"
              />
              <div>
                <p className="font-bold text-yellow-600 text-md">
                  {partner.name}
                </p>
                <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-1 rounded-md">
                  {partner.id}
                </span>
              </div>
            </div>

            {/* Right Section: Email and Contact Info */}
            <div className="text-right">
              <p className="font-medium text-gray-600">{partner.email}</p>
              <p className="text-gray-500">{partner.mobile || "N/A"}</p>
            </div>
          </div>
        </div>
      ))}

      {displayedPartners.length === 0 && <Message message="No Partner Found" />}
    </div>
  );
};

export default PremiumPartnerList;
