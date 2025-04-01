import { useEffect, useState } from "react";
import moment from "moment";
import TitleCard from "../../../components/TitleCard";

// Status filters for membership
const statusFilters = ["All", "Active", "Expired", "Pending"];

function MembersWithMembership() {
  const [members, setMembers] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Get token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token not found. Please log in again.");
        }

        // Fetch membership data
        const membershipResponse = await fetch(
          "https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Admin/with-membership",
          {
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!membershipResponse.ok) {
          throw new Error(`Membership API error: ${membershipResponse.status}`);
        }
        const membershipData = await membershipResponse.json();

        // Fetch users data
        const usersResponse = await fetch(
          "https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Admin/Users",
          {
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!usersResponse.ok) {
          throw new Error(`Users API error: ${usersResponse.status}`);
        }
        const usersData = await usersResponse.json();

        // Build a mapping from uid to fullName.
        // If usersData is an array of user objects:
        const userMapping = {};
        if (Array.isArray(usersData)) {
          usersData.forEach((user) => {
            userMapping[user.uid] = user.fullName;
          });
        } else {
          // If usersData is a single user object, adjust accordingly.
          userMapping[usersData.uid] = usersData.fullName;
        }

        // Process membership data and include fullName from the users API based on userId/uid
        const processedMembers = membershipData.map((member) => ({
          id: member.memberID || member.id,
          // Get the fullName from userMapping using member.userId,
          // fall back to member.userName or 'N/A' if not available.
          fullName: userMapping[member.userId] || member.userName || "N/A",
          email: member.email || "N/A",
          phoneNumber: member.phoneNumber || "N/A",
          membershipType: member.membershipName || "None",
          // Assuming a field `status` exists. Otherwise, adjust according to your API.
          status: member.status || "No Membership",
          startDate: member.startDate
            ? moment(member.startDate).format("D MMM YYYY")
            : "N/A",
          endDate: member.endDate
            ? moment(member.endDate).format("D MMM YYYY")
            : "N/A",
          // Store raw dates if needed for sorting/filtering
          rawStartDate: member.startDate,
          rawEndDate: member.endDate,
        }));

        setMembers(processedMembers);
        setAllMembers(processedMembers);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    // Search by name, email, phone, ID or membership type
    setMembers(
      allMembers.filter(
        (m) =>
          m.fullName.toLowerCase().includes(value) ||
          m.email.toLowerCase().includes(value) ||
          m.phoneNumber.toLowerCase().includes(value) ||
          m.id.toString().includes(value) ||
          m.membershipType.toLowerCase().includes(value)
      )
    );
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    setSelectedFilter(value);
    if (value === "All") {
      setMembers(allMembers);
    } else {
      // Filter by membership status
      setMembers(allMembers.filter((m) => m.status === value));
    }
  };

  // Helper function for status badge styling
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Active":
        return "badge-success";
      case "Expired":
        return "badge-error";
      case "Pending":
        return "badge-warning";
      default:
        return "badge-ghost";
    }
  };

  return (
    <TitleCard title="Members with Membership" topMargin="mt-2">
      {error && (
        <div className="alert alert-error mb-4">
          <div className="flex-1">
            <label>{error}</label>
          </div>
        </div>
      )}

      {/* Search & Filter */}
      <div className="flex gap-4 justify-end mb-4">
        <input
          type="text"
          placeholder="Search by name/email/phone..."
          value={searchText}
          onChange={handleSearch}
          className="input input-sm input-bordered w-full max-w-xs"
        />
        <select
          value={selectedFilter}
          onChange={handleFilter}
          className="select select-bordered select-sm"
        >
          {statusFilters.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Member</th>
              <th>Membership</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : members.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No members with membership found
                </td>
              </tr>
            ) : (
              members.map((m) => (
                <tr key={m.id}>
                  <td>{m.id}</td>
                  <td>
                    <div>
                      <div className="font-bold">{m.fullName}</div>
                      <div className="text-sm opacity-50">{m.email}</div>
                      <div className="text-xs opacity-50">{m.phoneNumber}</div>
                    </div>
                  </td>
                  <td>{m.membershipType}</td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(m.status)}`}>
                      {m.status}
                    </span>
                  </td>
                  <td>{m.startDate}</td>
                  <td>{m.endDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
}

export default MembersWithMembership;
