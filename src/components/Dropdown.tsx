import SwapVertIcon from "@mui/icons-material/SwapVert";
import React, {ReactNode} from "react";

export default function Dropdown(props: { children: ReactNode }) {
  return (
    <details className="dropdown">
      <summary className="w-2 h-2 bg-transparent border-none btn">
        <SwapVertIcon fontSize="medium"/>
      </summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-surface rounded w-52">
        {props.children}
      </ul>
    </details>
  )
}