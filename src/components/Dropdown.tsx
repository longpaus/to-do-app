import React, { ReactNode, Ref } from "react";

interface DropDownProps {
  children: ReactNode;
  title: ReactNode;
  open: boolean;
  setOpenFunc: (open: boolean) => void;
  ref?: Ref<HTMLDivElement>;
}

export default function Dropdown(props: DropDownProps) {
  const handleButtonClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    props.setOpenFunc(!props.open);
  };
  return (
    <div className="relative">
      <div onClick={handleButtonClick}>{props.title}</div>
      {props.open && (
        <div
          className={`absolute z-10 rounded-md transition-opacity duration-1000`}
          ref={props.ref}
        >
          {props.children}
        </div>
      )}
    </div>
  );
}
