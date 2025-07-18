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
      className={`flex items-center space-x-3 p-3 rounded-xl rounded-r-none cursor-pointer ${
        isActive 
          ? 'bg-white text-[#07613d]'
          : 'text-white hover:bg-[#1a4a35]'
      }`}
      onClick={onClick} 
    >
      <Image
        src={icon}
        alt={text}
        width={20}
        height={20}
        className={`transition-transform duration-200 ${
          isActive
            ? 'filter invert(34%) sepia(93%) saturate(1381%) hue-rotate(112deg) brightness(90%) contrast(90%)'
            : 'filter invert'
        }`}
      />
      <span className={`text-lg font-medium ${isActive ? 'text-[#07613d]' : 'text-white'}`}>{text}</span>
    </div>
  );
};

interface SidebarProps {
  activeLink: string;
  onLinkClick: (link: string) => void;
}

export default function Sidebar({ activeLink, onLinkClick }: SidebarProps) {
  return (
    <div className="w-[280px] h-full bg-[#07613d] pl-5 pr-0 pt-5 pb-5 flex flex-col space-y-3 ">
      <div className="flex items-center space-x-3 mb-8">
        <Image src="/Logo.svg" alt="DOCWO Logo" width={30} height={30} />
        <span className="text-white text-2xl font-bold">DOCWO</span>
      </div>
      <SidebarLink icon="/dashboard.svg" text="Dashboard" isActive={activeLink === 'Dashboard'} onClick={() => onLinkClick('Dashboard')} />
      <SidebarLink icon="/Appointments.svg" text="Appointments" isActive={activeLink === 'Appointments'} onClick={() => onLinkClick('Appointments')} />
      <SidebarLink icon="/Doctor.svg" text="Doctors" isActive={activeLink === 'Doctors'} onClick={() => onLinkClick('Doctors')} />
      <SidebarLink icon="/payments.svg" text="Payments" isActive={activeLink === 'Payments'} onClick={() => onLinkClick('Payments')} />
      <div className="flex-grow"></div> {/* Spacer to push settings and logout to bottom */}
      <SidebarLink icon="/settings.svg" text="Settings" isActive={activeLink === 'Settings'} onClick={() => onLinkClick('Settings')} />
      <SidebarLink icon="/sign-out.svg" text="Logout" isActive={activeLink === 'Logout'} onClick={() => onLinkClick('Logout')} />
    </div>
  );
} 