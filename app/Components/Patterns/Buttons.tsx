import * as React from "react";
import { Icon } from "@iconify/react";

export interface ButtonProps {
  text: string;
  height?: string;
  width?: string;
  iconLeft?: string;
  iconRight?: string;
  color?: string;
  disabled?: boolean;
  className?: string;
  textColor?: string;
  mr?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  iconLeft,
  iconRight,
  height = "h-10",
  width = "w-[100px]",
  color,
  disabled = false,
  className,
  mr,
  textColor = "text-white",
  onClick,
}) => {
  return (
    <div className={`flex flex-col w-full ${mr && "mr-" + mr}`}>
      <button
        className={`
        ${iconLeft || iconRight ? "justify-between" : "justify-center"}
        ${height}
        ${width}
        ${textColor}
        ${disabled ? "bg-gray-400" : color}
        ${className && className}
        text-[14px] flex items-center rounded-lg
        font-700
        `}
        disabled={disabled}
        onClick={onClick}
      >
        {iconLeft && <Icon icon={iconLeft} />} {text}
        {iconRight && <Icon icon={iconRight} />}
      </button>
    </div>
  );
};

export default Button;
export declare interface InputProps {
  text: string;
  height?: string;
  width?: string;
  iconLeft?: string;
  iconRight?: string;
  color?: string;
  disabled?: boolean;
  className?: string;
  textColor?: string;
  mr?: string;
  onClick?: () => void;
}
