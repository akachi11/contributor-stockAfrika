import { Stock } from "../../types";
import "react-lazy-load-image-component/src/effects/blur.css";

interface InventoryItemProps {
  stock: Stock
  setStock: (stock: Stock) => void
}

const InventoryTableRow: React.FC<InventoryItemProps> = ({ stock, setStock }) => {
  return (
    <div onClick={() => { setStock(stock) }} className="p-4 flex flex-col bg-slate-50 hover:bg-slate-200 cursor-pointer shadow-md rounded-md" title={stock.description}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-[100px] h-[120px] will-change-transform cursor-pointer rounded overflow-hidden">
          <img
            className="w-full h-full object-contain"
            src={stock.thumbnail as string}
            alt="Inventory item"
          />
        </div>

        <div>
          <p className="font-semibold text-xs leading-[14px] line-clamp-2">
            {stock.description}
          </p>
          <p className="text-gray-600 text-xs mt-2">13/03/2023</p>
        </div>
      </div>
    </div>
  );
};

export default InventoryTableRow;