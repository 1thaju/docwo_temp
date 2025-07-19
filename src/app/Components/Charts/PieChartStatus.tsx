"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Appointment } from '../Appointments/useAppointmentsData';

const data = [
  { name: "Completed", value: 45, color: "#4CAF50" },
  { name: "Cancelled", value: 15, color: "#7D6DC2" },
  { name: "Upcoming", value: 40, color: "#DFBE7F" },
];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
  index?: number;
}) => {
  const RADIAN = Math.PI / 180;
  const radius = (outerRadius ?? 0) * 1.15;
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
      {`${data[index ?? 0].name} ${data[index ?? 0].value}%`}
    </text>
  );
};

interface PieChartStatusProps {
  appointments?: Appointment[];
}

export default function PieChartStatus({ appointments }: PieChartStatusProps) {
  let pieData = data;
  if (appointments && appointments.length > 0) {
    const completed = appointments.filter(a => a.status === 'completed').length;
    const cancelled = appointments.filter(a => a.status && a.status.includes('cancelled')).length;
    const upcoming = appointments.length - completed - cancelled;
    pieData = [
      { name: 'Completed', value: completed, color: '#4CAF50' },
      { name: 'Cancelled', value: cancelled, color: '#7D6DC2' },
      { name: 'Upcoming', value: upcoming, color: '#DFBE7F' },
    ];
  }
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            innerRadius={0}
            dataKey="value"
            isAnimationActive={false}
            stroke="#fff"
            strokeWidth={3}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
} 