import SwapVertIcon from "@mui/icons-material/SwapVert";
import Dropdown from "./Dropdown";
import MenuItem from "./ui/MenuItem";
import React, {useState} from "react";
import {useStore} from "../store";
import {SortStrategy} from "../types/SortStrategy";

export default function TaskControllerDropdown() {
  const [mainOpen, setMainOpen] = useState(false);
  const [sortByOpen, setSortByOpen] = useState(false);
  const [groupByOpen, setGroupByOpen] = useState(false);
  const store = useStore();
  const sortStrategy: SortStrategy[] = ['Date', 'Title'];
  const handleMainDropdownClick = (open: boolean) => {
    setMainOpen(open);
    setSortByOpen(false);
    setGroupByOpen(false);
  }
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
  const handleClickSortStrategy = (strategy: SortStrategy) => {
    store.upDateSortTask(strategy);
    setSortByOpen(false);
    setGroupByOpen(false);
  }
  return (
    <Dropdown
      title={
        <SwapVertIcon
          fontSize="medium"
          className="cursor-pointer hover:bg-surface"
        />
      }
      detectOutsideClick
      open={mainOpen}
      setOpenFunc={(open) => handleMainDropdownClick(open)}
    >
      <ul className="bg-surface text-white w-40 border-gray-800">
        <Dropdown
          open={sortByOpen}
          setOpenFunc={handleInnerDropdownClick("sortBy")}
          title={
            <MenuItem hoverColor="bg-gray-500">
              <div className="flex justify-between">
                Sort By
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  width="20"
                  height="20"
                  className={`transform ${sortByOpen ? "rotate-180" : ""} mr-2 transition-transform duration-300 ease-in-out`}
                >
                  <path d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z"/>
                </svg>
              </div>
            </MenuItem>
          }
        >
          <ul className="rounded bg-surface w-24 border-solid border border-gray-500">
            {sortStrategy.map((strategy) => (
              <MenuItem
                selected={strategy === store.sortTask}
                key={strategy}
                onClick={() => handleClickSortStrategy(strategy)}
              >
                {strategy}
              </MenuItem>
            ))}
          </ul>
        </Dropdown>
        <Dropdown
          open={groupByOpen}
          setOpenFunc={handleInnerDropdownClick("groupBy")}
          title={
            <MenuItem hoverColor="bg-gray-500">
              <div className="flex justify-between">
                Group By
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  width="20"
                  height="20"
                  className={`transform ${groupByOpen ? "rotate-180" : ""} mr-2 transition-transform duration-300 ease-in-out`}
                >
                  <path d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z"/>
                </svg>
              </div>
            </MenuItem>
          }
        >
          <ul className="rounded bg-surface text-white w-24 border-solid border border-gray-500">
            <MenuItem hoverColor="">Date</MenuItem>
            <MenuItem hoverColor="">Title</MenuItem>
          </ul>
        </Dropdown>
      </ul>
    </Dropdown>
  );
}
