"use client"
import Image from 'next/image';
import { useState } from 'react';
import { useAppointmentsData } from '../Appointments/useAppointmentsData';


interface StatCardProps {
  icon: string;
  title: string;
  value: string;
  description: string;
}

const statCards = [
  {
    icon: '/appointments_db.svg',
    title: 'APPOINTMENTS',
    value: '220',
    description: 'Total appointments',
    color: 'text-[#6C63FF]',
  },
  {
    icon: '/patients_db.svg',
    title: 'PATIENTS',
    value: '220',
    description: 'Total patients',
    color: 'text-[#C77DFF]',
  },
  {
    icon: '/consultation.svg',
    title: 'CONSULTATION',
    value: '220',
    description: 'Total consultations',
    color: 'text-[#38B000]',
  },
  {
    icon: '/insights 1.svg',
    title: 'INSIGHTS',
    value: '220',
    description: 'Total appointments',
    color: 'text-[#B5A800]',
  },
  {
    icon: '/analytics.svg',
    title: 'ANALYTICS',
    value: '220',
    description: 'Total appointments',
    color: 'text-[#3A86FF]',
  },
  {
    icon: '/credit-card.svg',
    title: 'PAYMENTS',
    value: '220',
    description: 'Total appointments',
    color: 'text-[#B22222]',
  },
  {
    icon: '/performance.svg',
    title: 'PERFORMANCE',
    value: '220',
    description: 'Total appointments',
    color: 'text-[#00897B]',
  },
  {
    icon: '/reference.svg',
    title: 'REFERRAL AND SOURCE TRACKING',
    value: '220',
    description: 'Total appointments',
    color: 'text-[#7C3AED]',
  },
];

const StatCard: React.FC<StatCardProps & { color: string }> = ({ icon, title, value, description, color }) => {
  return (
    <div
      style={{
        width: '220px',
        height: '250px',
        borderRadius: '40px',
        background: '#fafafa',
        boxShadow: '-4px -4px 16px 0px rgba(255,255,255,1), 8px 8px 18px 0px rgba(0,0,0,0.1)'
      }}
      className="flex flex-col items-center justify-center text-center border border-gray-200 "
    >
      <Image src={icon} alt={title} width={48} height={48} className={`mb-3 ${color}`} />
      <h3 className={`text-sm font-semibold uppercase mb-1 ${color}`}>{title}</h3>
      <p className="text-xs text-gray-600 mt-1">{description}</p>
      <p className="text-4xl font-bold text-black-900">{value}</p>
    </div>
  );
};

export default function DashboardContent() {
  const [activeTab, setActiveTab] = useState('TODAY');

  return (
    <div className="flex-grow p-0 flex flex-col space-y-8 h-full overflow-y-auto scrollbar-hide ml-0">
      <div
        className="flex justify-between items-center bg-white rounded-xl shadow-sm p-4 border "
        style={{ boxShadow: '-4px -4px 16px 0px rgba(255,255,255,1), 8px 8px 18px 0px rgba(0,0,0,0.1)' }}
      >
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
          <Image src="/Logo.svg" alt="User Avatar" width={35} height={35} className="rounded-full border border-green-700 mb-2" /> 
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 flex-grow ml-6">
        {statCards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
} 