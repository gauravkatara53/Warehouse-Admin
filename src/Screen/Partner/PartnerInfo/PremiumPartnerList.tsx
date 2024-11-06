import { useState, useEffect, ChangeEvent } from "react";
import { partners } from "../../../Data/PPPartnerData";

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
  const partnersPerPage = 5;

  // Filter partners based on search query and premium status
  const filteredPartners = partners.filter(
    (partner) =>
      partner.status === "premium" &&
      (partner.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        (partner.mobile?.startsWith(searchQuery) ?? false)) // Handle undefined mobile
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
    <div>
      {/* Search Bar */}
      <div className="my-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name or phone number"
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Partner List */}
      {displayedPartners.map((partner) => (
        <div
          key={partner.id}
          className="rounded-lg px-2 my-3 border border-gray-200"
        >
          <div className="rounded-lg p-3 px-0 mb-2">
            <div className="flex justify-between items-center">
              <div className="flex items-start">
                <img
                  src={partner.imageUrl || "userde.jpg"}
                  alt={partner.name}
                  className="w-12 h-12 rounded-full bg-gray-200 mr-4"
                />
                <div>
                  <p className="font-medium text-yellow-500">{partner.name}</p>
                  <p className="text-gray-400">{partner.id}</p>
                </div>
              </div>
              <div>
                <p className="font-semibold text-sm text-yellow-500">
                  {partner.email}
                </p>
                <p className="text-gray-500 text-right">
                  {partner.mobile || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PremiumPartnerList;
