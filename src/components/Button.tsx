import { ButtonHTMLAttributes, JSX } from "react";

const colors={
    blue:"bg-indigo-600 hover:bg-indigo-700 text-white",
    white:"border border-gray-300 text-gray-700  hover:bg-gray-50",
    green:"bg-green-600 hover:bg-green-700 text-white",
    yellow:"bg-yellow-600 hover:bg-yellow-700 text-white",
    gray:"bg-gray-600 hover:bg-gray-700 text-white",
    red:"bg-red-600 text-white hover:bg-red-700"
}

interface Props{
    children?:JSX.Element,
    color?:keyof typeof colors,
    className?:string
    type?:ButtonHTMLAttributes<HTMLButtonElement>["type"]
    onClick?:ButtonHTMLAttributes<HTMLButtonElement>["onClick"]
    disabled?:ButtonHTMLAttributes<HTMLButtonElement>["disabled"]
}

export default function Button({children,color,className,type,onClick,disabled}:Props) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`px-6 py-3  rounded-lg transition ${colors[color||"white"]} ${className}`}
    >
      {children}
    </button>
  );
}
