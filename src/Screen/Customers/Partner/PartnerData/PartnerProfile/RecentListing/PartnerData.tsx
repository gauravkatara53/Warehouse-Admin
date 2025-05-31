import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Pagination from "@/Components/Common/Pagination/Pagination";
import apiService from "@/Components/APIService/apiService";
import Message from "@/Components/Common/NotFoundPage/Message";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import React from "react";

interface MonthlyPayment {
  amount: number;
  paymentStatus: string; // 'paid' or 'unpaid' by user
  month: string;
  paymentForPartnerByBMW: string; // 'paid' or 'unpaid' by BMW
}
interface WarehouseDetail {
  rentOrSell: string;
}
interface transaction {
  paymentStatus: string; // 'paid' or 'unpaid'
}
interface WarehouseOrder {
  _id: string;
  orderId: string;
  orderStatus: string;
  orderDate: string;
  totalPrice: number;
  monthlyPayment: MonthlyPayment[];
  WarehouseDetail: WarehouseDetail;
  transaction: transaction;
  createdAt: string;
  endDate: string; // Optional, can be null
  paymentFromBMWSold: string;
}

interface ProfileListingProps {
  partner: { _id: string };
}
interface PaymentResponse {
  success: boolean;
  data: any; // You can type this more strictly if needed
}

interface Bankdetails {
  _id: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
  branchName: string;
  partnerId: {
    name: string;
    email: string;
  };
}

// interface BankDetailsApiResponse {
//   statusCode: number;
//   data: Bankdetails;
//   message: string;
//   success: boolean;
//   errors: any;
//   timestamp: string;
// }

const RecentListings: React.FC<ProfileListingProps> = ({ partner }) => {
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const [currentPage, setCurrentPage] = useState(1);
  const [listingData, setListingData] = useState<WarehouseOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<{
    orderId: string;
    month: string;
    _id: string;
    bankdetails: Bankdetails[];
  } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [UTR, setUTR] = useState("");
  const [notes, setNotes] = useState("");
  const [bankdetails, setBankDetails] = useState<Bankdetails[]>([]);

  const usersPerPage = 5;

  useEffect(() => {
    const fetchRecentListings = async () => {
      setLoading(true);
      let page = 1;
      let fetchedList: WarehouseOrder[] = [];
      let totalFetchedList = 0;
      try {
        do {
          const response = await apiService.get<{
            data: {
              orders: WarehouseOrder[];
              page: number;
              pages: number;
              limit: number;
              totalCount: number;
            };
          }>(
            `/order/partner/all/order/history/${partner._id}?page=${page}&limit=${usersPerPage}`
          );
          if (response && response.data?.orders) {
            const formattedData = response.data.orders.map((order) => ({
              ...order,
              orderDate: order.orderDate
                ? new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(order.orderDate))
                : "N/A",
            }));
            fetchedList = [...fetchedList, ...formattedData];
            totalFetchedList = response.data.totalCount;
            page++;
          }
        } while (page <= Math.ceil(totalFetchedList / usersPerPage));
        setListingData(fetchedList);
      } catch (err) {
        setError("Failed to fetch listings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentListings();
  }, [partner._id]);

  // Fetch bank details

  const toggleRow = (orderId: string) => {
    setExpandedRows((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const openPayModal = (
    orderId: string,
    month: string,
    _id: string,
    bankdetails: Bankdetails[]
  ) => {
    const fetchBankDetails = async () => {
      setLoading(true);
      try {
        const response = await apiService.get<{
          statusCode: number;
          data: Bankdetails;
          message: string;
          success: boolean;
          errors: any;
          timestamp: string;
        }>(`/transaction/get/bank/detail/${partner._id}`);

        if (response && response.data) {
          setBankDetails([response.data]); // Wrap in array if your state expects an array
        } else {
          setError("No bank details found.");
        }
      } catch (err) {
        setError("Failed to fetch bank details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    console.log(bankdetails);
    if (partner._id) {
      fetchBankDetails(); // Call directly instead of using useEffect inside a function
    }

    setSelectedPayment({ orderId, month, _id, bankdetails });
    setShowPayModal(true);
  };

  const closeModal = () => {
    setShowPayModal(false);
    setSelectedPayment(null);
  };

  const totalPages = Math.ceil(listingData.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentOrders = listingData.slice(indexOfFirstUser, indexOfLastUser);

  const handlePaymentConfirm = async () => {
    if (!selectedPayment || !UTR || !paymentMethod) {
      setError("Please fill all fields before confirming payment.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiService.post<PaymentResponse>(
        `/order/payment/bmw/partner/${selectedPayment._id}`,
        {
          paymentMethod,
          UTR,
          notes,
        }
      );

      console.log("API response received:", response);

      // Use response.success, not response.data.success
      if (response?.success) {
        setSubmissionStatus("success");
      } else {
        setSubmissionStatus("error");
        setError("Failed to confirm payment. Please try again.");
        console.error("Payment confirmation failed in API response:", response);
      }
    } catch (err) {
      setSubmissionStatus("error");
      setError("An error occurred while confirming payment. Please try again.");
      console.error("Error caught during payment confirmation:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="relative overflow-x-auto my-4">
        <h1 className="text-3xl font-semibold text-gray-700 mb-4">
          All Orders
        </h1>
        <table className="min-w-full table-auto text-sm text-left font-sm text-gray-500 border-b border-gray-300">
          <thead className="text-xs text-gray-500 bg-gray-100">
            <tr>
              <th className="px-8 py-3 border-b border-gray-300">Sn.no</th>
              <th className="px-8 py-3 border-b border-gray-300">Order ID</th>
              <th className="px-8 py-3 border-b border-gray-300">Start Date</th>
              <th className="px-8 py-3 border-b border-gray-300">End Date</th>
              <th className="px-8 py-3 border-b border-gray-300">Rent/Sell</th>
              <th className="px-8 py-3 border-b border-gray-300">
                Payments (User)
              </th>
              <th className="px-8 py-3 border-b border-gray-300">
                Payments (BMW)
              </th>
              <th className="px-8 py-3 border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-6">
                  <ClipLoader size={50} color="#4FD1C5" loading={loading} />
                </td>
              </tr>
            ) : currentOrders.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6">
                  <Message message="No orders found." />
                </td>
              </tr>
            ) : (
              currentOrders.map((order, index) => {
                const paidCount = order.monthlyPayment.filter(
                  (p) => p.paymentStatus === "Paid"
                ).length;
                const bmwPaidCount = order.monthlyPayment.filter(
                  (p) => p.paymentForPartnerByBMW === "Paid"
                ).length;
                const totalCount = order.monthlyPayment.length;
                return (
                  <React.Fragment key={order._id}>
                    <tr className="border-b border-gray-300">
                      <td className="px-8 py-4 font-medium whitespace-nowrap">
                        {indexOfFirstUser + index + 1}
                      </td>
                      <td className="px-8 py-4 whitespace-nowrap">
                        {order.orderId}
                      </td>
                      <td className="px-8 py-4 whitespace-nowrap">
                        {order.orderDate}
                      </td>
                      <td className="px-8 py-4 whitespace-nowrap">
                        {order?.endDate
                          ? new Date(order.endDate).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "N/A"}
                      </td>

                      <td className="px-2 py-1 whitespace-nowrap">
                        {order?.WarehouseDetail?.rentOrSell ?? "N/A"}
                      </td>
                      <td className="px-8 py-4 whitespace-nowrap">
                        {order.WarehouseDetail.rentOrSell === "Rent" ? (
                          <p className="text-sm font-medium text-green-600">
                            {paidCount}/{totalCount}
                          </p>
                        ) : (
                          <p className="text-sm font-medium text-green-600">
                            {order.orderStatus === "Completed" ? (
                              <p>Paid</p>
                            ) : (
                              <p>{order.orderStatus}</p>
                            )}
                          </p>
                        )}
                      </td>
                      <td className="px-2 py-1 whitespace-nowrap">
                        <td className="px-8 py-4 whitespace-nowrap">
                          {order.WarehouseDetail.rentOrSell === "Rent" ? (
                            <p className="text-sm font-medium text-green-600">
                              {bmwPaidCount}/{totalCount}
                            </p>
                          ) : (
                            <p className="text-sm font-medium text-green-600">
                              {order.paymentFromBMWSold}
                            </p>
                          )}
                        </td>
                      </td>
                      <td className="px-8 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleRow(order._id)}
                          className="text-blue-600 hover:underline flex items-center"
                        >
                          {expandedRows.includes(order._id) ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </button>
                      </td>
                    </tr>
                    {expandedRows.includes(order._id) && (
                      <tr className="bg-gray-50">
                        <td colSpan={5} className="p-4">
                          <table className="w-full text-xs border border-gray-300 rounded">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="p-2 border">Month</th>
                                <th className="p-2 border">Amount</th>
                                <th className="p-2 border">
                                  User - BMW Payment
                                </th>
                                <th className="p-2 border">
                                  BMW - Partner Payment
                                </th>
                                <th className="p-2 border">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.WarehouseDetail.rentOrSell === "Rent" ? (
                                // For rent: Show monthly payments table
                                order.monthlyPayment.map((p, idx) => (
                                  <tr key={idx}>
                                    <td className="p-2 border">{p.month}</td>
                                    <td className="p-2 border">{p.amount}</td>
                                    <td className="p-2 border">
                                      {p.paymentStatus === "Paid"
                                        ? "✅ Paid"
                                        : "❌ Unpaid"}
                                    </td>
                                    <td className="p-2 border">
                                      {p.paymentForPartnerByBMW === "Paid"
                                        ? "✅ Paid"
                                        : "❌ Unpaid"}
                                    </td>
                                    <td className="p-2 border">
                                      {p.paymentStatus === "Paid" &&
                                        p.paymentForPartnerByBMW ===
                                          "Unpaid" && (
                                          <button
                                            className="px-2 py-1 bg-blue-500 text-white rounded"
                                            onClick={() =>
                                              openPayModal(
                                                order.orderId,
                                                p.month,
                                                order._id,
                                                bankdetails
                                              )
                                            }
                                          >
                                            Pay
                                          </button>
                                        )}
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                // For sell: Show single payment row
                                <tr>
                                  <td className="p-2 border">Full Payment</td>
                                  <td className="p-2 border">
                                    {order.totalPrice}
                                  </td>
                                  <td className="p-2 border">
                                    {order.orderStatus === "Completed"
                                      ? "✅ Paid"
                                      : "❌ Unpaid"}
                                  </td>
                                  <td className="p-2 border">
                                    {order.paymentFromBMWSold === "Paid"
                                      ? "✅ Paid"
                                      : "❌ Unpaid"}
                                  </td>
                                  <td className="p-2 border">
                                    {order.orderStatus === "Completed" &&
                                      order.paymentFromBMWSold === "Unpaid" && (
                                        <button
                                          className="px-2 py-1 bg-blue-500 text-white rounded"
                                          onClick={() =>
                                            openPayModal(
                                              order.orderId,
                                              "Full Payment",
                                              order._id,
                                              bankdetails
                                            )
                                          }
                                        >
                                          Pay
                                        </button>
                                      )}
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Pay Modal Stub */}
      {showPayModal && selectedPayment && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            {submissionStatus === "success" ? (
              <div className="text-center">
                <h2 className="text-lg font-bold mb-4 text-green-600">
                  Payment Successful
                </h2>
                <p>Payment was confirmed for {selectedPayment.month}.</p>
                <button
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={() => {
                    setShowPayModal(false);
                    setSelectedPayment(null);
                    setPaymentMethod("");
                    setUTR("");
                    setNotes("");
                    setSubmissionStatus("idle");
                  }}
                >
                  Close
                </button>
              </div>
            ) : submissionStatus === "error" ? (
              <div className="text-center">
                <h2 className="text-lg font-bold mb-4 text-red-600">
                  Payment Failed
                </h2>
                <p>{error}</p>
                <div className="mt-4 flex justify-center gap-2">
                  <button
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={() => setSubmissionStatus("idle")}
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-bold mb-4">
                  Pay Partner for {selectedPayment.month}
                </h2>
                <p>Order ID: {selectedPayment.orderId}</p>
                <p>Month: {selectedPayment.month}</p>
                <p>_ID: {selectedPayment._id} </p>
                <div className="mt-4 space-y-4">
                  {/* Bank Details Section */}
                  <div className="mt-6 border rounded p-4 bg-gray-50">
                    <h3 className="text-md font-semibold text-gray-700 mb-2">
                      Partner Bank Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
                      <div>
                        <span className="font-medium">Account Holder:</span>
                        <br />
                        {bankdetails[0]?.accountHolderName}
                      </div>
                      <div>
                        <span className="font-medium">Bank Name:</span>
                        <br />
                        {bankdetails[0]?.bankName}
                      </div>
                      <div>
                        <span className="font-medium">Account Number:</span>
                        <br />
                        {bankdetails[0]?.accountNumber}
                      </div>
                      <div>
                        <span className="font-medium">IFSC Code:</span>
                        <br />
                        {bankdetails[0]?.ifscCode}
                      </div>
                      <div>
                        <span className="font-medium">Branch Name:</span>
                        <br />
                        {bankdetails[0]?.branchName}
                      </div>
                      <div>
                        <span className="font-medium">Partner Email:</span>
                        <br />
                        {bankdetails[0]?.partnerId.email}
                      </div>
                    </div>
                  </div>
                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Payment Method
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="">Select Method</option>
                      <option value="IMPS">IMPS</option>
                      <option value="UPI">UPI</option>
                      <option value="NPTES">NPTES</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* UTR Input */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      UTR
                    </label>
                    <input
                      type="text"
                      value={UTR}
                      onChange={(e) => setUTR(e.target.value)}
                      className="w-full border rounded px-3 py-2"
                      placeholder="Enter UTR"
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Notes
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full border rounded px-3 py-2"
                      placeholder="Enter notes (optional)"
                    />
                  </div>

                  {/* Error */}
                  {error && <p className="text-red-600 text-sm">{error}</p>}
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={handlePaymentConfirm}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Confirm Pay"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentListings;
