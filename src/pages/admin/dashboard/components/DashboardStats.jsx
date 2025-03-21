function DashboardStats({ title, icon, value, description, colorIndex }) {
  const COLORS = ["text-blue-500", "text-red-500"]; // Định nghĩa màu Tailwind hợp lệ

  const getDescStyle = () => {
    if (description.includes("↗︎")) return "font-bold text-green-700 dark:text-green-300";
    else if (description.includes("↙")) return "font-bold text-rose-500 dark:text-red-400";
    else return "text-gray-500";
  };

  return (
    <div className="stats shadow bg-transparent"> {/* 🔥 Đặt nền trong suốt */}
      <div className="stat">
        <div className={`stat-figure text-base-content ${COLORS[colorIndex % COLORS.length]}`}>
          {icon}
        </div>

        <div className="stat-title text-base-content">{title}</div>

        <div className={`stat-value text-base-content ${COLORS[colorIndex % COLORS.length]}`}>
          {value}
        </div>

        <div className={"stat-desc " + getDescStyle()}>{description}</div>
      </div>
    </div>
  );
}

export default DashboardStats;
