const ReplyModal = ({ complaint, onClose, onSendReply }: any) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
    <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg relative">
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
      <h3 className="text-lg font-medium mb-2">{complaint.subject}</h3>
      <p className="text-sm text-gray-600 mb-2">
        Time: {complaint.timeOfComplaint}
      </p>
      <p className="text-sm text-gray-600 mb-4">
        Description: {complaint.description}
      </p>
      <p className="text-sm text-gray-600 mb-4">
        Attachments: {complaint.attachments}
      </p>
      <input
        type="text"
        placeholder="Type your reply..."
        className="border border-gray-300 w-full p-2 mb-4 rounded"
      />
      <button
        className="text-xs px-4 py-2 w-28 rounded border text-white bg-[#9F8EF2]"
        onClick={onSendReply}
      >
        Send Reply
      </button>
    </div>
  </div>
);

export default ReplyModal;
