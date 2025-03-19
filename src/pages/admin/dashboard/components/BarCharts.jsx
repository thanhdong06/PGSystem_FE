import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useRef } from "react";
import TitleCard from "../../../../components/TitleCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({ title = "Users vs Members", isPregnancyChart = false }) {
  const chartRef = useRef(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const labels = isPregnancyChart
    ? ["1 Week", "4 Weeks", "8 Weeks", "12 Weeks", "16 Weeks", "20+ Weeks"]
    : ["January", "February", "March", "April", "May", "June", "July"];

  const datasets = [
    {
      label: isPregnancyChart ? "Pregnant Members" : "Users",
      data: labels.map(() => Math.floor(Math.random() * 1000 + 500)),
      backgroundColor: "rgba(255, 99, 132, 1)",
    },
  ];

  if (!isPregnancyChart) {
    datasets.push({
      label: "Total Members",
      data: labels.map(() => Math.floor(Math.random() * 1200 + 700)),
      backgroundColor: "rgba(53, 162, 235, 1)",
    });
  }

  const data = {
    labels,
    datasets,
  };

  return (
    <TitleCard title={title}>
      <Bar ref={chartRef} data={data} />
    </TitleCard>
  );
}

export default BarChart;
