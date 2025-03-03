import { useState } from "react";
import { RxOpenInNewWindow } from "react-icons/rx";
import { FiSearch } from "react-icons/fi";
import { CiBoxList } from "react-icons/ci";
import { IoGridOutline } from "react-icons/io5";
import InventryTableRow from "../../components/dashboard/InventryTableRow";
import { Link } from "react-router-dom";
import { GoUpload } from "react-icons/go";

type LayoutType = "list" | "grid";

export default function Inventory() {
  const [tab, setTab] = useState<number>(0);
  const [layout, setLayout] = useState<LayoutType>("list");

  return (
    <section className="lg:h-[401px] flex lg:flex-row flex-col-reverse gap-5">
      <div className="lg:w-[80%] h-[457px] lg:h-auto w-full bg-white rounded-3xl overflow-hidden shadow py-9 lg:px-8 px-4">
        <div className="flex items-center justify-between mb-5 lg:mb-0">
          <div className="flex items-center lg:gap-2">
            <p className="text-[15px] font-bold leading-[18px]">My Inventory</p>
            <button className="border-none outline-none text-[#B0B0B0] text-lg">
              <RxOpenInNewWindow />
            </button>
          </div>
          <div className="hidden lg:flex gap-6">
            <button
              onClick={() => setTab(0)}
              className={`${tab === 0
                ? "text-accent border-accent font-semibold"
                : "text-primary_black border-transparent"
                } py-4 border-b-2 transition-all duration-200 ease-linear text-xs`}
            >
              All (0)
            </button>
            <button
              onClick={() => setTab(1)}
              className={`${tab === 1
                ? "text-accent border-accent font-semibold"
                : "text-primary_black border-transparent"
                } py-4 border-b-2 transition-all duration-200 ease-linear text-xs`}
            >
              Photos
            </button>
            <button
              onClick={() => setTab(2)}
              className={`${tab === 2
                ? "text-accent border-accent font-semibold"
                : "text-primary_black border-transparent"
                } py-4 border-b-2 transition-all duration-200 ease-linear text-xs`}
            >
              Videos
            </button>
            <button
              onClick={() => setTab(3)}
              className={`${tab === 3
                ? "text-accent border-accent font-semibold"
                : "text-primary_black border-transparent"
                } py-4 border-b-2 transition-all duration-200 ease-linear text-xs`}
            >
              Illustrations
            </button>
            <div className="flex items-center">
              <div className="h-[20%] w-[1px] bg-[#B0B0B0]"></div>
              <button
                onClick={() => setTab(4)}
                className={`${tab === 4
                  ? "text-accent border-accent font-semibold"
                  : "text-primary_black border-transparent"
                  } py-4 px-3 border-b-2 transition-all duration-200 ease-linear text-xs`}
              >
                Collections
              </button>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="text-[10px] rounded-full border border-primary_black outline-none pl-8 pr-2 py-2"
            />
            <div className="absolute top-1/2 -translate-y-1/2 left-3">
              <FiSearch />
            </div>
          </div>
        </div>
        <div className="bg-primary_black w-full h-[1px] mb-5"></div>
        <div className="flex items-center justify-between mb-3">
          {/* sort by */}
          <div className="flex items-center text-[8px]">
            <p className="text-[#535353]">Sort by :</p>
            <select
              name="sort"
              id="sort"
              className="font-medium outline-none border-none"
            >
              <option value="last-added">Last Added</option>
            </select>
          </div>
          {/* layout */}
          <div className="flex items-center text-[8px]">
            <p className="text-[#535353]">Layout : &nbsp;</p>
            <div className="flex gap-1">
              <button
                onClick={() => setLayout("grid")}
                className={`${layout === "grid" && "text-accent"
                  } outline-none border-none`}
              >
                <IoGridOutline size={15} />
              </button>
              <button
                onClick={() => setLayout("list")}
                className={`${layout === "list" && "text-accent"
                  } outline-none border-none`}
              >
                <CiBoxList size={15} />
              </button>
            </div>
          </div>
        </div>
        {/* table */}
        <div
          // className={`${
          //   layout === "grid" ? "grid grid-cols-2 gap-5" : ""
          // } overflow-y-scroll h-full pb-[85px] pr-5 duration-200 transition-all ease-linear`}
          className="text-center"
        >
          {/* {Array.from({ length: 20 }, (_, i) => (
            <InventryTableRow key={i} />
          ))} */}
          No assets in inventory
          <button className="outline-none rounded-full border border-black m-auto mt-2 flex items-center px-3 py-1 gap-1">
            <GoUpload size={20} />
            <Link to={"/uploads"}>
              <p className="font-medium text-[15px]">Upload</p>
            </Link>
          </button>
        </div>
      </div>
      <div
        style={{
          background: `url('https://images.unsplash.com/photo-1518882570151-157128e78fa1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
        className="lg:w-[20%] w-full h-[340px] lg:h-auto bg-white rounded-3xl overflow-hidden shadow relative grid justify-center place-items-end"
      >
        <div className="z-10 px-5 py-10">
          <div className="absolute top-5 right-5 cursor-pointer">
            <RxOpenInNewWindow color="#fff" />
          </div>
          <p className="text-[35px] text-white font-bold text-center leading-[42px]">
            Your top 5 sellers
          </p>
        </div>
        <div className="absolute bg-[#00000051] top-0 bottom-0 left-0 ring-0 w-full h-full"></div>
      </div>
    </section>
  );
}
