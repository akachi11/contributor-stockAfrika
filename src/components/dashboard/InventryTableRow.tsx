import React from "react";

const InventoryTableRow: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center lg:gap-5 gap-2">
          <div className="w-[64px] h-[58px] rounded overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?q=80&w=1900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Inventory item"
            />
          </div>
          <div>
            <p className="font-semibold text-[11px] leading-[14px] mb-2">
              Children in school
            </p>
            <p className="text-[10px] leading-[14px]">#08203094</p>
          </div>
        </div>
        <p className="hidden lg:block lg:text-xs text-[9px] text-primary_black">13/03/2023</p>
      </div>
      <div className="w-full h-[1px] bg-[#E9E9E9] my-2"></div>
    </div>
  );
};

export default InventoryTableRow;
