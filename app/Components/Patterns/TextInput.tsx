import * as React from "react";
import { Icon } from "@iconify/react";

export interface InputProps {
  label?: string;
  set: string | number;
  setter: React.Dispatch<React.SetStateAction<any>>;
  type?: string;
  placeholder?: string;
  min?: string;
  max?: string;
  className?: string;
  direction?: string;
  items?: string;
  w?: string;
  insideLabel?: string;
  subLabel?: string | React.ReactNode;
}

const TextInput: React.FC<InputProps> = ({
  label,
  set,
  setter,
  type = "text",
  placeholder,
  subLabel,
  className = "",
  min,
  max,
  direction = "flex-col",
  items = "items-start",
  w = "w-full",
  insideLabel,
}) => {
  const [focus, setFocus] = React.useState(false);
  const [inputType, setInputType] = React.useState(type);

  return (
    <div className={`flex font-din ${direction} ${items} ${w} ${className}`}>
      {label && (
        <label htmlFor={`${label}-input`} className='text-sm font-normal  font-din'>
          {label}
        </label>
      )}
      <div className='relative w-full flex items-center'>
        {type === "password" ? (
          <input
            type={inputType}
            id={`${label}-input`}
            value={set}
            placeholder={placeholder}
            className='border border-slate outline-none  font-din text-slate-dark font-600 text-[12px] focus:border-slate-dark px-3 py-2 rounded-[7px] my-1 w-full'
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChange={(e) => setter(e.target.value)}
          />
        ) : (
          <input
            type={type}
            id={`${label}-input`}
            value={set}
            placeholder={placeholder}
            min={min && min}
            max={max && max}
            className='border border-slate outline-none text-slate-dark font-600 text-[12px] focus:border-slate-dark px-3 py-2 rounded-[7px] my-1 w-full'
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChange={(e) => setter(e.target.value)}
          />
        )}
        {type === "password" && (
          <span
            className='absolute top-1/2 right-1 cursor-pointer -translate-x-1/2 -translate-y-1/2'
            onClick={() =>
              setInputType(inputType === "password" ? "text" : "password")
            }
          >
            {inputType === "text" ? (
              <Icon
                icon='mdi:eye'
                className={focus ? "text-slate" : "text-slate-dark"}
              />
            ) : (
              <Icon
                icon='mdi:eye-off'
                className={!focus ? "text-slate" : "text-slate-dark"}
              />
            )}
          </span>
        )}
        {insideLabel && <span className="absolute right-3 font-din">{insideLabel}</span>}
      </div>

      {subLabel && subLabel}
    </div>
  );
};

export default TextInput;

export declare interface InputProps {
  label?: string;
  set: string | number;
  setter: React.Dispatch<React.SetStateAction<any>>;
  type?: string;
  placeholder?: string;
  subLabel?: string | React.ReactNode;
  className?: string;
  direction?: string;
  items?: string;
  min?: string;
  w?: string;
  insideLabel?: string;
  max?: string;
}
