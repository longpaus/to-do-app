import React, { ReactNode, useEffect, useRef, useState } from "react";

interface DropDownProps {
  children: ReactNode;
  title: ReactNode;
}

export default function Dropdown(props: DropDownProps) {
  const [open, setOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  const handleButtonClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setOpen(!open);
  };
  return (
    <div className="relative">
      <div className=" p-1" onClick={handleButtonClick}>
        {props.title}
      </div>
      {open && (
        <div
          ref={dropDownRef}
          className={`absolute z-10 rounded-md transition-opacity duration-1000`}
        >
          {props.children}
        </div>
      )}
    </div>
    // <details className="dropdown">
    //   <summary className="w-2 h-2 bg-transparent border-none btn">
    //     <SwapVertIcon fontSize="medium"/>
    //   </summary>
    //   <ul className="p-2 shadow menu dropdown-content z-[1] bg-surface rounded w-52">
    //     {props.children}
    //   </ul>
    // </details>
  );
}
