import { useState, useEffect } from "react";
import DashboardStats from "./components/DashboardStats";
import AmountStats from "./components/AmountStats";
import PageStats from "./components/PageStats";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarCharts";
import DoughnutChart from "./components/DoughnutChart";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import ShieldCheckIcon from "@heroicons/react/24/outline/ShieldCheckIcon";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch the data from the API
    const fetchReportData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Admin/Reports"
        );
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const result = await response.json();
        setReportData(result.value.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching report data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchReportData();

    // Set up interval to refresh data every 5 minutes (300000 ms)
    const intervalId = setInterval(fetchReportData, 300000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Early return for loading state
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading dashboard data...</div>;
  }

  // Early return for error state
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-600">
        <p>Error loading dashboard data: {error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  // Format date from API
  const formattedDate = reportData ? new Date(reportData.reportDate).toLocaleDateString() : "";

  // Prepare stats data with live API data
  const statsData = [
    {
      title: "Total Users",
      value: reportData?.totalUsers.toLocaleString() || "0",
      icon: <UserGroupIcon className="w-8 h-8" />,
      description: "Total registered users",
    },
    {
      title: "Total Admins",
      value: reportData?.totalAdmins.toLocaleString() || "0",
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      description: "System administrators",
    },
    {
      title: "Total Members",
      value: reportData?.totalMembers.toLocaleString() || "0",
      icon: <UsersIcon className="w-8 h-8" />,
      description: "Active members",
    },
    {
      title: "Total Transactions",
      value: reportData?.totalTransactions.toLocaleString() || "0",
      icon: <CreditCardIcon className="w-8 h-8" />,
      description: "Completed transactions",
    },
  ];

  return (
    <>
      {/* Report Date */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700">
          System Report - {formattedDate}
        </h2>
      </div>

      {/* Stats Overview */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
        {statsData.map((d, k) => (
          <DashboardStats key={k} {...d} colorIndex={k} />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <LineChart />
        <BarChart />
      </div>

      <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
        <AmountStats />
        <PageStats />
      </div>

      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <BarChart title="Pregnancy Weeks (Members)" isPregnancyChart={true} />
        <DoughnutChart />
      </div>
    </>
  );
}

export default Dashboard;