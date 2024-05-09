import React, { ReactNode } from "react";

interface MenuItemProps {
  children?: ReactNode;
  hoverColor: string;
}

export default function MenuItem(props: MenuItemProps) {
  return (
    <li className={`p-2 cursor-pointer bg-inherit hover:opacity-25`}>
      {props.children}
    </li>
  );
}
