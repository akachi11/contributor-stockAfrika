import { useEffect, useState } from "react";
import { RxOpenInNewWindow } from "react-icons/rx";
import { FiInfo, FiSearch, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { GoUpload } from "react-icons/go";
import { getToken, getuser } from "../../services/AuthServices";
import axios from "axios";
import { Stock } from "../../types";
import InventoryTableRow from "../../components/dashboard/InventryTableRow";
import LoadingSpinner from "../../components/LoadingSpinner";
import { baseAPI } from "../../utils/apiUrls";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function Inventory() {
  const [tab, setTab] = useState<number>(0);
  const [myStocks, setMyStocks] = useState<Stock[]>([])
  const [fetchingStocks, setFetchingStocks] = useState<boolean>(false)
  const [activeStock, setActiveStock] = useState<Stock>();
  const [stockModal, setStockModal] = useState<boolean>(false)

  const toggleStock = (stock?: Stock) => {
    if (stock) {
      setActiveStock(stock)
    }

    setStockModal(true)
  }

  const user = getuser()?.user

  const getMyStocks = async () => {
    setFetchingStocks(true)
    try {
      const token = getToken();
      const response = await axios.get(
        // `${baseAPI}/contributor/drafts/`,
        `${baseAPI}/contributor/approved-stocks/${user?.id}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setFetchingStocks(false)
      setMyStocks(response.data)
    } catch (error) {
      setFetchingStocks(false)
      console.log(error);
    }
  };

  useEffect(() => {
    getMyStocks()
  }, [])

  return (
    <section className="flex lg:flex-row flex-col-reverse gap-5">
      <div className="lg:w-[80%] h-[1000px] w-full bg-white rounded-3xl overflow-y-scroll shadow py-9 lg:px-8 px-4">
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
          {/* layout */}
          {/* <div className="flex items-center text-[8px]">
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
          </div> */}
        </div>
        {/* table */}
        <div
          className="text-center"
        >
          {fetchingStocks ?
            <LoadingSpinner />
            : myStocks.length > 0 ?
              <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,max-content))] justify-start gap-4">
                {myStocks.map((stock, i) => (
                  <InventoryTableRow setStock={toggleStock} stock={stock} key={i} />
                ))}
              </div>
              :
              (<>
                No assets in inventory
                <button className="outline-none rounded-full border border-black m-auto mt-2 flex items-center px-3 py-1 gap-1">
                  <GoUpload size={20} />
                  <Link to={"/uploads"}>
                    <p className="font-medium text-[15px]">Upload</p>
                  </Link>
                </button>
              </>)
          }
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

      {stockModal &&
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 relative rounded-lg shadow-lg mt-4 w-[90%] lg:w-[65%] max-h-[70%] overflow-auto">
            <div onClick={() => setStockModal(false)} className="absolute top-4 right-4 cursor-pointer text-black">
              <FiX size={20} />
            </div>
            <div className="flex flex-col lg:flex-row lg:gap-8 lg:items-center">
              <div className="flex-[2]">
                <h2 className="text-lg font-semibold mb-1">{activeStock?.description}</h2>

                <p className="text-xs mb-2">#{activeStock?.stock_id}</p>

                <LazyLoadImage src={activeStock?.main_file} effect="blur" className="w-full bg-neutral-200 h-[400px] bg-red object-contain" alt="" />
              </div>
              <div className="flex-[1] mt-4 flex flex-col gap-4">
                <div className="flex gap-8">
                  <div>
                    <p className="font-semibold text-sm flex items-center gap-1">File Type <FiInfo /></p>
                    <p className="mt-2 text-xs font-light bg-neutral-100 border-neutral-200 text-center text-neutral-500 border-[1px] rounded-md">{activeStock?.type}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm flex items-center gap-1">Usage Type <FiInfo /></p>
                    <p className="mt-2 text-xs font-light bg-neutral-100 border-neutral-200 text-center text-neutral-500 border-[1px] rounded-md">Commercial</p>
                  </div>
                </div>

                <div>
                  <p className="font-semibold text-sm flex items-center gap-1">Keywords <FiInfo /></p>

                  <div className="mt-2 flex gap-2 flex-wrap">
                    {activeStock?.keywords?.map((keyword, i) => (
                      <p key={i} className="text-xs bg-neutral-100 text-neutral-500 px-2 py-1 rounded-md">{keyword}</p>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" disabled checked={activeStock?.matured_content} />
                  <p className="text-xs text-neutral-500">Mature Content</p>
                </div>

                <div>
                  <p className="font-semibold flex items-center gap-2">Release form <FiInfo /></p>

                  <a className="text-xs text-accent" href={activeStock?.main_file}>Release form</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

    </section>
  );
}
