import Sidebar from "../Components/Sidebar/Sidebar";
import DashboardContent from "../Components/DashboardContent/DashboardContent";


export default function DashBoard() {
  return (
    <div className="w-screen h-screen bg-[#07613d] pt-4 pr-4 flex flex-row ">
      <Sidebar />
      <div className="ml-[32px] flex-grow"> 
        <DashboardContent />
      </div>
    </div>
  );
} 