import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useRef } from "react";
import TitleCard from "../../../../components/TitleCard";

// 🔥 Đăng ký `ArcElement` để Doughnut Chart hoạt động
ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart() {
  const chartRef = useRef(null); // Ref để quản lý instance của biểu đồ

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy(); // Hủy bỏ biểu đồ khi component bị unmount
      }
    };
  }, []);

  const labels = ["Health", "Pregnancy", "Nutrition", "Fitness", "Parenting"];

  const data = {
    labels,
    datasets: [
      {
        label: "Blog Categories",
        data: [122, 219, 130, 251, 182],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
        ],
      },
    ],
  };

  return (
    <TitleCard title="Blog Categories">
      <Doughnut ref={chartRef} data={data} />
    </TitleCard>
  );
}

export default DoughnutChart;
