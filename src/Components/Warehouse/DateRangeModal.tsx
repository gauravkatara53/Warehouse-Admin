import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  startDate: Date | undefined;
  endDate: Date | undefined;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
  onApply: () => void;
}

const DateRangeModal: React.FC<DateRangeModalProps> = ({
  isOpen,
  onClose,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onApply,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-lg p-4 z-50 max-w-sm w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500"
        >
          ×
        </button>
        <div className="flex flex-col items-center space-y-4">
          <DatePicker
            selected={startDate}
            onChange={(date) => onStartDateChange(date ?? undefined)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Select Start Date"
            className="w-full border p-2 rounded"
            dateFormat="dd/MM/yy" // Date format for the start date
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => onEndDateChange(date ?? undefined)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="Select End Date"
            className="w-full border p-2 rounded"
            dateFormat="dd/MM/yy" // Date format for the end date
          />
          <button
            onClick={onApply}
            className="px-4 py-2 bg-[#4FD1C5] text-white rounded-md"
          >
            Apply Date Range
          </button>
        </div>
      </div>
    </>
  );
};

export default DateRangeModal;
