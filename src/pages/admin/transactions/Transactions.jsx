import { useEffect, useState } from "react";
import moment from "moment";
import TitleCard from "../../../components/TitleCard";

// Define status filters instead of membership filters
const statusFilters = ["All", "Success", "Pending", "Failed"];

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        setLoading(true);
        
        // Real API call using the endpoint you provided
        const response = await fetch(
          "https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Admin/Transactions",
          {
            headers: {
              "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIzNSIsInVuaXF1ZV9uYW1lIjoiMDk2Njg4Nzc5OSIsInJvbGUiOiJBZG1pbiIsInRva2VuVHlwZSI6ImFjY2VzcyIsIm5iZiI6MTc0MzUwMjE2MSwiZXhwIjoxNzQzNTAzOTYxLCJpYXQiOjE3NDM1MDIxNjEsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTEzNSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJ9.5XUZL2vy3t3WThZziO3ckQCDAQ554wlY-o6yjICd7tQ"
            }
          }
        );
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const fetchedTransactions = await response.json();
        
        // Process the fetched data to match our component's expected format
        // We're fetching member information from the API response
        const processedTransactions = fetchedTransactions.map(transaction => ({
          id: transaction.transactionID,
          memberID: transaction.memberID,
          // Assuming member might be null, we handle that case
          name: transaction.member?.name || `Member #${transaction.memberID}`,
          email: transaction.member?.email || "N/A",
          amount: transaction.amount,
          status: transaction.status,
          date: moment(transaction.transactionDate).format("D MMM YYYY"),
          fullDate: transaction.transactionDate
        }));
        
        setTransactions(processedTransactions);
        setAllTransactions(processedTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    
    // Adjust the search to match the fields in your real data
    setTransactions(
      allTransactions.filter(
        (t) =>
          (t.email && t.email.toLowerCase().includes(value)) ||
          (t.name && t.name.toLowerCase().includes(value)) ||
          t.memberID.toString().includes(value) ||
          t.id.toString().includes(value)
      )
    );
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    setSelectedFilter(value);
    
    if (value === "All") {
      setTransactions(allTransactions);
    } else {
      // Filter by transaction status instead of membership type
      setTransactions(
        allTransactions.filter((t) => t.status === value)
      );
    }
  };

  return (
    <TitleCard title="Recent Transactions" topMargin="mt-2">
      {/* Error display */}
      {error && (
        <div className="alert alert-error mb-4">
          <div className="flex-1">
            <label>{error}</label>
          </div>
        </div>
      )}
      
      {/* Search & Filter aligned with title */}
      <div className="flex gap-4 justify-end mb-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by ID/member..."
          value={searchText}
          onChange={handleSearch}
          className="input input-sm input-bordered w-full max-w-xs"
        />

        {/* Select Filter */}
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
              <th>Amount</th>
              <th>Status</th>
              <th>Transaction Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((t) => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>
                    <div>
                      <div className="font-bold">{t.name}</div>
                      <div className="text-sm opacity-50">{t.email}</div>
                      <div className="text-xs opacity-50">ID: {t.memberID}</div>
                    </div>
                  </td>
                  <td>${t.amount.toLocaleString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        t.status === "Success"
                          ? "badge-success"
                          : t.status === "Failed"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td title={moment(t.fullDate).format("YYYY-MM-DD HH:mm:ss")}>
                    {t.date}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
}

export default Transactions;