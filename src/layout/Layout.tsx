import { Outlet } from "react-router-dom";
import DashboardFooter from "../components/dashboard/DashboardFooter";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import SideBar from "../components/dashboard/SideBar";

const Layout: React.FC = () => {
  return (
    <div className="font-open_sauce min-h-screen">
      <div className="flex h-screen flex-row"> {/* h-screen */}
        <SideBar />
        <div className="flex-1 bg-background pb-[100px] overflow-hidden ml-[244px]">
          <DashboardNavbar />
          <div className="overflow-y-scroll h-full pb-[40px]">
            <Outlet />
          </div>
        </div>
      </div>
      <DashboardFooter />
    </div>
  );
};

export default Layout;
