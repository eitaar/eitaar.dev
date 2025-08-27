import React from 'react';

interface PieSlice {
  name: string;
  value: number;
  color: string;
}

interface Props {
  data: PieSlice[];
  size?: number;
  showLabels?: boolean;
}

const PieChart: React.FC<Props> = ({ data, size = 300, showLabels = true }) => {
  // Sort data by value in descending order and take top 9 languages
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const top9Data = sortedData.slice(0, 9);

  // Calculate the total of all languages and top 9 languages
  const originalTotal = data.reduce((sum, d) => sum + d.value, 0);
  const top9Total = top9Data.reduce((sum, d) => sum + d.value, 0);

  // Scale up the top 9 languages to fill the entire circle
  // This redistributes the space that would have been occupied by languages 10+
  const scaleFactor = originalTotal / top9Total;
  const scaledData = top9Data.map((d) => ({
    ...d,
    value: d.value * scaleFactor,
  }));

  // Calculate total value and percentages for the scaled data
  const total = scaledData.reduce((sum, d) => sum + d.value, 0);
  const dataWithPercentages = scaledData.map((d, index) => ({
    ...d,
    percentage: (top9Data[index].value / originalTotal) * 100, // Use original percentage for display
    scaledPercentage: (d.value / total) * 100, // Keep scaled percentage for rendering
  }));

  // Chart dimensions
  const radius = size / 2 - 20;
  const center = size / 2;

  // Create path arcs and label positions
  let cumulative = 0;
  const slices = dataWithPercentages.map((d) => {
    const startAngle = (2 * Math.PI * cumulative) / total;
    cumulative += d.value;
    const endAngle = (2 * Math.PI * cumulative) / total;

    // Calculate arc path
    const [startX, startY] = [
      center + radius * Math.cos(startAngle),
      center + radius * Math.sin(startAngle),
    ];
    const [endX, endY] = [
      center + radius * Math.cos(endAngle),
      center + radius * Math.sin(endAngle),
    ];

    const largeArc = d.value / total > 0.5 ? 1 : 0;
    const pathData = `
      M ${center} ${center}
      L ${startX} ${startY}
      A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}
      Z
    `;

    // Calculate label position (middle of the slice)
    const midAngle = (startAngle + endAngle) / 2;
    const labelRadius = radius * 0.7;
    const labelX = center + labelRadius * Math.cos(midAngle);
    const labelY = center + labelRadius * Math.sin(midAngle);

    // Check if slice is large enough for label (more than 5% of original total)
    const showLabel = showLabels && d.percentage > 5;

    return {
      pathData,
      color: d.color,
      name: d.name,
      percentage: d.percentage,
      labelX,
      labelY,
      showLabel,
    };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-md">
      {/* Pie slices */}
      {slices.map((slice, index) => (
        <path
          key={`slice-${index}`}
          d={slice.pathData}
          fill={slice.color}
          className="cursor-pointer transition-opacity duration-200 hover:opacity-80"
        />
      ))}

      {/* Labels */}
      {slices.map((slice, index) =>
        slice.showLabel ? (
          <text
            key={`label-${index}`}
            x={slice.labelX}
            y={slice.labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            className="pointer-events-none fill-black text-sm font-semibold select-none"
          >
            {slice.percentage.toFixed(1)}%
          </text>
        ) : null
      )}
    </svg>
  );
};

export default PieChart;
