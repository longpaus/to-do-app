import React, {ReactNode} from "react";
import CheckIcon from '@mui/icons-material/Check';

interface MenuItemProps {
  children?: ReactNode;
  hoverColor?: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function MenuItem(props: MenuItemProps) {
  return (
    <li onClick={(e) => {
      if (props.onClick) {
        e.stopPropagation();
        props.onClick();
      }
    }} className={`p-2 cursor-pointer bg-inherit hover:bg-lightSurface dark:hover:opacity-25`}>
      <div className={` ${props.selected ? 'flex justify-between text-blue-400' : ''}`}>
        {props.children}
        {props.selected && <CheckIcon/>}
      </div>
    </li>
  );
}
