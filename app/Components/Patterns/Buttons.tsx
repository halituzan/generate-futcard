import * as React from "react";
import { Icon } from "@iconify/react";

export interface ButtonProps {
  text?: string;
  height?: string;
  width?: string;
  iconLeft?: string;
  iconRight?: string;
  color?: string;
  disabled?: boolean;
  className?: string;
  textColor?: string;
  iconSize?: number;
  mr?: string;
  tooltip?: string;
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
  mr="0",
  textColor = "text-white",
  iconSize = 24,
  tooltip,
  onClick,
}) => {
  return (
    <div className={`flex w-full font-din ${mr && "mr-" + mr}`}>
      <button
        className={`
        ${iconLeft || iconRight ? "justify-center" : "justify-center"}
        ${height}
        ${width}
        ${textColor}
        ${disabled ? "bg-gray-400" : color}
        ${className && className}
        text-[14px] flex items-center rounded-lg
        font-700
        justify-center
        text-xl
        `}
        disabled={disabled}
        onClick={onClick}
        title={tooltip && tooltip}
      >
        {iconLeft && (
          <Icon
            fontSize={iconSize}
            icon={iconLeft}
            className={`${text && "mr-2"}`}
          />
        )}
        {text && text}
        {iconRight && (
          <Icon fontSize={iconSize} icon={iconRight} className='ml-2' />
        )}
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
  iconSize?: number;
  mr?: string;
  tooltip?: string;
  onClick?: () => void;
}
