import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import apiService from "@/Components/APIService/apiService";
import { format, isToday, isYesterday, startOfWeek, endOfWeek } from "date-fns";
import Message from "@/Components/Common/NotFoundPage/Message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faCircleXmark,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

type Transaction = {
  _id: string;
  type: "order" | "partnerPayment";
  transactionDate: string;
  orderId: string | null;
  orderStatus: string | null;
  paymentStatus?: string;
  paymentMethod?: string;
  createdBy: string;
  amount: number;
  isdebited: boolean;
  nameWarehouse: string;
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
          data: Transaction[];
        }>("/admin/dashboard/recent/transaction");

        if (response?.data) {
          // Map backend response directly to Transaction type
          const transactions = response.data.map((tx) => ({
            _id: tx._id,
            type: tx.type,
            transactionDate: tx.transactionDate,
            orderId: tx.orderId || null,
            orderStatus: tx.orderStatus || null,
            paymentStatus: tx.paymentStatus,
            paymentMethod: tx.paymentMethod,
            createdBy: tx.createdBy,
            nameWarehouse: tx.nameWarehouse,
            amount: tx.amount,
            isdebited: tx.isdebited,
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

      {error && <Message message={error} />}

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
  const formattedDate = format(
    new Date(tx.transactionDate),
    "dd MMM yyyy 'at' hh:mm a"
  );
  const amount = tx.amount ? tx.amount.toFixed(2) : "0.00";

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
          <p className="font-medium text-sm sm:text-base">
            {tx.createdBy || "Unknown"}
          </p>
          <p className="text-xs sm:text-sm text-gray-400">
            {tx.nameWarehouse} | {formattedDate}
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

export default TransactionSection;
