import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons"; // Import the PDF icon
import { invoiceData } from "./InvoiceData";

const InvoiceList: React.FC = () => {
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-medium mb-6">Invoices</h2>
      <ul className="space-y-4">
        {invoiceData.map((invoice, index) => (
          <li key={index} className="flex justify-between items-center  pb-4">
            <div>
              <p className="text-gray-600 font-semibold text-sm">
                {invoice.date}
              </p>
              <p className="text-xs text-gray-400">{invoice.code}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-400">
                {invoice.amount}
              </span>
              <FontAwesomeIcon
                icon={faFilePdf}
                className="text-gray-900 text-sm"
              />{" "}
              {/* FontAwesome PDF icon */}
              <span className="text-gray-900 font-semibold text-sm cursor-pointer">
                PDF
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceList;
