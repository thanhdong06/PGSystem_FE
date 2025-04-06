import React from 'react';

const Chart = ({ growthData, standardGrowthData, viewMode, setViewMode, activeMetric, setActiveMetric }) => {
  const chartWidth = 1000;
  const chartHeight = 500;
  const paddingX = 80;
  const paddingY = 60;
  const bottomPadding = 80;
  
  const displayData = growthData; // User's data
  const referenceData = standardGrowthData; // Standard medical data

  // Adjust max values to account for both datasets
  const maxWeek = Math.max(
    ...growthData.map(d => d.week),
    ...standardGrowthData.map(d => d.week),
    42
  );
  const minWeek = Math.min(
    ...growthData.map(d => d.week),
    ...standardGrowthData.map(d => d.week),
    8
  );

  // Get maximum values from both datasets
  const maxWeight = Math.max(
    ...growthData.map(d => d.weight),
    ...standardGrowthData.map(d => d.weight)
  ) * 1.1;
  const maxHeight = Math.max(
    ...growthData.map(d => d.height),
    ...standardGrowthData.map(d => d.height)
  ) * 1.1;

  const scaleX = (value) => {
    return paddingX + ((value - minWeek) / (maxWeek - minWeek)) * (chartWidth - paddingX * 2);
  };

  const scaleY = (value, metric) => {
    const maxValue = metric === 'weight' ? maxWeight : maxHeight;
    return chartHeight - paddingY - bottomPadding - (value / maxValue) * (chartHeight - paddingY * 2 - bottomPadding);
  };

  const generateLinePath = (data, metric) => {
    return data.map((point, i) => {
      const x = scaleX(point.week);
      const y = scaleY(point[metric], metric);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  const generateXTicks = () => {
    const ticks = [];
    for (let week = 8; week <= 42; week += 4) {
      ticks.push(week);
    }
    return ticks;
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
          {/* Grid lines */}
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
          {(activeMetric === 'weight'
            ? [0, Math.round(maxWeight / 4), Math.round(maxWeight / 2), Math.round(maxWeight * 3 / 4), Math.round(maxWeight)]
            : [0, Math.round(maxHeight / 4), Math.round(maxHeight / 2), Math.round(maxHeight * 3 / 4), Math.round(maxHeight)]
          ).map(val => (
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
            Week of Pregnancy
          </text>

          {/* Y-axis ticks and labels */}
          {(activeMetric === 'weight'
            ? [0, Math.round(maxWeight / 4), Math.round(maxWeight / 2), Math.round(maxWeight * 3 / 4), Math.round(maxWeight)]
            : [0, Math.round(maxHeight / 4), Math.round(maxHeight / 2), Math.round(maxHeight * 3 / 4), Math.round(maxHeight)]
          ).map(val => (
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

          {/* User's data line and points */}
          <path
            d={generateLinePath(displayData, activeMetric)}
            fill="none"
            stroke={activeMetric === 'weight' ? "#3b82f6" : "#10b981"}
            strokeWidth="3"
          />
          {displayData.map((point, i) => (
            <circle
              key={`user-point-${i}`}
              cx={scaleX(point.week)}
              cy={scaleY(point[activeMetric], activeMetric)}
              r="6"
              fill={activeMetric === 'weight' ? "#3b82f6" : "#10b981"}
              stroke="#fff"
              strokeWidth="2"
            />
          ))}

          {/* Standard data line and points */}
          <path
            d={generateLinePath(referenceData, activeMetric)}
            fill="none"
            stroke="#ff6384"
            strokeWidth="3"
            strokeDasharray="5,5" // Makes it dashed
          />
          {referenceData.map((point, i) => (
            <circle
              key={`standard-point-${i}`}
              cx={scaleX(point.week)}
              cy={scaleY(point[activeMetric], activeMetric)}
              r="4"
              fill="#ff6384"
              stroke="#fff"
              strokeWidth="1"
            />
          ))}

          {/* Legend */}
          <g transform={`translate(${chartWidth - 200}, ${paddingY - 20})`}>
            <rect x="0" y="0" width="180" height="60" fill="#f9f9f9" rx="5" />
            <line x1="10" y1="20" x2="30" y2="20" stroke="#3b82f6" strokeWidth="3" />
            <text x="35" y="25" fontSize="12">Your Baby</text>
            <line x1="10" y1="40" x2="30" y2="40" stroke="#ff6384" strokeWidth="3" strokeDasharray="5,5" />
            <text x="35" y="45" fontSize="12">Standard Growth</text>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Chart;