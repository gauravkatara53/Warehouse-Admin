import { transactionData } from "../../../Data/TPtransactionData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Pagination from "@/Components/Common/Pagination/Pagination"; // Import your Pagination component

type Transaction = {
  id: number;
  partner: string;
  date: string;
  amount: string;
  type: string;
};

type GroupedTransactions = {
  [key: string]: Transaction[];
};

const TransactionSectionAll = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Define the number of items per page

  // Group transactions by date
  const groupedTransactions: GroupedTransactions = transactionData.reduce(
    (acc, tx) => {
      const dateKey = tx.type;
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(tx);
      return acc;
    },
    {} as GroupedTransactions
  );

  // Filter transactions based on search term
  const filteredTransactions = Object.entries(groupedTransactions).reduce(
    (acc, [date, transactions]) => {
      const matchingTransactions = transactions.filter((tx) =>
        tx.partner.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matchingTransactions.length) {
        acc[date] = matchingTransactions;
      }
      return acc;
    },
    {} as GroupedTransactions
  );

  // Pagination Logic
  const totalPages = Math.ceil(
    Object.keys(filteredTransactions).length / itemsPerPage
  );
  const paginatedDates = Object.keys(filteredTransactions).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <section className="p-4 sm:p-6 lg:p-8  bg-white">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium sm:text-xl">Your Transactions</h2>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 flex items-center space-x-1">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500" />
              <span className="lg:text-sm text-sm md:text-sm">
                23-30 July 2024
              </span>
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4 flex ">
          <input
            type="text"
            placeholder="Search with Txn ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-3/5 p-2 border rounded-md shadow-md text-sm sm:text-base"
          />
        </div>

        {/* Render paginated and filtered transactions grouped by date */}
        {paginatedDates.map((date) => (
          <div key={date} style={{ marginBottom: "1.5rem" }}>
            <h3 className="text-sm text-gray-400 mb-2">{date}</h3>
            {filteredTransactions[date].map((tx) => (
              <TransactionItem key={tx.id} tx={tx} />
            ))}
          </div>
        ))}

        {/* Pagination Component */}
      </section>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

const TransactionItem = ({ tx }: { tx: Transaction }) => (
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
        <p className="font-medium text-sm sm:text-base">{tx.partner}</p>
        <p className="text-xs sm:text-sm text-gray-400">{tx.date}</p>
      </div>
    </div>

    <p className="text-green-500 font-medium text-sm sm:text-base">
      {tx.amount}
    </p>
  </div>
);

export default TransactionSectionAll;
