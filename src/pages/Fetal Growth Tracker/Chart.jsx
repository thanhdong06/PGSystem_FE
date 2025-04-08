import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceArea,
  ResponsiveContainer,
} from "recharts";

const Chart = ({
  growthData,
  standardGrowthData,
  viewMode,
  setViewMode,
  activeMetric,
  setActiveMetric,
}) => {
  const paddingX = 80;
  const paddingY = 80;
  const bottomPadding = 100;

  const combineData = () => {
    const map = new Map();
    standardGrowthData.forEach((p) =>
      map.set(p.week, {
        week: p.week,
        standardWeight: p.weight,
        standardHeight: p.height,
      })
    );
    growthData.forEach((p) => {
      const e = map.get(p.week) || { week: p.week };
      map.set(p.week, { ...e, babyWeight: p.weight, babyHeight: p.height });
    });
    return Array.from(map.values()).sort((a, b) => a.week - b.week);
  };
  const data = combineData();

  const weeks = data.map((d) => d.week);
  const minWeek = Math.min(8, ...weeks);
  const maxWeek = Math.max(42, ...weeks);
  const allWeights = data.flatMap((d) => [d.babyWeight, d.standardWeight].filter(Boolean));
  const allHeights = data.flatMap((d) => [d.babyHeight, d.standardHeight].filter(Boolean));
  const maxWeight = Math.max(...allWeights, 222) * 1.1;
  const maxHeight = Math.max(...allHeights, 22.2) * 1.1;

  const xTicks = [];
  for (let w = 8; w <= 42; w += 4) xTicks.push(w);

  const yTicks = (() => {
    const max = activeMetric === "weight" ? maxWeight : maxHeight;
    const step = max / 20;
    return Array.from({ length: 21 }, (_, i) => Math.round(i * step));
  })();

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {/* Controls */}
      <div className="flex justify-between mb-6 flex-wrap">
        <div className="mb-2 sm:mb-0">
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

      {/* Responsive Chart */}
      <div className="w-full" style={{ minHeight: 800 }}>
  <ResponsiveContainer width="100%" height={1100}>
          <LineChart
            data={data}
            margin={{
              top: paddingY,
              right: paddingX,
              left: paddingX,
              bottom: bottomPadding,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="week"
              type="number"
              domain={[minWeek, maxWeek]}
              ticks={xTicks}
              interval={0}
              label={{
                value: "Week of Pregnancy",
                position: "bottom",
                offset: 0,
                dy: 40,
              }}
            />
            <YAxis
              type="number"
              domain={[0, activeMetric === "weight" ? maxWeight : maxHeight]}
              ticks={yTicks}
              interval={0}
              label={{
                value: activeMetric === "weight" ? "Weight (g)" : "Height (cm)",
                angle: -90,
                position: "insideLeft",
                dx: -40,
              }}
            />
            <Tooltip
              formatter={(value, name) =>
                name.includes("Weight")
                  ? [`${value} g`, name === "babyWeight" ? "Your Baby" : "Baby"]
                  : [`${value} cm`, name === "babyHeight" ? "Your Baby" : "Standard"]
              }
              labelFormatter={(week) => `Week ${week}`}
            />
            <Legend
              verticalAlign="top"
              payload={[
                {
                  value: "Your Baby",
                  type: "line",
                  id: "baby",
                  color: activeMetric === "weight" ? "#3b82f6" : "#10b981",
                },
                { value: "Standard Growth", type: "line", id: "std", color: "#ff6384" },
              ]}
            />
            <ReferenceArea
              x1={minWeek}
              x2={maxWeek}
              y1={0}
              y2={activeMetric === "weight" ? maxWeight : maxHeight}
              fill="none"
            />
            <Line
              type="monotone"
              dataKey={activeMetric === "weight" ? "standardWeight" : "standardHeight"}
              stroke="#ff6384"
              strokeWidth={2}
              dot={{ r: 4, fill: "#ff6384", stroke: "#fff", strokeWidth: 1 }}
              strokeDasharray="5 5"
              name="Standard"
            />
            <Line
              type="monotone"
              dataKey={activeMetric === "weight" ? "babyWeight" : "babyHeight"}
              stroke={activeMetric === "weight" ? "#3b82f6" : "#10b981"}
              strokeWidth={3}
              dot={{
                r: 6,
                fill: activeMetric === "weight" ? "#3b82f6" : "#10b981",
                stroke: "#fff",
                strokeWidth: 2,
              }}
              activeDot={{ r: 8 }}
              name="Your Baby"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
