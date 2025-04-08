import { useEffect, useState } from "react";
import TitleCard from "../../../components/TitleCard";

const API_URL = "https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Admin/subcriptions";
const PAGE_SIZE = 10;

function SubscriptionManagement() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const resp = await fetch(API_URL);
      if (!resp.ok) throw new Error(resp.status);
      const payload = await resp.json();

      if (payload?.value?.data) {
        setSubscriptions(payload.value.data);
      } else if (Array.isArray(payload.data)) {
        setSubscriptions(payload.data);
      } else if (Array.isArray(payload)) {
        setSubscriptions(payload);
      } else {
        console.warn("Unexpected format", payload);
        setSubscriptions([]);
      }
    } catch (err) {
      console.error(err);
      setSubscriptions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const getStatus = (endDate) => {
    const today = Date.now();
    const end = new Date(endDate).getTime();
    if (end < today) return "Expired";
    if (end - today < 7 * 24 * 60 * 60 * 1000) return "Expiring Soon";
    return "Active";
  };

  // pagination logic
  const totalPages = Math.ceil(subscriptions.length / PAGE_SIZE);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const pageData = subscriptions.slice(startIdx, endIdx);

  const goPrev = () => setCurrentPage(p => Math.max(1, p - 1));
  const goNext = () => setCurrentPage(p => Math.min(totalPages, p + 1));

  return (
    <TitleCard title="Subscription Management" topMargin="mt-2">
      <div className="overflow-x-auto w-full">
        <table className="table table-fixed w-full">
          <thead>
            <tr>
              <th>Email</th>
              <th>Full Name</th>
              <th>Membership Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center">
                  Loading…
                </td>
              </tr>
            ) : pageData.length ? (
              pageData.map((sub, i) => {
                const status = getStatus(sub.endDate);
                return (
                  <tr key={startIdx + i}>
                    <td>{sub.email}</td>
                    <td>{sub.fullName?.trim() || "—"}</td>
                    <td>{sub.membershipName}</td>
                    <td>
                      <span
                        className={`badge ${
                          status === "Active"
                            ? "badge-success"
                            : status === "Expiring Soon"
                            ? "badge-warning"
                            : "badge-error"
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No subscriptions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={goPrev}
          disabled={currentPage === 1}
          className="btn btn-sm"
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={goNext}
          disabled={currentPage === totalPages}
          className="btn btn-sm"
        >
          Next
        </button>
      </div>
    </TitleCard>
  );
}

export default SubscriptionManagement;
