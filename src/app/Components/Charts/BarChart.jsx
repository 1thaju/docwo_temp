"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function DoctorAppointmentBarChart() {
  const data = [
    { doctor: "Dr. Ayesha", "Total Appointments": 45, "Canceled Appointments": 5 },
    { doctor: "Dr. Rahul", "Total Appointments": 60, "Canceled Appointments": 4 },
    { doctor: "Dr. Meena", "Total Appointments": 35, "Canceled Appointments": 2 },
    { doctor: "Dr. John", "Total Appointments": 50, "Canceled Appointments": 6 },
    { doctor: "Dr. Priya", "Total Appointments": 40, "Canceled Appointments": 3 },
    { doctor: "Dr. Varun", "Total Appointments": 70, "Canceled Appointments": 5 },
    { doctor: "Dr. Anita", "Total Appointments": 55, "Canceled Appointments": 4 },
  ];

  return (
    <div style={{ width: 700 , height: 300, background: "#f9f9f9", borderRadius: 16, padding: 16 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="doctor" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="Total Appointments" fill="#4F46E5" radius={[4, 4, 0, 0]} />
          {/* <Bar dataKey="Canceled Appointments" fill="#EF4444" radius={[4, 4, 0, 0]} /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
