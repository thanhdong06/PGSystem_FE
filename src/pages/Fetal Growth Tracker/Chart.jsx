// Chart.jsx
import React from 'react';

const Chart = ({ growthData, weeklyData, viewMode, setViewMode, activeMetric, setActiveMetric }) => {
  // Tăng kích thước biểu đồ để hiển thị rõ ràng hơn
  const chartWidth = 1000;
  const chartHeight = 500;
  const paddingX = 80;
  const paddingY = 60;
  const bottomPadding = 80;

  // Chọn dữ liệu hiển thị tùy theo chế độ xem (week hoặc day)
  const displayData = viewMode === 'week' ? weeklyData : growthData;

  const maxDay = viewMode === 'day' ? Math.max(...growthData.map(d => d.day), 294) : 0;
  const minDay = viewMode === 'day' ? Math.min(...growthData.map(d => d.day), 56) : 0;

  const maxWeek = viewMode === 'week' ? Math.max(...displayData.map(d => d.week), 42) : 0;
  const minWeek = viewMode === 'week' ? Math.min(...displayData.map(d => d.week), 8) : 0;

  // Tính giá trị tối đa cho weight và height (không đổi thành length)
  const maxWeight = Math.max(...displayData.map(d => d.weight)) * 1.1;
  const maxHeight = Math.max(...displayData.map(d => d.height)) * 1.1;

  // Hàm scaleX chuyển đổi giá trị theo trục X
  const scaleX = (value) => {
    if (viewMode === 'day') {
      return paddingX + ((value - minDay) / (maxDay - minDay)) * (chartWidth - paddingX * 2);
    } else {
      return paddingX + ((value - minWeek) / (maxWeek - minWeek)) * (chartWidth - paddingX * 2);
    }
  };

  // Hàm scaleY chuyển đổi giá trị theo trục Y dựa trên activeMetric
  // Nếu activeMetric không phải 'weight', ta dùng maxHeight (chứ không phải maxLength)
  const scaleY = (value, metric) => {
    const maxValue = metric === 'weight' ? maxWeight : maxHeight;
    return chartHeight - paddingY - bottomPadding - (value / maxValue) * (chartHeight - paddingY * 2 - bottomPadding);
  };

  // Sinh đường path cho biểu đồ
  const generateLinePath = (data, metric) => {
    return data
      .map((point, i) => {
        const x = viewMode === 'day' ? scaleX(point.day) : scaleX(point.week);
        const y = scaleY(point[metric], metric);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  };

  // Sinh các giá trị tick trên trục X dựa theo chế độ xem
  const generateXTicks = () => {
    if (viewMode === 'day') {
      const ticks = [];
      for (let day = 56; day <= 294; day += 28) {
        ticks.push(day);
      }
      return ticks;
    } else {
      const ticks = [];
      for (let week = 8; week <= 42; week += 4) {
        ticks.push(week);
      }
      return ticks;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between mb-6">
        <div>
          <span className="mr-3 text-lg font-medium text-gray-700">View by:</span>
          <button
            className={`px-4 py-2 mr-2 rounded-md transition-colors ${viewMode === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setViewMode('week')}
          >
            Week
          </button>
          <button
            className={`px-4 py-2 rounded-md transition-colors ${viewMode === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setViewMode('day')}
          >
            Day
          </button>
        </div>
        
        <div>
          <button
            className={`px-4 py-2 mr-2 rounded-md transition-colors ${activeMetric === 'weight' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveMetric('weight')}
          >
            Weight (g)
          </button>
          <button
            className={`px-4 py-2 rounded-md transition-colors ${activeMetric === 'height' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveMetric('height')}
          >
            Height (cm)
          </button>
        </div>
      </div>
      
      <div className="relative flex justify-center overflow-hidden">
        <svg width={chartWidth} height={chartHeight} className="rounded-lg">
          {/* Grid lines X */}
          {generateXTicks().map(tick => (
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
          {/* Grid lines Y */}
          {activeMetric === 'weight'
            ? [0, Math.round(maxWeight / 4), Math.round(maxWeight / 2), Math.round(maxWeight * 3 / 4), Math.round(maxWeight)].map(val => (
                <line
                  key={`grid-y-weight-${val}`}
                  x1={paddingX}
                  y1={scaleY(val, 'weight')}
                  x2={chartWidth - paddingX}
                  y2={scaleY(val, 'weight')}
                  stroke="#f0f0f0"
                  strokeWidth="1"
                />
              ))
            : [0, Math.round(maxHeight / 4), Math.round(maxHeight / 2), Math.round(maxHeight * 3 / 4), Math.round(maxHeight)].map(val => (
                <line
                  key={`grid-y-height-${val}`}
                  x1={paddingX}
                  y1={scaleY(val, 'height')}
                  x2={chartWidth - paddingX}
                  y2={scaleY(val, 'height')}
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
          {/* X axis labels */}
          {generateXTicks().map(tick => (
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
            {viewMode === 'day' ? 'Day of Pregnancy' : 'Week of Pregnancy'}
          </text>
          {/* Y axis labels */}
          {activeMetric === 'weight'
            ? [0, Math.round(maxWeight / 4), Math.round(maxWeight / 2), Math.round(maxWeight * 3 / 4), Math.round(maxWeight)].map(val => (
                <g key={`y-weight-${val}`}>
                  <line
                    x1={paddingX - 8}
                    y1={scaleY(val, 'weight')}
                    x2={paddingX}
                    y2={scaleY(val, 'weight')}
                    stroke="#333"
                  />
                  <text
                    x={paddingX - 12}
                    y={scaleY(val, 'weight') + 5}
                    textAnchor="end"
                    fontSize="14"
                    fill="#333"
                  >
                    {val}
                  </text>
                </g>
              ))
            : [0, Math.round(maxHeight / 4), Math.round(maxHeight / 2), Math.round(maxHeight * 3 / 4), Math.round(maxHeight)].map(val => (
                <g key={`y-height-${val}`}>
                  <line
                    x1={paddingX - 8}
                    y1={scaleY(val, 'height')}
                    x2={paddingX}
                    y2={scaleY(val, 'height')}
                    stroke="#333"
                  />
                  <text
                    x={paddingX - 12}
                    y={scaleY(val, 'height') + 5}
                    textAnchor="end"
                    fontSize="14"
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
            {activeMetric === 'weight' ? 'Weight (g)' : 'Height (cm)'}
          </text>
          {/* Data path */}
          <path
            d={generateLinePath(displayData, activeMetric)}
            fill="none"
            stroke={activeMetric === 'weight' ? "#3b82f6" : "#10b981"}
            strokeWidth="3"
          />
          {/* Data points */}
          {displayData.map((point, i) => (
            <g key={`point-${i}`}>
              <circle
                cx={viewMode === 'day' ? scaleX(point.day) : scaleX(point.week)}
                cy={scaleY(point[activeMetric], activeMetric)}
                r="6"
                fill={activeMetric === 'weight' ? "#3b82f6" : "#10b981"}
                stroke="#fff"
                strokeWidth="2"
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default Chart;
