const ReplyModal = ({
  complaint,
  replyText,
  setReplyText,
  onClose,
  onSendReply,
  onMarkAsSolved,
  onMarkAsOnHold,
}: any) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    const datePart = date.toLocaleDateString("en-GB", options); // Get the date (day, month, year)

    // Now for the time part (with hour and minute)
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const timePart = date.toLocaleTimeString("en-GB", timeOptions); // Get the time (hour:minute AM/PM)

    return `${datePart} at ${timePart}`; // Add "at" between date and time
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Heading */}
        <h2 className="text-xl font-medium mb-4 text-gray-900">
          Complaint Details
        </h2>

        {/* Subject */}
        <div className="mb-4">
          <p className="text-sm text-gray-500">Subject</p>
          <div className="bg-gray-100 p-2 py-4 rounded-md">
            {complaint.subject || "NA"}
          </div>
        </div>

        {/* Date/Time */}
        <div className="mb-4">
          <p className="text-sm text-gray-500">Date/Time of Complaint</p>
          <div className="bg-gray-100 p-2 py-4 rounded-md">
            {complaint.createdAt ? formatDate(complaint.createdAt) : "NA"}
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-sm text-gray-500">Description</p>
          <div className="bg-gray-100 p-2 py-4 rounded-md">
            {complaint.description || "NA"}
          </div>
        </div>

        {/* Attachments */}
        <div className="mb-4">
          <p className="text-sm text-gray-500">Image</p>
          <a
            href={complaint.image}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className=" rounded border w-20">
              <img
                src={
                  complaint.image ||
                  "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg"
                }
                alt="Image"
                className="w-20 h-20 object-cover"
              />
            </div>
          </a>
        </div>

        {/* Reply Input */}
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)} // Update the input value on change
          placeholder="Type your reply..."
          className="border border-gray-300 w-full h-24 p-2 mb-4 rounded resize-none" // Use h-24 for more height
          rows={4} // Adjust number of visible rows
        />

        {/* Action Buttons */}
        <div className="flex justify-between">
          {complaint.status === "Pending" ? (
            <button
              className="text-xs px-4 py-2 w-30 rounded border hover:text-white hover:bg-[#F2A47A]"
              onClick={onMarkAsOnHold}
            >
              Mark as On Hold
            </button>
          ) : complaint.status === "On Hold" ? (
            <button
              className="text-xs px-4 py-2 w-30 rounded border hover:text-white hover:bg-gray-600"
              onClick={onMarkAsSolved}
            >
              Mark as Solved
            </button>
          ) : null}
          <button
            className="text-xs px-4 py-2 w-28 rounded border hover:text-white hover:bg-[#9F8EF2]"
            onClick={onSendReply}
          >
            Send Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;
