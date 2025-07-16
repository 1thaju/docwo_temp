"use client"
import {LineChart , CartesianGrid , XAxis , Tooltip , YAxis , Legend , Line} from 'recharts'
export default function Charts() {
    const data = [
        { date: "Dec 24, 2024", value: 55 },
        { date: "Dec 25, 2024", value: 25 },
        { date: "Dec 26, 2024", value: 70 },
        { date: "Dec 27, 2024", value: 75 },
        { date: "Dec 28, 2024", value: 50 },
        { date: "Dec 29, 2024", value: 60 },
        { date: "Dec 30, 2024", value: 85 },
        { date: "Dec 31, 2024", value: 105 },
        { date: "Jan 1, 2025", value: 45 },
        { date: "Jan 2, 2025", value: 58 },
        { date: "Jan 6, 2025", value: 48 },
        { date: "Jan 7, 2025", value: 60 },
        { date: "Jan 10, 2025", value: 47 },
        { date: "Jan 15, 2025", value: 58 },
        { date: "Jan 14, 2025", value: 58 },
        { date: "Jan 11, 2025", value: 58 },
        { date: "Jan 12, 2025", value: 58 },
        { date: "Jan 28, 2025", value: 58 },
        { date: "Jan 25, 2025", value: 58 },
        { date: "Jan 22, 2025", value: 58 },
        { date: "Jan 20, 2025", value: 58 },
      ]
  return (
    <div>
     <LineChart width={730} height={250} data={data}
       margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis dataKey="date" />
      {/* <YAxis /> */}
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#4CAF50" strokeWidth={2} dot={false} />
      </LineChart>
    </div>
  )
}


