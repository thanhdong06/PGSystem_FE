import React from "react";

const Chart = ({ growthData, standardGrowthData, viewMode, setViewMode, activeMetric, setActiveMetric }) => {
  const chartWidth = 1000;
  const chartHeight = 1000;
  const paddingX = 80;
  const paddingY = 80;
  const bottomPadding = 100;

  const displayData = growthData; // Dữ liệu của bé
  const referenceData = standardGrowthData; // Dữ liệu chuẩn

  // Tính toán giá trị tối đa và tối thiểu cho trục X và Y
  const maxWeek = Math.max(
    ...growthData.map((d) => d.week),
    ...standardGrowthData.map((d) => d.week),
    42
  );
  const minWeek = Math.min(
    ...growthData.map((d) => d.week),
    ...standardGrowthData.map((d) => d.week),
    8
  );

  const maxWeight = Math.max(
    ...growthData.map((d) => d.weight),
    ...standardGrowthData.map((d) => d.weight),
    222 // Đảm bảo chứa giá trị lớn nhất từ dữ liệu
  ) * 1.1;
  const maxHeight = Math.max(
    ...growthData.map((d) => d.height),
    ...standardGrowthData.map((d) => d.height),
    22.2 // Đảm bảo chứa giá trị lớn nhất từ dữ liệu
  ) * 1.1;

  const scaleX = (value) => {
    return paddingX + ((value - minWeek) / (maxWeek - minWeek)) * (chartWidth - paddingX * 2);
  };

  const scaleY = (value, metric) => {
    const maxValue = metric === "weight" ? maxWeight : maxHeight;
    return chartHeight - paddingY - bottomPadding - (value / maxValue) * (chartHeight - paddingY * 2 - bottomPadding);
  };

  const generateLinePath = (data, metric) => {
    return data
      .map((point, i) => {
        const x = scaleX(point.week);
        const y = scaleY(point[metric], metric);
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  };

  // Tạo vùng bóng cho dữ liệu chuẩn (shaded area)
  const generateShadedArea = (data, metric) => {
    const points = data.map((point) => ({
      x: scaleX(point.week),
      y: scaleY(point[metric], metric),
    }));

    if (points.length < 2) return "";

    const upperPoints = points.map((p) => `${p.x},${p.y - 10}`);
    const lowerPoints = points.map((p) => `${p.x},${p.y + 10}`).reverse();

    return `M ${upperPoints.join(" L ")} L ${lowerPoints.join(" L ")} Z`;
  };

  const generateXTicks = () => {
    const ticks = [];
    for (let week = 8; week <= 42; week += 4) {
      ticks.push(week);
    }
    return ticks;
  };

  // Tạo ticks cho trục Y với 20 đơn vị
  const generateYTicks = (metric) => {
    const maxValue = metric === "weight" ? maxWeight : maxHeight;
    const step = maxValue / 20; // Chia trục Y thành 20 đơn vị
    const ticks = [];
    for (let i = 0; i <= 20; i++) {
      ticks.push(Math.round(i * step));
    }
    return ticks;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between mb-6">
        <div>
          <span className="mr-3 text-lg font-medium text-gray-700">View by:</span>
          <button
            className={`px-4 py-2 mr-2 rounded-md transition-colors ${
              viewMode === "week" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setViewMode("week")}
          >
            Week
          </button>
        </div>
        <div>
          <button
            className={`px-4 py-2 mr-2 rounded-md transition-colors ${
              activeMetric === "weight" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveMetric("weight")}
          >
            Weight (g)
          </button>
          <button
            className={`px-4 py-2 rounded-md transition-colors ${
              activeMetric === "height" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveMetric("height")}
          >
            Height (cm)
          </button>
        </div>
      </div>

      <div className="relative flex justify-center overflow-hidden">
        <svg width={chartWidth} height={chartHeight} className="rounded-lg">
          {/* Grid lines */}
          {generateXTicks().map((tick) => (
            <line
              key={`grid-x-${tick}`}
              x1={scaleX(tick)}
              y1={paddingY}
              x2={scaleX(tick)}
              y2={chartHeight - paddingY - bottomPadding}
              stroke="#f0f0f0"
              strokeWidth="1"
            />
          ))}
          {generateYTicks(activeMetric).map((val) => (
            <line
              key={`grid-y-${activeMetric}-${val}`}
              x1={paddingX}
              y1={scaleY(val, activeMetric)}
              x2={chartWidth - paddingX}
              y2={scaleY(val, activeMetric)}
              stroke="#f0f0f0"
              strokeWidth="1"
            />
          ))}

          {/* Axes */}
          <line
            x1={paddingX}
            y1={chartHeight - paddingY - bottomPadding}
            x2={chartWidth - paddingX}
            y2={chartHeight - paddingY - bottomPadding}
            stroke="#333"
            strokeWidth="2"
          />
          <line
            x1={paddingX}
            y1={paddingY}
            x2={paddingX}
            y2={chartHeight - paddingY - bottomPadding}
            stroke="#333"
            strokeWidth="2"
          />

          {/* X-axis ticks and labels */}
          {generateXTicks().map((tick) => (
            <g key={`x-label-${tick}`}>
              <line
                x1={scaleX(tick)}
                y1={chartHeight - paddingY - bottomPadding}
                x2={scaleX(tick)}
                y2={chartHeight - paddingY - bottomPadding + 8}
                stroke="#333"
              />
              <text
                x={scaleX(tick)}
                y={chartHeight - paddingY - bottomPadding + 24}
                textAnchor="middle"
                fontSize="14"
                fill="#333"
              >
                {tick}
              </text>
            </g>
          ))}
          <text
            x={chartWidth / 2}
            y={chartHeight - 20}
            textAnchor="middle"
            fontSize="16"
            fontWeight="600"
            fill="#333"
          >
            Week of Pregnancy
          </text>

          {/* Y-axis ticks and labels */}
          {generateYTicks(activeMetric).map((val) => (
            <g key={`y-${activeMetric}-${val}`}>
              <line
                x1={paddingX - 8}
                y1={scaleY(val, activeMetric)}
                x2={paddingX}
                y2={scaleY(val, activeMetric)}
                stroke="#333"
              />
              <text
                x={paddingX - 12}
                y={scaleY(val, activeMetric) + 5}
                textAnchor="end"
                fontSize="12" // Giảm font size để tránh chồng lấn
                fill="#333"
              >
                {val}
              </text>
            </g>
          ))}
          <text
            x={30}
            y={chartHeight / 2 - bottomPadding / 2}
            textAnchor="middle"
            transform={`rotate(-90, 30, ${chartHeight / 2 - bottomPadding / 2})`}
            fontSize="16"
            fontWeight="600"
            fill="#333"
          >
            {activeMetric === "weight" ? "Weight (g)" : "Height (cm)"}
          </text>

          {/* Standard data (vẽ trước để dữ liệu bé nằm trên cùng) */}
          <path
            d={generateShadedArea(referenceData, activeMetric)}
            fill="#ff6384"
            fillOpacity="0.1"
          />
          <path
            d={generateLinePath(referenceData, activeMetric)}
            fill="none"
            stroke="#ff6384"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          {referenceData.map((point, i) => (
            <rect
              key={`standard-point-${i}`}
              x={scaleX(point.week) - 4}
              y={scaleY(point[activeMetric], activeMetric) - 4}
              width="8"
              height="8"
              fill="#ff6384"
              stroke="#fff"
              strokeWidth="1"
              transform={`rotate(45, ${scaleX(point.week)}, ${scaleY(point[activeMetric], activeMetric)})`}
            />
          ))}

          {/* User's data (vẽ sau để nằm trên cùng) */}
          <path
            d={generateLinePath(displayData, activeMetric)}
            fill="none"
            stroke={activeMetric === "weight" ? "#3b82f6" : "#10b981"}
            strokeWidth="3"
          />
          {displayData.map((point, i) => (
            <circle
              key={`user-point-${i}`}
              cx={scaleX(point.week)}
              cy={scaleY(point[activeMetric], activeMetric)}
              r="6"
              fill={activeMetric === "weight" ? "#3b82f6" : "#10b981"}
              stroke="#fff"
              strokeWidth="2"
            />
          ))}

          {/* Legend */}
          <g transform={`translate(${chartWidth - 200}, ${paddingY - 20})`}>
            <rect x="0" y="0" width="180" height="60" fill="#f9f9f9" rx="5" />
            <line x1="10" y1="20" x2="30" y2="20" stroke={activeMetric === "weight" ? "#3b82f6" : "#10b981"} strokeWidth="3" />
            <text x="35" y="25" fontSize="12">Your Baby</text>
            <line x1="10" y1="40" x2="30" y2="40" stroke="#ff6384" strokeWidth="2" strokeDasharray="5,5" />
            <text x="35" y="45" fontSize="12">Standard Growth</text>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Chart;