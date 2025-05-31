import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import apiService from "@/Components/APIService/apiService";
import { format, isToday, isYesterday, startOfWeek, endOfWeek } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faCalendarAlt,
  faCircleXmark,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "@/Components/Common/Pagination/Pagination";
import DateRangeModal from "../../../Components/Warehouse/DateRangeModal";
import "react-datepicker/dist/react-datepicker.css";
import Message from "@/Components/Common/NotFoundPage/Message";

type Transaction = {
  _id: string;
  type: "order" | "partnerPayment";
  transactionDate: string;
  orderId: string;
  orderStatus: string | null;
  paymentStatus?: string;
  paymentMethod?: string;
  createdBy: string;
  warehouseName:
    | string
    | {
        _id: string;
        name: string;
      };
  amount: number;
  isdebited: boolean;
};

type ApiResponse = {
  statusCode: number;
  data: {
    transactions: Transaction[];
    currentPage: number;
    limit: number;
    totalPages: number;
    totalTransactions: number;
  };
  message: string;
  success: boolean;
  errors: null;
  timestamp: string;
};

type GroupedTransactionEntry = {
  dateLabel: string;
  transaction: Transaction;
};

const TransactionSectionAll = () => {
  const [groupedTransactions, setGroupedTransactions] = useState<
    GroupedTransactionEntry[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const [modalOpen, setModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let url = `/admin/all/transactions?page=${currentPage}&limit=${itemsPerPage}`;
        if (searchTerm) {
          url += `&search=${searchTerm}`;
        }
        if (startDate && endDate) {
          url += `&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
        }

        const response = await apiService.get<ApiResponse>(url);
        console.log("API Response:", response);
        if (response?.data?.transactions) {
          const sortedTransactions = flattenAndSortTransactions(
            response.data.transactions
          );
          setGroupedTransactions(sortedTransactions);
          setTotalPages(response.data.totalPages);
          setError(null);
        } else {
          console.error("No transactions found in the response");
          setError("No transactions found.");
        }
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        setError("Failed to load transactions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [currentPage, searchTerm, startDate, endDate]);

  const flattenAndSortTransactions = (
    transactions: Transaction[]
  ): GroupedTransactionEntry[] => {
    const groups: { [key: string]: Transaction[] } = {};
    const today = new Date();
    const weekStart = startOfWeek(today);
    const weekEnd = endOfWeek(today);

    transactions.forEach((tx) => {
      const paymentDate = new Date(tx.transactionDate);
      let dateLabel = "";

      if (isToday(paymentDate)) {
        dateLabel = "Today";
      } else if (isYesterday(paymentDate)) {
        dateLabel = "Yesterday";
      } else if (paymentDate >= weekStart && paymentDate <= weekEnd) {
        dateLabel = format(paymentDate, "EEEE");
      } else {
        dateLabel = format(paymentDate, "dd-MM-yyyy");
      }

      if (!groups[dateLabel]) {
        groups[dateLabel] = [];
      }
      groups[dateLabel].push(tx);
    });

    return Object.entries(groups)
      .map(([dateLabel, transactions]) =>
        transactions.map((tx) => ({ dateLabel, transaction: tx }))
      )
      .flat()
      .sort(
        (a, b) =>
          new Date(b.transaction.transactionDate).getTime() -
          new Date(a.transaction.transactionDate).getTime()
      );
  };

  const handleDateSelection = () => {
    setModalOpen(true);
  };

  const handleApplyDateRange = () => {
    setModalOpen(false);
    setCurrentPage(1); // Reset to first page when applying date range
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div>
      <section className="p-4 sm:p-6 lg:p-8 bg-white rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium sm:text-xl">Your Transactions</h2>
          <div className="flex items-center space-x-2">
            <span
              className="text-gray-500 flex items-center space-x-1 cursor-pointer"
              onClick={handleDateSelection}
            >
              <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500" />
              <span>
                {startDate && endDate
                  ? `${format(startDate, "dd/MM/yy")} - ${format(
                      endDate,
                      "dd/MM/yy"
                    )}`
                  : "Select Date Range"}
              </span>
            </span>
          </div>
        </div>

        <div className="mb-4 flex">
          <input
            type="text"
            placeholder="Search with Customer Name"
            value={searchTerm}
            onChange={handleSearch}
            className="w-3/5 p-2 border rounded-md shadow-md text-sm sm:text-base"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center mb-4">
            <ClipLoader color="#4FD1C5" size={50} />
          </div>
        ) : error ? (
          <Message message="Something went wrong" />
        ) : groupedTransactions.length === 0 ? (
          <Message message="No transactions found" />
        ) : (
          groupedTransactions.map(({ dateLabel, transaction }, index) => (
            <div
              key={`${transaction._id}-${index}`}
              style={{ marginBottom: "1.5rem" }}
            >
              {(index === 0 ||
                groupedTransactions[index - 1].dateLabel !== dateLabel) && (
                <h3 className="text-sm text-gray-400 mb-2">{dateLabel}</h3>
              )}
              <TransactionItem tx={transaction} />
            </div>
          ))
        )}
      </section>

      {groupedTransactions.length > 0 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
        />
      )}

      <DateRangeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onApply={handleApplyDateRange}
      />
    </div>
  );
};

const TransactionItem = ({ tx }: { tx: Transaction }) => {
  const formattedDate = format(
    new Date(tx.transactionDate),
    "dd MMM yyyy 'at' hh:mm a"
  );
  const amount = tx.amount ? tx.amount.toFixed(2) : "0.00";

  const warehouseDisplay =
    typeof tx.warehouseName === "string"
      ? tx.warehouseName
      : tx.warehouseName?.name;

  const getStatusIcon = () => {
    if (!tx.isdebited) {
      switch (tx.paymentStatus) {
        case "Completed":
          return (
            <div className="w-8 h-8 flex justify-center items-center rounded-full border-2 border-green-500 mr-4">
              <FontAwesomeIcon icon={faArrowDown} className="text-green-500" />
            </div>
          );
        case "Failed":
          return (
            <div className="w-8 h-8 flex justify-center items-center rounded-full border-2 border-red-500 mr-4">
              <FontAwesomeIcon icon={faCircleXmark} className="text-red-500" />
            </div>
          );
        case "Pending":
          return (
            <div className="w-8 h-8 flex justify-center items-center rounded-full border-2 border-yellow-500 mr-4">
              <FontAwesomeIcon icon={faSpinner} className="text-yellow-500" />
            </div>
          );
        default:
          return null;
      }
    }
    if (tx.isdebited) {
      return (
        <div className="w-8 h-8 flex justify-center items-center rounded-full border-2 border-blue-500 mr-4">
          <FontAwesomeIcon icon={faArrowUp} className="text-green-500" />
        </div>
      );
    }
  };

  return (
    <div className="flex justify-between items-center -mx-3 p-4 pl-1 pr-1 rounded-lg mb-3 shadow-sm sm:-mx-0 sm:p-4 sm:pl-4 sm:pr-4">
      <div className="flex items-center">
        {getStatusIcon()}
        <div>
          <p className="font-medium text-sm sm:text-base">{tx.createdBy}</p>
          <p className="text-xs sm:text-sm text-gray-400">
            {warehouseDisplay} | {formattedDate}
          </p>
        </div>
      </div>

      <p
        className={`font-medium text-sm sm:text-base ${
          tx.isdebited ? "text-red-500" : "text-green-500"
        }`}
      >
        {tx.isdebited ? `- ₹${amount}` : `+ ₹${amount}`}
      </p>
    </div>
  );
};

export default TransactionSectionAll;
