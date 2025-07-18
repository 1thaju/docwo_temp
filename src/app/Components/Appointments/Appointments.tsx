import Image from 'next/image';
import LineChart from '../Charts/LineCharts';
import PieChartStatus from '../Charts/PieChartStatus';

const stats = [
  {
    label: 'Total Appointments',
    value: '1,234',
    change: 12.5,
    changeText: '+12.5% from last month',
  },
  {
    label: 'Avg Consultation Time',
    value: '5.2 min',
    change: 8.2,
    changeText: '+8.2% from last month',
  },
  {
    label: 'Cancelled Appointments',
    value: '342',
    change: -6.2,
    changeText: '-6.2% from last month',
  },
  {
    label: 'Completed Appointments',
    value: '234',
    change: 18.5,
    changeText: '+18.5% from last month',
  },
  {
    label: 'Cancellation Rate',
    value: '8.5%',
    change: -8.2,
    changeText: '-8.2% from last month',
  },
  {
    label: 'Completion Rate',
    value: '94.2%',
    change: 18.2,
    changeText: '+18.2% from last month',
  },
];

export default function Appointments() {
  return (
    <div className="p-6">
      <div className="flex items-start justify-between mb-1">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Appointment Analytics</h1>
          <p className="text-gray-900 text-sm">Comprehensive insights for your appointment management</p>
        </div>
        <button className="flex items-center bg-black text-white px-4 py-2 rounded-lg text-sm font-medium gap-2">
          <Image src="/export.svg" alt="Export" width={18} height={18} />
          Export Data
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-200 mt-10">
        <span className="block text-xs font-semibold text-black-500 mb-4">Filters</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-black-500 mb-1" htmlFor="time-period">Time Period</label>
            <select id="time-period" className="border rounded-lg px-3 py-2 text-gray-700 focus:outline-none font-semibold text-xs border-none w-fit">
              <option>Today</option>
              <option>Yesterday</option>
              <option>Last Week</option>
              <option>Last Month</option>
              <option>Last Quarter</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-black-500 mb-1 " htmlFor="doctor">Doctor</label>
            <select id="doctor" className="border rounded-lg px-3 py-2 text-gray-700 focus:outline-none font-semibold text-xs border-none w-fit">
              <option>All Doctors</option>
              <option>Dr. Smith</option>
              <option>Dr. Jane</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-black-500 mb-1" htmlFor="source">Source</label>
            <select id="source" className="border  px-3 py-2 text-gray-700 focus:outline-none font-semibold text-xs border-none w-fit">
              <option>App</option>
              <option>Website</option>
              <option>Clinic</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, idx) => {
          const isPositive = stat.change > 0;
          return (
            <div key={stat.label} className={"bg-white rounded-sm p-4 shadow flex flex-col gap-2 border border-gray-200"}>
              <span className="text-xs font-semibold text-black-500">{stat.label}</span>
              <span className="text-2xl font-bold mt-5 text-black-500">{stat.value}</span>
              <span className={`text-xs flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                <Image src={isPositive ? '/in‌crement.svg' : '/decrement.svg'} alt={isPositive ? 'Up' : 'Down'} width={14} height={14} />
                {stat.changeText}
              </span>
            </div>
          );
        })}
      </div>

      {/* Analytics Section */}
      <div className="rounded-md p-2 mb-6">
        <div className="text-center text-gray-700 font-medium mb-2 bg-gray-200 rounded-sm">Analytics</div>
        <div className="bg-white rounded-xl p-4 mb-6 shadow border border-gray-200 pb-10">
          <div className="font-medium mb-2">Appointments Trends Over Time</div>
          <LineChart />
        </div>
        <div className="bg-white rounded-xl p-4 shadow border border-gray-200">
          <div className="font-medium mb-2">Appointment status</div>
          <PieChartStatus />
        </div>
      </div>
    </div>
  )
}


