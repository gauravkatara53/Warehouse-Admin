import { useState, useEffect } from "react";
import StatusTag from "../../../../Components/Customers/StatusTag";
import Pagination from "../../../../Components/Common/Pagination/Pagination";
import FilterBar from "../FilterBar/Filterbar";
import apiService from "@/Components/APIService/apiService";
import ClipLoader from "react-spinners/ClipLoader";

interface User {
  _id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  profileStatus: string;
  date: string;
  gender: string;
  lastActive: string;
  dob: string;
  createdAt: string;
  positionNumber: number;
}

interface UserDataProps {
  onSelectUser: (user: User) => void;
}

const UserData = ({ onSelectUser }: UserDataProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedKYCStatus, setSelectedKYCStatus] = useState<
    "completed" | "Not completed" | null
  >(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedOrderType, setSelectedOrderType] = useState<string | null>(
    null
  );
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const usersPerPage = 5;

  // Fetch all users from the API
  useEffect(() => {
    const fetchAllUsers = async () => {
      setLoading(true);
      let page = 1;
      let fetchedUsers: User[] = [];
      let totalFetchedUsers = 0;

      try {
        // Loop to fetch all pages of users
        do {
          const response = await apiService.get<{
            data: User[];
            page: number;
            pages: number;
            pageSize: number;
            total: number;
          }>(`/admin/users/all-users?page=${page}&pageSize=${usersPerPage}`);

          if (response && response.data) {
            const formattedData = response.data.map((user) => ({
              ...user,
              date: user.createdAt
                ? new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(user.createdAt))
                : "N/A",
            }));
            fetchedUsers = [...fetchedUsers, ...formattedData];
            totalFetchedUsers = response.total;
            page++;
          }
        } while (page <= Math.ceil(totalFetchedUsers / usersPerPage));

        setAllUsers(fetchedUsers);
      } catch (error) {
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  // Filter users from the full dataset
  const filteredUsers = allUsers.filter((user) => {
    const matchesDate = selectedDate ? user.date === selectedDate : true;
    const matchesKYCStatus = selectedKYCStatus
      ? user.profileStatus?.toLowerCase() === selectedKYCStatus.toLowerCase()
      : true;

    const matchesSearchQuery =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);

    return matchesDate && matchesKYCStatus && matchesSearchQuery;
  });

  const sortFilteredUsers = (users: User[]) => {
    if (!selectedOrderType) return users;

    const sortedUsers = [...users];
    if (selectedOrderType === "A-Z") {
      sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedOrderType === "Z-A") {
      sortedUsers.sort((a, b) => b.name.localeCompare(a.name));
    } else if (selectedOrderType === "1-50") {
      // Sort by display ID (1, 2, 3...) based on the order they appear in the sorted users
      sortedUsers.sort((a, b) => {
        const indexA = allUsers.findIndex((u) => u._id === a._id);
        const indexB = allUsers.findIndex((u) => u._id === b._id);
        return indexA - indexB; // Ascending order based on original position
      });
    } else if (selectedOrderType === "50-1") {
      // Sort by display ID (1, 2, 3...) in reverse order
      sortedUsers.sort((a, b) => {
        const indexA = allUsers.findIndex((u) => u._id === a._id);
        const indexB = allUsers.findIndex((u) => u._id === b._id);
        return indexB - indexA; // Descending order based on original position
      });
    }

    return sortedUsers;
  };

  const sortedUsers = sortFilteredUsers(filteredUsers);

  // Get users for the current page
  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      <FilterBar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedKYCStatus={selectedKYCStatus}
        setSelectedKYCStatus={setSelectedKYCStatus}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedOrderType={selectedOrderType}
        setSelectedOrderType={setSelectedOrderType}
      />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border">
            <tr>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                ID
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                NAME
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                ADDRESS
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                NUMBER
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                EMAIL ID
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                PROFILE STATUS
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                DATE
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-6">
                  <ClipLoader size={50} color={"#4FD1C5"} loading={loading} />
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user) => (
                <tr
                  key={user._id}
                  onClick={() => onSelectUser(user)}
                  className="bg-white border-b cursor-pointer"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {/* Calculate the ID based on the user's original position in allUsers */}
                    {allUsers.findIndex((u) => u._id === user._id) + 1}
                  </th>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.name || "N/A"}
                  </td>
                  <td className="px-6 py-4">{user.address || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.phone || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.email || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusTag
                      status={
                        user.profileStatus as "completed" | "Not completed"
                      }
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.date || "N/A"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPages={Math.ceil(sortedUsers.length / usersPerPage)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default UserData;
