"use client"
import Image from 'next/image';
import { useState } from 'react';

interface SidebarLinkProps {
  icon: string;
  text: string;
  isActive?: boolean;
  onClick: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ icon, text, isActive, onClick }) => {
  return (
    <div 
      className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer ${
        isActive 
          ? 'bg-white text-[#07613d]'
          : 'text-white hover:bg-[#1a4a35]'
      }`}
      onClick={onClick} 
    >
      <Image src={icon} alt={text} width={20} height={20} className={`${isActive ? '' : 'filter invert'}`} />
      <span className={`text-lg font-medium ${isActive ? 'text-[#07613d]' : 'text-white'}`}>{text}</span>
    </div>
  );
};

export default function Sidebar() {
  const [activeLink, setActiveLink] = useState('Dashboard');

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <div className="w-[280px] h-full bg-[#07613d] p-5 flex flex-col space-y-3">
      <div className="flex items-center space-x-3 mb-8">
        <Image src="/Logo.svg" alt="DOCWO Logo" width={30} height={30} />
        <span className="text-white text-2xl font-bold">DOCWO</span>
      </div>
      <SidebarLink icon="/dashboard.svg" text="Dashboard" isActive={activeLink === 'Dashboard'} onClick={() => handleLinkClick('Dashboard')} />
      <SidebarLink icon="/Appointments.svg" text="Appointments" isActive={activeLink === 'Appointments'} onClick={() => handleLinkClick('Appointments')} />
      <SidebarLink icon="/Doctor.svg" text="Doctors" isActive={activeLink === 'Doctors'} onClick={() => handleLinkClick('Doctors')} />
      <SidebarLink icon="/payments.svg" text="Payments" isActive={activeLink === 'Payments'} onClick={() => handleLinkClick('Payments')} />
      <div className="flex-grow"></div> {/* Spacer to push settings and logout to bottom */}
      <SidebarLink icon="/settings.svg" text="Settings" isActive={activeLink === 'Settings'} onClick={() => handleLinkClick('Settings')} />
      <SidebarLink icon="/sign-out.svg" text="Logout" isActive={activeLink === 'Logout'} onClick={() => handleLinkClick('Logout')} />
    </div>
  );
} 