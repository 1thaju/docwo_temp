"use client";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  YAxis,
  Line,
  ResponsiveContainer,
} from "recharts";

export default function Charts() {
  const data = [
    { date: "Dec 24, 2024", "Total Appointments": 55, "Canceled Appointments": 5 },
    { date: "Dec 25, 2024", "Total Appointments": 25, "Canceled Appointments": 2 },
    { date: "Dec 26, 2024", "Total Appointments": 70, "Canceled Appointments": 8 },
    { date: "Dec 27, 2024", "Total Appointments": 75, "Canceled Appointments": 6 },
    { date: "Dec 28, 2024", "Total Appointments": 50, "Canceled Appointments": 3 },
    { date: "Dec 29, 2024", "Total Appointments": 60, "Canceled Appointments": 7 },
    { date: "Dec 30, 2024", "Total Appointments": 85, "Canceled Appointments": 10 },
    { date: "Dec 31, 2024", "Total Appointments": 105, "Canceled Appointments": 12 },
    { date: "Jan 1, 2025", "Total Appointments": 45, "Canceled Appointments": 4 },
    { date: "Jan 2, 2025", "Total Appointments": 58, "Canceled Appointments": 5 },
    { date: "Jan 6, 2025", "Total Appointments": 48, "Canceled Appointments": 2 },
    { date: "Jan 7, 2025", "Total Appointments": 60, "Canceled Appointments": 6 },
    { date: "Jan 10, 2024", "Total Appointments": 47, "Canceled Appointments": 3 },
    { date: "Jan 15, 2024", "Total Appointments": 58, "Canceled Appointments": 5 },
    { date: "Jan 14, 2024", "Total Appointments": 58, "Canceled Appointments": 4 },
    { date: "Jan 11, 2024", "Total Appointments": 58, "Canceled Appointments": 6 },
    { date: "Jan 12, 2024", "Total Appointments": 58, "Canceled Appointments": 5 },
    { date: "Jan 28, 2024", "Total Appointments": 58, "Canceled Appointments": 7 },
    { date: "Jan 25, 2024", "Total Appointments": 58, "Canceled Appointments": 3 },
    { date: "Jan 22, 2024", "Total Appointments": 58, "Canceled Appointments": 4 },
    { date: "Jan 20, 2024", "Total Appointments": 58, "Canceled Appointments": 5 },
  ];

  return (
    <div style={{ width: "100%", height: 300 }}>
      {/* Custom Legend */}
      <div style={{ display: "flex", gap: 20, marginBottom: 10 }}>
        <span style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              width: 10,
              height: 10,
              backgroundColor: "#4CAF50",
              borderRadius: "50%",
              display: "inline-block",
              marginRight: 6,
            }}
          ></span>
          <span style={{ color: "black", fontSize: 13 }}>Total Appointments</span>
        </span>

        <span style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              width: 10,
              height: 10,
              backgroundColor: "#ff0000",
              borderRadius: "50%",
              display: "inline-block",
              marginRight: 6,
            }}
          ></span>
          <span style={{ color: "black", fontSize: 13 }}>Canceled Appointments</span>
        </span>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
          <XAxis
            dataKey="date"
            tick={{ fill: "#666", fontSize: 12 }}
            interval={3}
            stroke="#e0e0e0"
          />
          <YAxis
            orientation="left"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#666", fontSize: 10 }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="Total Appointments"
            stroke="#4CAF50"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="Canceled Appointments"
            stroke="#ff0000"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
