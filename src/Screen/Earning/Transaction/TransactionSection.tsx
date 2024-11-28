import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import apiService from "@/Components/APIService/apiService";
import { format, isToday, isYesterday, startOfWeek, endOfWeek } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import Pagination from "@/Components/Common/Pagination/Pagination";
import DateRangeModal from "../../../Components/Warehouse/DateRangeModal";
import "react-datepicker/dist/react-datepicker.css";
import Message from "@/Components/Common/NotFoundPage/Message";

type Transaction = {
  transactionType: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  warehouseName: string;
  status: string;
  amount: number;
  sellOrRent: string;
  paymentStatus: string;
  date: string;
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
  const itemsPerPage = 10;
  const [modalOpen, setModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await apiService.get<{ transactions: Transaction[] }>(
          "/admin/transactions"
        );
        if (response?.transactions) {
          const sortedTransactions = flattenAndSortTransactions(
            response.transactions
          );
          setGroupedTransactions(sortedTransactions);
          setError(null);
        }
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        setError("Failed to load transactions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const flattenAndSortTransactions = (
    transactions: Transaction[]
  ): GroupedTransactionEntry[] => {
    const groups: { [key: string]: Transaction[] } = {};
    const today = new Date();
    const weekStart = startOfWeek(today);
    const weekEnd = endOfWeek(today);

    transactions.forEach((tx) => {
      const paymentDate = new Date(tx.date);
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
          new Date(b.transaction.date).getTime() -
          new Date(a.transaction.date).getTime()
      );
  };

  // Filter transactions based on search term and date range
  const filteredTransactions = groupedTransactions.filter((transaction) => {
    const matchesSearchTerm =
      transaction.transaction.customerName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ?? false;

    const paymentDate = new Date(transaction.transaction.date);
    const isWithinDateRange =
      (!startDate || paymentDate >= startDate) &&
      (!endDate || paymentDate <= endDate);
    return matchesSearchTerm && isWithinDateRange;
  });

  const handleDateSelection = () => {
    setModalOpen(true);
  };

  const handleApplyDateRange = () => {
    setModalOpen(false);
  };

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

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
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-3/5 p-2 border rounded-md shadow-md text-sm sm:text-base"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center mb-4">
            <ClipLoader color="#4FD1C5" size={50} />
          </div>
        ) : error ? (
          <Message message="Something went wrong" />
        ) : filteredTransactions.length === 0 ? (
          <Message message="No transactions found" />
        ) : (
          paginatedTransactions.map(({ dateLabel, transaction }, index) => (
            <div
              key={`${transaction.orderId}-${index}`}
              style={{ marginBottom: "1.5rem" }}
            >
              {(index === 0 ||
                paginatedTransactions[index - 1].dateLabel !== dateLabel) && (
                <h3 className="text-sm text-gray-400 mb-2">{dateLabel}</h3>
              )}
              <TransactionItem tx={transaction} />
            </div>
          ))
        )}
      </section>

      {filteredTransactions.length > 0 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
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
  const formattedDate = format(new Date(tx.date), "dd MMM yyyy 'at' hh:mm a");
  const amount = tx.amount ? tx.amount.toFixed(2) : "0.00";

  return (
    <div className="flex justify-between items-center -mx-3 p-4 pl-1 pr-1 rounded-lg mb-3 shadow-sm sm:-mx-0 sm:p-4 sm:pl-4 sm:pr-4">
      <div className="flex items-center">
        <div className="w-8 h-8 flex justify-center items-center rounded-full border-2 border-green-500 mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </div>

        <div>
          <p className="font-medium text-sm sm:text-base">{tx.customerName}</p>
          <p className="text-xs sm:text-sm text-gray-400">{formattedDate}</p>
        </div>
      </div>

      <p className="text-green-500 font-medium text-sm sm:text-base">
        ₹{amount}
      </p>
    </div>
  );
};

export default TransactionSectionAll;
