import React, { useState } from "react";
import AddTaskForm from "./AddTaskForm";
import { Task, TaskId, TaskListType, TasksList } from "../types/TaskTypes";
import uuid from "react-uuid";
import TaskList from "./TaskList";
import { SortStrategy } from "../types/SortStrategy";
import Dropdown from "./Dropdown";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import MenuItem from "./ui/MenuItem";

export default function TaskController() {
  const [task, setTask] = useState<string>("");
  const [tasksList, setTasksList] = useState<TasksList>({
    complete: [],
    ongoing: [],
  });
  const ListTypes: TaskListType[] = ["ongoing", "complete"];
  const [sortStrategy, setSortStrategy] = useState<SortStrategy>("");
  const addTaskToList = (task: Task, listType: TaskListType) => {
    setTasksList((prevState) => ({
      ...prevState,
      [listType]: [task, ...prevState[listType]].sort(
        (a, b) => b.creationTime.getTime() - a.creationTime.getTime(),
      ),
    }));
  };
  const changeTaskNameHandler = (taskId: TaskId, listType: TaskListType) => {
    return (newTaskName: string) => {
      setTasksList((prevState) => {
        const newList = prevState[listType].map((task) => {
          if (task.id === taskId) {
            return { ...task, name: newTaskName };
          }
          return task;
        });
        return {
          ...prevState,
          [listType]: newList,
        };
      });
    };
  };
  const removeTaskFromList = (id: TaskId, listType: TaskListType) => {
    setTasksList((prevState) => {
      const newList = [...prevState[listType]].filter((task) => task.id !== id);
      return {
        ...prevState,
        [listType]: newList,
      };
    });
  };

  const findTask = (id: TaskId, listType: TaskListType): Task | undefined => {
    return tasksList[listType].find((task) => task.id === id);
  };

  const clickCheckedHandler = (taskId: TaskId, listType: TaskListType) => {
    // set complete task to incomplete
    if (listType === "complete") {
      const task = findTask(taskId, "complete");
      if (task) {
        removeTaskFromList(taskId, "complete");
        addTaskToList(task, "ongoing");
      }
    }
    // completed a task
    else if (listType === "ongoing") {
      const task = findTask(taskId, "ongoing");
      if (task) {
        removeTaskFromList(taskId, "ongoing");
        addTaskToList(task, "complete");
      }
    }
  };
  const submitTaskHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.length !== 0) {
      const newTask: Task = {
        name: task,
        id: uuid(),
        creationTime: new Date(),
      };
      addTaskToList(newTask, "ongoing");
      setTask("");
    }
  };

  return (
    <div className="flex relative top-12 items-center h-screen  flex-col ">
      <div className="max-w-115 min-w-80 w-1/2 h-1/2 p-4">
        <div className="mb-3 flex justify-between items-center">
          <div className="text-2xl text-white">Tasks</div>
          <Dropdown
            title={
              <SwapVertIcon
                fontSize="medium"
                className="cursor-pointer hover:bg-surface"
              />
            }
          >
            <ul className="bg-surface w-40 border-gray-800 text-white">
              <Dropdown
                title={<MenuItem hoverColor="bg-gray-500">Sort By</MenuItem>}
              >
                <ul className="rounded bg-surface text-white w-24 border-solid border border-gray-500">
                  <MenuItem hoverColor="">Date</MenuItem>
                  <MenuItem hoverColor="">Title</MenuItem>
                </ul>
              </Dropdown>
              <Dropdown
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
        <AddTaskForm
          onSubmit={submitTaskHandler}
          task={task}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTask(e.target.value)
          }
        />

        {ListTypes.map(
          (listType) =>
            tasksList[listType].length > 0 && (
              <TaskList
                key={listType}
                listType={listType}
                tasks={tasksList[listType]}
                onClickCheckBox={clickCheckedHandler}
                onChangeTaskName={changeTaskNameHandler}
              />
            ),
        )}
      </div>
    </div>
  );
}
