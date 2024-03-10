import * as React from "react";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";

export interface InputProps {
  label?: string;
  onChange: any;
  type?: string;
  placeholder?: string;
  name?: string;
  className?: string;
}

const TextStore: React.FC<InputProps> = ({
  label,
  onChange,
  type = "text",
  placeholder,
  className = "",
  name = "",
}) => {
  const value = useSelector((state: any) => state.image);

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {label && (
        <label htmlFor={`${label}-input`} className='text-sm font-normal'>
          {label}
        </label>
      )}
      <div className='relative w-full'>
        <input
          type={type}
          id={`${label}-input`}
          value={value[name]}
          name={name}
          placeholder={placeholder}
          className='border border-slate outline-none text-slate-dark font-600 text-[12px] focus:border-slate-dark px-3 py-2 rounded-[7px] my-1 w-full'
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default TextStore;

export declare interface InputProps {
  label?: string;
  onChange: any;
  type?: string;
  placeholder?: string;
  name?: string;
  className?: string;
}
