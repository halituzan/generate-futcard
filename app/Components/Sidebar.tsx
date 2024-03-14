import React, { useState } from "react";
import { Icon } from "@iconify/react";
import navigation from "@/Navigation/Navigation";
import VerticalMenuItems from "@/Navigation/VerticalMenu/VerticalMenuItems";
import Button from "./Patterns/Buttons";
import Network from "@/helpers/Network";
import { useRouter } from "next/router";
type Props = {};

const Sidebar = (props: Props) => {
  const router = useRouter();
  const [openSidebar, setOpenSidebar] = useState(true);
  const [openAllSidebar, setOpenAllSidebar] = useState(true);

  const logoutHandler = async () => {
    try {
      const res = await Network.getData("api/auth/logout");
      router.push("/login");
    } catch (error) {}
  };

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
      <div className='px-4 flex items-center justify-center w-full mb-5 '>
        <h2 className='text-xl font-bold flex-1 text-blue-500'>Logo</h2>
        <div className='cursor-pointer'>
          {openSidebar && (
            <div
              className='relative flex justify-center items-center min-w-[16px] min-h-[16px] w-4 h-4 border-2 border-blue-800 rounded-full'
              onClick={() => {
                setOpenAllSidebar(!openAllSidebar);
              }}
            >
              {openAllSidebar && (
                <span className=' min-w-[8px] min-h-[8px] w-2 h-2 bg-blue-800 rounded-full'></span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className='flex flex-1 flex-col items-start justify-between'>
        <div className='w-full flex-1'>
          {navigation.map((item) => {
            return (
              <VerticalMenuItems
                key={item.path}
                item={item}
                open={openSidebar}
              />
            );
          })}
        </div>
        <div className='p-4 w-full flex justify-center items-center'>
          <Button
            onClick={logoutHandler}
            color='bg-blue-500'
            text={openSidebar ? "Log out" : ""}
            className='w-full'
            iconRight='solar:logout-bold-duotone'
          />
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
