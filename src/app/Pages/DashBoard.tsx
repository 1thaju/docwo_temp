"use client"
import Sidebar from "../Components/Sidebar/Sidebar";
import DashboardContent from "../Components/DashboardContent/DashboardContent";
import Appointments from "../Components/Appointments/Appointments";
import Patients from "../Components/Patients/Patients";
import { useState } from "react";

export default function DashBoard() {
  const [activeLink, setActiveLink] = useState('Dashboard');

  return (
    <div className="w-screen h-screen flex bg-[#07613d] transition-all duration-300">
      <div className="w-[250px] h-full fixed left-0 top-0 z-10">
        <Sidebar activeLink={activeLink} onLinkClick={setActiveLink} />
      </div>

      
      <div className="ml-[264px] flex-grow h-full overflow-y-auto p-4">
        <div className="bg-white rounded-[40px] p-6 min-h-full">
          {activeLink === 'Dashboard' && <DashboardContent />}
          {activeLink === 'Patients' && <Patients />}
          {activeLink === 'Appointments' && <Appointments />}
          {/* Add more conditions for other tabs as needed */}
        </div>
      </div>
    </div>
  );
}
