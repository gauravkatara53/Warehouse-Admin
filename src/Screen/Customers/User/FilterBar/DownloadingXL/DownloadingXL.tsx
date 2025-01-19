import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import apiService from "@/Components/APIService/apiService"; // Adjust the import path as necessary
import ClipLoader from "react-spinners/ClipLoader";

interface DownloadingXLProps {
  onClose: () => void;
}

const DownloadingXL: React.FC<DownloadingXLProps> = ({ onClose }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const formatLocalDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const downloadExcel = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    setLoading(true);

    // Format startDate and increment endDate by 1 day
    const formattedStartDate = formatLocalDate(startDate);
    const adjustedEndDate = new Date(endDate);
    adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);
    const formattedEndDate = formatLocalDate(adjustedEndDate);

    const url = `/download/user-list?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;

    try {
      // Fetch the response from the API
      const response = await apiService.get<string>(url); // Assuming the API returns CSV-like data
      if (!response) {
        alert("Failed to fetch data. Please try again.");
        return;
      }

      // Initialize ExcelJS workbook and worksheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Users");

      // Parse the response into rows (assumes CSV-like format)
      const rows = response.split("\n").map((line) => line.split(","));

      // Dynamically set headers and add rows to the worksheet
      if (rows.length > 0) {
        worksheet.columns = rows[0].map((header) => ({
          header,
          key: header,
          width: 20,
        }));
        rows.slice(1).forEach((row) => {
          worksheet.addRow(row);
        });
      }

      // Write to Excel buffer and save the file
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, `Users_${formattedStartDate}_to_${formattedEndDate}.xlsx`);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      alert("Failed to download data. Please try again.");
    } finally {
      setLoading(false);
      onClose(); // Close the modal after the process is complete
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-40" />

      <div className="downloading-xl-modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-lg p-4 z-50 max-w-sm w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>

        <h3 className="text-2xl font-semibold text-center">
          Download Users Data
        </h3>
        <p className="text-sm text-gray-400 mb-6 text-center">
          Select Date Range
        </p>

        <div className="flex justify-center items-center mb-4 space-x-4">
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1 ml-1">
              Start Date
            </label>
            <DatePicker
              selected={startDate}
              onChange={setStartDate}
              placeholderText="Select Start Date"
              dateFormat="dd MMM yyyy"
              className="border rounded-lg w-40 px-4 py-2 text-center"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1 ml-1">
              End Date
            </label>
            <DatePicker
              selected={endDate}
              onChange={setEndDate}
              minDate={startDate ?? undefined} // Convert null to undefined
              placeholderText="Select End Date"
              dateFormat="dd MMM yyyy"
              className="border rounded-lg w-40 px-4 py-2 text-center"
              disabled={!startDate}
            />
          </div>
        </div>

        <hr className="my-4" />
        <div className="flex justify-center">
          <button
            className="bg-[#4FD1C5] text-white rounded-lg w-2/3 px-4 py-2"
            onClick={downloadExcel}
            disabled={loading}
          >
            {loading ? <ClipLoader color="#ffffff" size={20} /> : "Download"}
          </button>
        </div>
      </div>
    </>
  );
};

export default DownloadingXL;
