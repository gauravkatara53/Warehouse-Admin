// TransactionSection.tsx
import { transactionData } from "../../../Data/DPtransactionData";
import { Link } from "react-router-dom";

type Transaction = {
  id: number;
  partner: string;
  date: string;
  amount: string;
  type: string; // This will hold the date as a string
};

type GroupedTransactions = {
  [key: string]: Transaction[];
};

const TransactionSection = () => {
  // Group transactions by date
  const groupedTransactions: GroupedTransactions = transactionData.reduce(
    (acc, tx) => {
      const dateKey = tx.type; // Use the type as the date key
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(tx);
      return acc;
    },
    {} as GroupedTransactions // Specify the initial accumulator type
  );

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

      {/* Render transactions grouped by date */}
      {Object.entries(groupedTransactions).map(([date, transactions]) => (
        <div key={date} style={{ marginBottom: "1.5rem" }}>
          <h3 className="text-sm text-gray-400 mb-2">{date}</h3>
          {transactions.map((tx) => (
            <TransactionItem key={tx.id} tx={tx} />
          ))}
        </div>
      ))}
    </section>
  );
};

const TransactionItem = ({ tx }: { tx: Transaction }) => (
  <div className="flex justify-between items-center -mx-3 p-4 pl-1 pr-1 rounded-lg mb-3 shadow-sm sm:-mx-0 sm:p-4 sm:pl-4 sm:pr-4">
    <div className="flex items-center">
      {/* Upward arrow icon */}
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
        <p className="font-medium text-sm sm:text-base">{tx.partner}</p>
        <p className="text-xs sm:text-sm text-gray-400">{tx.date}</p>
      </div>
    </div>

    <p className="text-green-500 font-medium text-sm sm:text-base">
      {tx.amount}
    </p>
  </div>
);

export default TransactionSection;
