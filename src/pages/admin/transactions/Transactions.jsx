import { useEffect, useState } from "react";
import moment from "moment";
import TitleCard from "../../../components/TitleCard";

const membershipFilters = ["All", "Basic", "Premium", "VIP"];

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        setLoading(true);
        // Simulated API data
        const fetchedTransactions = [
          {
            name: "Alex",
            email: "alex@dashwind.com",
            membershipType: "Basic",
            date: moment().format("D MMM"),
          },
          {
            name: "Ereena",
            email: "ereena@dashwind.com",
            membershipType: "Premium",
            date: moment().add(-1, "d").format("D MMM"),
          },
          {
            name: "John",
            email: "john@dashwind.com",
            membershipType: "VIP",
            date: moment().add(-2, "d").format("D MMM"),
          },
        ];
        setTransactions(fetchedTransactions);
        setAllTransactions(fetchedTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    setTransactions(
      allTransactions.filter(
        (t) =>
          t.email.toLowerCase().includes(value) ||
          (t.name && t.name.toLowerCase().includes(value))
      )
    );
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    setSelectedFilter(value);
    if (value === "All") {
      setTransactions(allTransactions);
    } else {
      setTransactions(
        allTransactions.filter((t) => t.membershipType === value)
      );
    }
  };

  return (
    <TitleCard title="Recent Transactions" topMargin="mt-2">
      {/* Search & Filter aligned with title */}
      <div className="flex gap-4 justify-end mb-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name/email..."
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
          {membershipFilters.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Membership Type</th>
              <th>Transaction Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              transactions.map((t, index) => (
                <tr key={index}>
                  <td>{t.name}</td>
                  <td>{t.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        t.membershipType === "VIP"
                          ? "badge-warning"
                          : t.membershipType === "Premium"
                          ? "badge-success"
                          : "badge-info"
                      }`}
                    >
                      {t.membershipType}
                    </span>
                  </td>
                  <td>{t.date}</td>
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
