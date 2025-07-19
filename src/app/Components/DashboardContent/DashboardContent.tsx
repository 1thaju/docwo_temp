"use client"
import Image from 'next/image';
import { useState } from 'react';
import LineChart from '../Charts/LineCharts';

import PieChartStatus from '../Charts/PieChartStatus';
import  BarChart  from '../Charts/BarChart';
import { useAppointmentsData } from '../Appointments/useAppointmentsData';


interface StatCardProps {
  icon: string;
  title: string;
  value: string;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, description }) => {
  return (
    <div className="bg-[#ebebeb] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-md min-h-40 shadow-custom-shadow">
      <Image src={icon} alt={title} width={70} height={70} className="mb-3 border border-red-500" />
      <h3 className="text-sm font-semibold uppercase text-gray-500 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
      <p className="text-xs text-gray-400 mt-1">{description}</p>
    </div>
  );
};

export default function DashboardContent() {
  const [activeTab, setActiveTab] = useState('TODAY');
  const { appointments, loading, error } = useAppointmentsData();

  // Compute stats from appointments
  const totalAppointments = appointments.length;
  const completed = appointments.filter(a => a.status === 'completed').length;
  const cancelled = appointments.filter(a => a.status && a.status.includes('cancelled')).length;
  const avgConsultTime = '-'; // Placeholder, depends on backend data
  const cancellationRate = totalAppointments ? ((cancelled / totalAppointments) * 100).toFixed(1) + '%' : '-';
  const completionRate = totalAppointments ? ((completed / totalAppointments) * 100).toFixed(1) + '%' : '-';

  // Example: pass appointments to charts for dynamic rendering
  // (You will need to refactor the chart components to accept and use this prop)

  return (
    <div className="flex-grow p-0 flex flex-col space-y-8 h-full overflow-y-auto scrollbar-hide ml-0">
      
       <div className="flex justify-between items-center bg-white rounded-xl  shadow-sm">
        <div className="flex space-x-4 font-medium">
          <button 
            className={`h-full px-4 py-2 rounded-lg ${activeTab === 'TODAY' ? 'bg-[#07613d] text-white' : 'text-[#006F4C] hover:bg-gray-100'}`}
            onClick={() => setActiveTab('TODAY')}
          >
            TODAY
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${activeTab === 'LAST WEEK' ? 'bg-[#07613d] text-white' : 'text-[#006F4C] hover:bg-gray-100'}`}
            onClick={() => setActiveTab('LAST WEEK')}
          >
            LAST WEEK
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${activeTab === 'LAST MONTH' ? 'bg-[#07613d] text-white' : 'text-[#006F4C] hover:bg-gray-100'}`}
            onClick={() => setActiveTab('LAST MONTH')}
          >
            LAST MONTH
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${activeTab === 'CUSTOM' ? 'bg-[#07613d] text-white' : 'text-[#006F4C] hover:bg-gray-100'}`}
            onClick={() => setActiveTab('CUSTOM')}
          >
            CUSTOM
          </button>
        </div>
        <div className="flex items-end space-x-3 justify-end p-1 font-light mr-3">
            <div className='flex flex-col align-end'>      
          <span className="text-green-700 font-medium">Ajmal Ashrudheen</span>
          <span className="text-gray-500 text-sm flex justify-end">Admin</span>
            </div>
          <Image src="/Logo.svg" alt="User Avatar" width={35} height={35} className="rounded-full border border-red-500 mb-2" /> 
        </div>
      </div>

      {loading && <div className="my-8 text-center text-gray-500">Loading appointments...</div>}
      {error && <div className="my-8 text-center text-red-500">{error}</div>}

      <div className="grid grid-cols-4 gap-6 flex-grow">
        <StatCard icon="/Logo.svg" title="APPOINTMENTS" value={String(totalAppointments)} description="Total appointments" />
        <StatCard icon="/Logo.svg" title="COMPLETED" value={String(completed)} description="Completed appointments" />
        <StatCard icon="/Logo.svg" title="CANCELLED" value={String(cancelled)} description="Cancelled appointments" />
        <StatCard icon="/Logo.svg" title="CANCELLATION RATE" value={String(cancellationRate)} description="Cancellation rate" />
        <StatCard icon="/Logo.svg" title="COMPLETION RATE" value={String(completionRate)} description="Completion rate" />
        {/* Add more StatCards as needed, using dynamic data */}
      </div>
      <div className="bg-white rounded-2xl p-10 shadow-md shadow-custom-shadow w-full">
        <LineChart appointments={appointments} />
        <PieChartStatus appointments={appointments} />
        <BarChart appointments={appointments} />
      </div>
    </div> 
  );
} 