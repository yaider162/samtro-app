export function Loading({classname,color="white"}: {classname: string, color?: string}) {
  const colors: { [key: string]: string } ={
    red:"border-red-900",
    green:"border-green-900",
    blue:"border-blue-900",
    yellow:"border-yellow-900",
    gray:"border-gray-900",
    white:"border-white",
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`animate-spin rounded-full size-16 ${classname} border-t-2  ${colors[color]} border-gray-900`}></div>
    </div>
  );  
}

export function TriLine() {
  return (
    <div className="flex justify-center items-center space-x-[2px] relative top-[1px]">
      <div className="size-[7px] bg-white rounded-full animate-bounce"></div>
      <div className="size-[7px] bg-white rounded-full animate-bounce"></div>
      <div className="size-[7px] bg-white rounded-full animate-bounce"></div>
     </div>
  );
}