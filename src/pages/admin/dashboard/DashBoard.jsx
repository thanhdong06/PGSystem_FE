import { useState } from "react";
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

const statsData = [
  {
    title: "Total Users",
    value: "345.7k",
    icon: <UserGroupIcon className="w-8 h-8" />,
    description: "Total registered users",
  },
  {
    title: "Total Revenue",
    value: "$3,454,500",
    icon: <CircleStackIcon className="w-8 h-8" />,
    description: "Lifetime revenue",
  },
  {
    title: "Total Members",
    value: "56.3k",
    icon: <UsersIcon className="w-8 h-8" />,
    description: "Total active members",
  },
  {
    title: "Total Blogs",
    value: "4,500",
    icon: <CreditCardIcon className="w-8 h-8" />,
    description: "Total blogs published",
  },
];

function Dashboard() {
  return (
    <>
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
