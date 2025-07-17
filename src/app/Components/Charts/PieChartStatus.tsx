"use client";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Completed", value: 78, color: "#4CAF50" },
  { name: "No show", value: 8, color: "#5B6CFF" },
  { name: "Cancelled", value: 14, color: "#FF6B6B" },
];

const renderCustomizedLabel = (
  {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }: {
    cx?: number;
    cy?: number;
    midAngle?: number;
    innerRadius?: number;
    outerRadius?: number;
    percent?: number;
    index?: number;
  }
) => {
  const RADIAN = Math.PI / 180;
  const radius = (innerRadius ?? 0) + ((outerRadius ?? 0) - (innerRadius ?? 0)) * 1.2;
  const x = (cx ?? 0) + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = (cy ?? 0) + radius * Math.sin(-(midAngle ?? 0) * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill={data[index ?? 0].color}
      textAnchor={x > (cx ?? 0) ? "start" : "end"}
      dominantBaseline="central"
      fontSize={16}
      fontWeight={400}
    >
      {`${data[index ?? 0].name} - ${data[index ?? 0].value}%`}
    </text>
  );
};

export default function PieChartStatus() {
  return (
    <div style={{ width: "100%", height: 300, background: "#f0f2f5", borderRadius: 24, marginTop: 20}}>
      {/* <h2 style={{ fontSize: 22, fontWeight: 500, margin: 0, padding: "16px 0 0 16px" }}>
        Appointment status distribution
      </h2> */}
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={90}
            innerRadius={60}
            dataKey="value"
            isAnimationActive={false}
            style={{
                fontSize: 1,
            }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
} 