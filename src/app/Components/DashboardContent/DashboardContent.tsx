"use client"
import Image from 'next/image';
import { useState } from 'react';
import Charts from '../Charts/Charts';

interface StatCardProps {
  icon: string;
  title: string;
  value: string;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, description }) => {
  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-md min-h-40">
      <Image src={icon} alt={title} width={70} height={70} className="mb-3 border border-red-500" />
      <h3 className="text-sm font-semibold uppercase text-gray-500 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
      <p className="text-xs text-gray-400 mt-1">{description}</p>
    </div>
  );
};

export default function DashboardContent() {
  const [activeTab, setActiveTab] = useState('TODAY');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex-grow bg-[#f0f2f5] rounded-4xl p-6 flex flex-col space-y-8 h-full">
      
       <div className="flex justify-between items-center bg-white rounded-xl  shadow-sm">
        <div className="flex space-x-4 font-medium">
          <button 
            className={`h-full px-4 py-2 rounded-lg ${activeTab === 'TODAY' ? 'bg-[#07613d] text-white' : 'text-[#006F4C] hover:bg-gray-100'}`}
            onClick={() => handleTabClick('TODAY')}
          >
            TODAY
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${activeTab === 'LAST WEEK' ? 'bg-[#07613d] text-white' : 'text-[#006F4C] hover:bg-gray-100'}`}
            onClick={() => handleTabClick('LAST WEEK')}
          >
            LAST WEEK
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${activeTab === 'LAST MONTH' ? 'bg-[#07613d] text-white' : 'text-[#006F4C] hover:bg-gray-100'}`}
            onClick={() => handleTabClick('LAST MONTH')}
          >
            LAST MONTH
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${activeTab === 'CUSTOM' ? 'bg-[#07613d] text-white' : 'text-[#006F4C] hover:bg-gray-100'}`}
            onClick={() => handleTabClick('CUSTOM')}
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
      {/*

      <div className="grid grid-cols-4 gap-6 flex-grow">
        <StatCard icon="/Logo.svg" title="APPOINTMENTS" value="220" description="Total appointments" />
        <StatCard icon="/Logo.svg" title="PATIENTS" value="220" description="Total patients" />
        <StatCard icon="/Logo.svg" title="CONSULTATION" value="220" description="Total consultations" />
        <StatCard icon="/Logo.svg" title="INSIGHTS" value="220" description="Total appointments" />
        <StatCard icon="/Logo.svg" title="ANALYTICS" value="220" description="Total appointments" />
        <StatCard icon="/Logo.svg" title="PAYMENTS" value="220" description="Total appointments" />
        <StatCard icon="/Logo.svg" title="PERFORMANCE" value="220" description="Total appointments" />
        <StatCard icon="/Logo.svg" title="REFERRAL AND SOURCE TRACKING" value="220" description="Total appointments" />
      </div>*/}
      <Charts className = "w-full"/>
    </div> 
  );
} 