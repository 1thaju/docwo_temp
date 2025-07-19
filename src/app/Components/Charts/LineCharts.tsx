"use client";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  YAxis,
  Line,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Appointment } from '../Appointments/useAppointmentsData';

const data = [
  { date: "2024-01-01", Cancelled: 5, Completed: 60, "Total Appointment": 70 },
  { date: "2024-01-02", Cancelled: 4, Completed: 75, "Total Appointment": 80 },
  { date: "2024-01-03", Cancelled: 3, Completed: 72, "Total Appointment": 78 },
  { date: "2024-01-04", Cancelled: 2, Completed: 68, "Total Appointment": 74 },
  { date: "2024-01-05", Cancelled: 5, Completed: 80, "Total Appointment": 88 },
  { date: "2024-01-06", Cancelled: 6, Completed: 82, "Total Appointment": 90 },
  { date: "2024-01-07", Cancelled: 3, Completed: 70, "Total Appointment": 78 },
];

const legendStyle = {
  display: "flex",
  justifyContent: "center",
  gap: 24,
  marginTop: 8,
  fontSize: 15,
};

const legendItem = (color: string, label: string) => (
  <span style={{ display: "flex", alignItems: "center", gap: 4 }} key={label}>
    <span style={{ width: 12, height: 2, background: color, display: "inline-block", marginRight: 4 }} />
    <span style={{ color }}>{label}</span>
  </span>
);

interface LineChartProps {
  appointments?: Appointment[];
}

export default function CustomLineChart({ appointments }: LineChartProps) {
  // If appointments are provided, generate chart data dynamically
  let chartData = data;
  if (appointments && appointments.length > 0) {
    // Example: group by date and count statuses
    const grouped: Record<string, { Cancelled: number; Completed: number; 'Total Appointment': number }> = {};
    appointments.forEach((a: Appointment) => {
      // Assume a.date field exists; adjust as needed
      const date = (a as any).date || 'Unknown';
      if (!grouped[date]) grouped[date] = { Cancelled: 0, Completed: 0, 'Total Appointment': 0 };
      grouped[date]['Total Appointment']++;
      if (a.status === 'completed') grouped[date]['Completed']++;
      if (a.status && a.status.includes('cancelled')) grouped[date]['Cancelled']++;
    });
    chartData = Object.entries(grouped).map(([date, counts]) => ({ date, ...counts }));
  }
  return (
    <div style={{ width: "100%", height: 300, background: "#fff" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 10, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
          <XAxis
            dataKey="date"
            tick={{ fill: "#888", fontSize: 13 }}
            stroke="#e0e0e0"
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#888", fontSize: 13 }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="Cancelled"
            stroke="#ff3b3b"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="Completed"
            stroke="#4CAF50"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="Total Appointment"
            stroke="#b266ff"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      {/* Custom Legend at the bottom */}
      <div style={legendStyle}>
        {legendItem("#ff3b3b", "Cancelled")}
        {legendItem("#4CAF50", "Completed")}
        {legendItem("#b266ff", "Total Appointment")}
      </div>
    </div>
  );
}
