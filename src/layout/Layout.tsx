import { Outlet } from "react-router-dom";
import DashboardFooter from "../components/dashboard/DashboardFooter";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import SideBar from "../components/dashboard/SideBar";
import { useEffect, useState } from "react";

const Layout: React.FC = () => {

  const [openSideBar, setOpenSideBar] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setOpenSideBar(true);
      } else {
        setOpenSideBar(false);
      }
    };

    handleResize(); // call once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="font-open_sauce min-h-screen">
      <div className="flex h-screen flex-row"> {/* h-screen */}
        {openSideBar &&
          <SideBar onClickOutside={() => { setOpenSideBar(false) }} />
        }
        <div className="flex-1 bg-background overflow-hidden lg:ml-[244px]">
          <DashboardNavbar openSideBar={() => { setOpenSideBar(true) }} />
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
