import { LayoutProps } from "@/helpers/prop.models";
import React from "react";

const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <div className='w-screen h-screen bg-slate-light flex justify-center items-center'>
      {children}
    </div>
  );
};

export default AuthLayout;
