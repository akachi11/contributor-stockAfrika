import React, { useEffect, useRef } from "react";
import { MdGroups } from "react-icons/md";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { BsGraphUp } from "react-icons/bs";
import { PiUploadSimple } from "react-icons/pi";
import { TfiWallet } from "react-icons/tfi";
import { RxDashboard } from "react-icons/rx";
import defaultdp from "../../assets/defaultdp.jpg";
import { getuser } from "../../services/AuthServices";

interface SidebarLink {
  id: number;
  name: string;
  icon: JSX.Element;
  link: string;
}

interface SideBarProps {
  onClickOutside: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ onClickOutside }) => {
  const user = getuser();
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const sidebarLink: SidebarLink[] = [
    { id: 0, name: "Dashboard", icon: <RxDashboard size={20} />, link: "/dashboard" },
    { id: 1, name: "Wallet", icon: <TfiWallet size={20} />, link: "/wallet" },
    { id: 2, name: "Uploads", icon: <PiUploadSimple size={20} />, link: "/uploads/dashboard" },
    { id: 3, name: "Insights", icon: <BsGraphUp size={20} />, link: "/insights" },
    { id: 5, name: "Community", icon: <MdGroups size={20} />, link: "/community" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        window.innerWidth < 1024 && // mobile only
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClickOutside]);

  return (
    <>
      {/* Mobile-only backdrop */}
      <div className="fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm lg:hidden"></div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed top-0 left-0 z-20 h-screen w-[244px] bg-accent text-white shadow-2xl font-inter pb-[80px] flex flex-col 
        animate-slideIn lg:animate-none"
      >
        <div className="grid justify-center pt-[45px] w-full">
          <div className="w-full flex flex-col">
            <Link to="/">
              <div className="w-[173px] h-[26px] overflow-hidden mb-[71px]">
                <img className="w-full h-full" src={logo} alt="Logo" />
              </div>
            </Link>
            <div className="grid place-items-center mb-[72px]">
              <div className="w-[100px] h-[100px] rounded-full overflow-hidden mb-3">
                <img
                  className="w-full h-full object-cover"
                  src={user?.image || defaultdp}
                  alt="Contributor"
                />
              </div>
              <div>
                <p className="text-2xl font-medium leading-8">{user?.user?.full_name}</p>
                <p className="text-[10px] leading-[12px] tracking-[90%] font-semibold text-center">
                  -ALPHA-
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <ul>
            {sidebarLink.map((link) => (
              <NavLink
                key={link.id}
                to={link.link}
                className={({ isActive }) =>
                  `flex py-3 pl-10 items-center gap-2 w-full relative duration-200 ease-linear transition-all ${isActive
                    ? "bg-[#d5b298] text-white shadow-sm"
                    : "hover:bg-[#d5b29854] text-white"
                  }`
                }
              >
                {link.icon}
                <p className="text-lg font-medium">{link.name}</p>
                <div className="absolute h-[20px] w-[3px] bg-accent left-3"></div>
              </NavLink>
            ))}
          </ul>
        </div>

        <div className="pl-10 absolute bottom-10">
          <Link to="/help" className="text-[15px] font-medium">
            Help & Support
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideBar;
