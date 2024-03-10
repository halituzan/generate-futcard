import React from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

const VerticalMenuItems = ({ open, item }: any) => {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <button
      className={`
       py-2 w-full group flex  items-center  hover:bg-blue-100 transition-colors hover:border-r-[3px] pl-4 border-r-[3px]
       relative
       before:absolute 
       before:inset-0 
       before:bg-blue-100 
       before:scale-x-0
       before:origin-right
       before:transition
       before:duration-300
       hover:before:scale-x-100
       hover:before:origin-left
      
       ${
         item.path == pathname
           ? "border-blue-500 bg-blue-100"
           : "border-transparent hover:border-blue-500"
       }
      ${!open ? "justify-center pl-0" : "justify-start "}
      `}
      onClick={() => {
        router.push(item.path);
      }}
    >
      <div className='text-base flex relative'>
        <Icon
          icon={item.icon}
          className='text-blue-500 min-w-[24px]'
          fontSize={24}
        />

        {open && (
          <span
            className='flex-1 flex font-600 uppercase'
            style={{ padding: "0px 10px" }}
          >
            {item.label}
          </span>
        )}
      </div>
    </button>
  );
};

export default VerticalMenuItems;
