import HomePage from "@/app/Components/HomePage";
import Sidebar from "@/app/Components/Sidebar";
import meHandler from "@/helpers/services/me/me";
import React, { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

const Main = ({ children }: Props) => {
  useEffect(() => {
    meHandler();
  }, []);

  return (
    <div className='flex h-screen items-start p-0 bg-slate-light'>
      <Sidebar />
      <main className='px-10 py-4 flex-1 h-screen flex'>
        <div className='bg-white rounded-md p-5 flex-1'>
          {children ? children : <HomePage />}
        </div>
      </main>
    </div>
  );
};

export default Main;
