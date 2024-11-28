import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import apiService from "@/Components/APIService/apiService";
import { format, isToday, isYesterday, startOfWeek, endOfWeek } from "date-fns";
import Message from "@/Components/Common/NotFoundPage/Message";
type Transaction = {
  _id: string;
  partnerName: string;
  paymentDate: string;
  paidAmount: number;
  orderStatus: string;
  paymentStatus: string;
};

type GroupedTransactions = {
  [key: string]: Transaction[];
};

const TransactionSection = () => {
  const [groupedTransactions, setGroupedTransactions] =
    useState<GroupedTransactions>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await apiService.get<{ data: Transaction[] }>(
          "/admin/dashboard-recent-transaction"
        );
        if (response?.data) {
          const sortedGroupedTransactions = groupTransactionsByDate(
            response.data
          );
          setGroupedTransactions(sortedGroupedTransactions);
          setError(null); // Reset error if data is fetched successfully
        }
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        setError("Failed to load transactions. Please try again later."); // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const groupTransactionsByDate = (
    transactions: Transaction[]
  ): GroupedTransactions => {
    const groups: GroupedTransactions = {};

    const today = new Date();
    const weekStart = startOfWeek(today); // Start of the current week (Sunday)
    const weekEnd = endOfWeek(today); // End of the current week (Saturday)

    transactions.forEach((tx) => {
      const paymentDate = new Date(tx.paymentDate);
      let dateLabel = "";

      if (isToday(paymentDate)) {
        dateLabel = "Today";
      } else if (isYesterday(paymentDate)) {
        dateLabel = "Yesterday";
      } else if (paymentDate >= weekStart && paymentDate <= weekEnd) {
        // If the date is within the current week, display the day of the week
        dateLabel = format(paymentDate, "EEEE"); // E.g., "Monday"
      } else {
        // For dates older than this week, display the formatted date
        dateLabel = format(paymentDate, "dd-MM-yyyy");
      }

      if (!groups[dateLabel]) {
        groups[dateLabel] = [];
      }
      groups[dateLabel].push(tx);
    });

    // Sort each date group by paymentDate in descending order
    Object.keys(groups).forEach((date) => {
      groups[date].sort(
        (a, b) =>
          new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime()
      );
    });

    // Sort groups by recency of the first transaction in each group
    return Object.fromEntries(
      Object.entries(groups).sort((a, b) => {
        const dateA = new Date(a[1][0].paymentDate);
        const dateB = new Date(b[1][0].paymentDate);
        return dateB.getTime() - dateA.getTime();
      })
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ClipLoader color="#4FD1C5" size={50} />
      </div>
    );
  }

  return (
    <section className="p-4 sm:p-6 lg:p-8 bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold sm:text-xl">Recent Transactions</h2>
        <Link
          to="/earning"
          className="text-[#4FD1C5] hover:underline text-sm sm:text-base"
        >
          View All
        </Link>
      </div>

      {/* Display error message if there's an error */}
      {error && <Message message={"Something went Wrong"} />}

      {/* Display a message if there are no transactions */}
      {!error && Object.keys(groupedTransactions).length === 0 && (
        <Message message="No transactions available." />
      )}

      {/* Render transactions grouped by date */}
      {Object.entries(groupedTransactions).map(([date, transactions]) => (
        <div key={date} style={{ marginBottom: "1.5rem" }}>
          <h3 className="text-sm text-gray-400 mb-2">{date}</h3>
          {transactions.map((tx) => (
            <TransactionItem key={tx._id} tx={tx} />
          ))}
        </div>
      ))}
    </section>
  );
};

const TransactionItem = ({ tx }: { tx: Transaction }) => {
  const formattedDate = format(
    new Date(tx.paymentDate),
    "dd MMM yyyy 'at' hh:mm a"
  );
  const paidAmount = tx.paidAmount ? tx.paidAmount.toFixed(2) : "0.00";

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
          <p className="font-medium text-sm sm:text-base">{tx.partnerName}</p>
          <p className="text-xs sm:text-sm text-gray-400">{formattedDate}</p>
        </div>
      </div>

      <p className="text-green-500 font-medium text-sm sm:text-base">
        ₹{paidAmount}
      </p>
    </div>
  );
};

export default TransactionSection;
