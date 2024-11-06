import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./Pagination.css";

const Pagination: React.FC<{
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}> = ({ totalPages, currentPage, setCurrentPage }) => {
  //   const [showDropdown, setShowDropdown] = useState(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  //   const toggleDropdown = () => {
  //     setShowDropdown(!showDropdown);
  //   };

  // Calculate the range of page numbers to display
  const getVisiblePages = () => {
    const totalVisiblePages = 4;
    let startPage: number;
    let endPage: number;

    if (totalPages <= totalVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const halfVisible = Math.floor(totalVisiblePages / 2);
      startPage = Math.max(1, currentPage - halfVisible);
      endPage = Math.min(totalPages, currentPage + halfVisible);

      if (startPage === 1) {
        endPage = Math.min(totalVisiblePages, totalPages);
      }

      if (endPage === totalPages) {
        startPage = Math.max(1, totalPages - totalVisiblePages + 1);
      }
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center p-2 pt-10  rounded text-gray-700">
      <div
        className={`cursor-pointer w-10 h-10 flex items-center justify-center bg-white border rounded-md mx-1 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={currentPage > 1 ? handlePrev : undefined} // Prevents click if at the first page
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>

      {visiblePages.map((pageNum) => (
        <div
          key={pageNum}
          className={`w-10 h-10 flex items-center justify-center mx-1 border rounded-md cursor-pointer transition ${
            pageNum === currentPage
              ? "border-blue-500 text-black"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => handlePageChange(pageNum)}
        >
          {pageNum}
        </div>
      ))}

      <div
        className={`cursor-pointer w-10 h-10 flex items-center justify-center bg-white border rounded-md mx-1 ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={currentPage < totalPages ? handleNext : undefined} // Prevents click if at the last page
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </div>

      <div className="ml-6 flex items-center bg-white border rounded-md p-2 shadow-sm whitespace-nowrap ">
        <span className="mr-2">Total Pages: {totalPages}</span>
      </div>
    </div>
  );
};

export default Pagination;
