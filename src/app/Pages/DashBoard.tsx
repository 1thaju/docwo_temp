"use client"
import Sidebar from "../Components/Sidebar/Sidebar";
import DashboardContent from "../Components/DashboardContent/DashboardContent";
import Appointments from "../Components/Appointments/Appointments";
import { useState } from "react";

export default function DashBoard() {
  const [activeLink, setActiveLink] = useState('Dashboard');

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#07613d] flex flex-row overflow-hidden">
      <Sidebar activeLink={activeLink} onLinkClick={setActiveLink} />
      <div className="flex-grow flex">
        <div className="bg-white rounded-[40px] mt-2 mr-2 p-4 w-full h-[calc(100vh-2rem)] overflow-y-auto">
          {activeLink === 'Dashboard' && <DashboardContent />}
          {activeLink === 'Appointments' && <Appointments />}
          {/* Add more conditions for other tabs as needed */}
        </div>
      </div>
    </div>
  );
} 