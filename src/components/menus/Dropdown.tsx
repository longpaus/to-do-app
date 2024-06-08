import React, {ReactNode, useEffect, useRef} from "react";

interface DropDownProps {
  children: ReactNode;
  title: ReactNode;
  open: boolean;
  setOpenFunc: (open: boolean) => void;
  detectOutsideClick?: boolean;
}

export default function Dropdown(props: Readonly<DropDownProps>) {
  const dropDownRef = useRef<HTMLDivElement>(null);
  const handleButtonClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    props.setOpenFunc(!props.open);
  };

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        props.setOpenFunc(false);
      }
    };

    if (props.detectOutsideClick) {
      document.addEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  return (
    <div className="relative">
      <div onClick={handleButtonClick}>{props.title}</div>
      {props.open && (
        <div
          className={`absolute z-10 rounded-md bg-white dark:bg-black transition-opacity duration-1000`}
          
          ref={dropDownRef}
        >
          {props.children}
        </div>
      )}
    </div>
  );
}
