import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import apiService from "@/Components/APIService/apiService";
import { format, isToday, isYesterday, startOfWeek, endOfWeek } from "date-fns";
import Message from "@/Components/Common/NotFoundPage/Message";

type Transaction = {
  _id: string;
  warehouseName: string;
  transactionDate: string;
  totalPrice: number;
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await apiService.get<{
          data: {
            _id: string;
            warehouseId: { _id: string; name: string };
            transactionDate: string;
            totalPrice: number;
            orderId: { _id: string; orderStatus: string };
            paymentStatus: string;
          }[];
        }>("/admin/dashboard/recent/transaction");

        if (response?.data) {
          const transactions = response.data.map((tx) => ({
            _id: tx._id,
            warehouseName: tx.warehouseId.name,
            transactionDate: tx.transactionDate,
            totalPrice: tx.totalPrice,
            orderStatus: tx.orderId.orderStatus,
            paymentStatus: tx.paymentStatus,
          }));

          const sortedGroupedTransactions =
            groupTransactionsByDate(transactions);
          setGroupedTransactions(sortedGroupedTransactions);
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

  const groupTransactionsByDate = (
    transactions: Transaction[]
  ): GroupedTransactions => {
    const groups: GroupedTransactions = {};

    const today = new Date();
    const weekStart = startOfWeek(today);
    const weekEnd = endOfWeek(today);

    transactions.forEach((tx) => {
      const transactionDate = new Date(tx.transactionDate);
      let dateLabel = "";

      if (isToday(transactionDate)) {
        dateLabel = "Today";
      } else if (isYesterday(transactionDate)) {
        dateLabel = "Yesterday";
      } else if (transactionDate >= weekStart && transactionDate <= weekEnd) {
        dateLabel = format(transactionDate, "EEEE");
      } else {
        dateLabel = format(transactionDate, "dd-MM-yyyy");
      }

      if (!groups[dateLabel]) {
        groups[dateLabel] = [];
      }
      groups[dateLabel].push(tx);
    });

    Object.keys(groups).forEach((date) => {
      groups[date].sort(
        (a, b) =>
          new Date(b.transactionDate).getTime() -
          new Date(a.transactionDate).getTime()
      );
    });

    return Object.fromEntries(
      Object.entries(groups).sort((a, b) => {
        const dateA = new Date(a[1][0].transactionDate);
        const dateB = new Date(b[1][0].transactionDate);
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold sm:text-xl">Recent Transactions</h2>
        <Link
          to="/earning"
          className="text-[#4FD1C5] hover:underline text-sm sm:text-base"
        >
          View All
        </Link>
      </div>

      {error && <Message message="Something went Wrong" />}

      {!error && Object.keys(groupedTransactions).length === 0 && (
        <Message message="No transactions available." />
      )}

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
  const paymentDate = new Date(tx.transactionDate); // Using transactionDate, as paymentDate might not exist.
  const formattedDate = isNaN(paymentDate.getTime()) // Check if the date is invalid
    ? "Invalid Date"
    : format(paymentDate, "dd MMM yyyy 'at' hh:mm a"); // Use formatted date if valid

  const paidAmount = tx.totalPrice ? tx.totalPrice.toFixed(2) : "0.00"; // Ensure totalPrice is used if paidAmount doesn't exist

  // Determine the icon and color based on payment status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return (
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
        );
      case "Failed":
        return (
          <div className="w-8 h-8 flex justify-center items-center rounded-full border-2 border-red-500 mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        );
      case "Pending":
        return (
          <div className="w-8 h-8 flex justify-center items-center rounded-full border-2 border-yellow-500 mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01m-6.938 4h13.856C18.602 21 20 19.656 20 18.01V5.99C20 4.344 18.602 3 16.928 3H7.072C5.398 3 4 4.344 4 5.99v12.02C4 19.656 5.398 21 7.072 21z"
              />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-between items-center -mx-3 p-4 pl-1 pr-1 rounded-lg mb-3 shadow-sm sm:-mx-0 sm:p-4 sm:pl-4 sm:pr-4">
      <div className="flex items-center">
        {getStatusIcon(tx.paymentStatus)}

        <div>
          <p className="font-medium text-sm sm:text-base">{tx.warehouseName}</p>
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
