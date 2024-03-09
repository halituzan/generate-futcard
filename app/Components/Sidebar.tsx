import React, { useState } from "react";
import { Icon } from "@iconify/react";
import navigation from "@/Navigation/Navigation";
import VerticalMenuItems from "@/Navigation/VerticalMenu/VerticalMenuItems";
type Props = {};

const Sidebar = (props: Props) => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [openAllSidebar, setOpenAllSidebar] = useState(true);
  console.log(openSidebar);

  return (
    <div
      onMouseEnter={() => {
        setOpenSidebar(true);
      }}
      onMouseLeave={() => {
        if (!openAllSidebar) {
          setOpenSidebar(!openSidebar);
        }
      }}
      className={`${
        openSidebar ? "w-[300px]" : "w-[75px]"
      } pt-4 bg-white shadow-xl h-screen sidebar flex flex-col transition-all`}
    >
      <div className='px-4 flex items-center justify-center w-full mb-5'>
        <h2 className='text-xl font-bold flex-1 text-blue-500'>Logo</h2>
        <div className='cursor-pointer'>
          {openSidebar && (
            <div
              className='relative flex justify-center items-center min-w-[16px] min-h-[16px] w-4 h-4 border-2 border-blue-800 rounded-full'
              onClick={() => {
                setOpenAllSidebar(!openAllSidebar)
              }}
            >
              {openAllSidebar && (
                <span className=' min-w-[8px] min-h-[8px] w-2 h-2 bg-blue-800 rounded-full'></span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className='flex flex-col items-start'>
        {navigation.map((item) => {
          return (
            <VerticalMenuItems key={item.path} item={item} open={openSidebar} />
          );
        })}
      </div>
    </div>
  );
};
export default Sidebar;
