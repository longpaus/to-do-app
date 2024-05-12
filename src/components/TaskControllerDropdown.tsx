import SwapVertIcon from "@mui/icons-material/SwapVert";
import Dropdown from "./Dropdown";
import MenuItem from "./ui/MenuItem";
import React, { useEffect, useRef, useState } from "react";

export default function TaskControllerDropdown() {
  const [mainOpen, setMainOpen] = useState(false);
  const [sortByOpen, setSortByOpen] = useState(false);
  const [groupByOpen, setGroupByOpen] = useState(false);

  const dropDownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setMainOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  const handleInnerDropdownClick = (dropdownType: string) => {
    return (open: boolean) => {
      switch (dropdownType) {
        case "sortBy":
          setGroupByOpen(false);
          setSortByOpen(open);
          break;
        case "groupBy":
          setSortByOpen(false);
          setGroupByOpen(open);
          break;
      }
    };
  };
  return (
    <div ref={dropDownRef}>
      <Dropdown
        title={
          <SwapVertIcon
            fontSize="medium"
            className="cursor-pointer hover:bg-surface"
          />
        }
        open={mainOpen}
        setOpenFunc={() => setMainOpen(!mainOpen)}
      >
        <ul className="bg-surface w-40 border-gray-800 text-white">
          <Dropdown
            open={sortByOpen}
            setOpenFunc={handleInnerDropdownClick("sortBy")}
            title={<MenuItem hoverColor="bg-gray-500">Sort By</MenuItem>}
          >
            <ul className="rounded bg-surface text-white w-24 border-solid border border-gray-500">
              <MenuItem hoverColor="">Date</MenuItem>
              <MenuItem hoverColor="">Title</MenuItem>
            </ul>
          </Dropdown>
          <Dropdown
            open={groupByOpen}
            setOpenFunc={handleInnerDropdownClick("groupBy")}
            title={<MenuItem hoverColor="bg-gray-500">Group By</MenuItem>}
          >
            <ul className="rounded bg-surface text-white w-24 border-solid border border-gray-500">
              <MenuItem hoverColor="">Date</MenuItem>
              <MenuItem hoverColor="">Title</MenuItem>
            </ul>
          </Dropdown>
        </ul>
      </Dropdown>
    </div>
  );
}
