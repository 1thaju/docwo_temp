import Sidebar from "../Components/Sidebar/Sidebar";
import DashboardContent from "../Components/DashboardContent/DashboardContent";
import Charts from "../Components/Charts/Charts";

export default function DashBoard() {
  return (
    <div className="w-screen h-screen bg-[#07613d] p-4 flex flex-row ">
      <Sidebar />
      <div className="ml-[32px] flex-grow"> {/* Added margin-left and flex-grow for DashboardContent wrapper */}
        <DashboardContent />
      </div>
    </div>
  );
} 