import React, {useEffect, useState} from "react";
import AddTaskForm from "./AddTaskForm";
import {Task, TaskId, TaskListType, TasksList} from "../types/TaskTypes";
import uuid from "react-uuid";
import TaskList from "./TaskList";
import TaskControllerDropdown from "./TaskControllerDropdown";
import {useStore} from "../store";
import {defaultDueDate} from "../utils/date.js";

export default function TaskController() {
  const [task, setTask] = useState<string>("");
  const [dueDate, setDueDate] = useState<Date>(defaultDueDate());
  const [tasksList, setTasksList] = useState<TasksList>({
    complete: [],
    ongoing: [],
  });
  const store = useStore();
  const ListTypes: TaskListType[] = ["ongoing", "complete"];

  useEffect(() => {
    switch (store.sortTask) {
      case "Date":
        ListTypes.forEach(listType => {
          setTasksList((prevState) => ({
            ...prevState,
            [listType]: prevState[listType].sort(
              (a: Task, b: Task) => b.creationTime.getTime() - a.creationTime.getTime(),
            ),
          }));
        })
        break;
      case "Title":
        ListTypes.forEach(listType => {
          setTasksList((prevState) => ({
            ...prevState,
            [listType]: [...prevState[listType]]
              .sort(
                (a, b) => a.name.localeCompare(b.name),
              ),
          }));
        });
        break;
      default:
        break;
    }
  }, [store.sortTask]);
  const addTaskToList = (task: Task, listType: TaskListType) => {
    switch (store.sortTask) {
      case "Date":
        setTasksList((prevState) => ({
          ...prevState,
          [listType]: [task, ...prevState[listType]]
        }));
        break;
      case "Title":
        setTasksList((prevState) => {
          const newList = [...prevState[listType]];
          let index = 0;
          while (index < newList.length && task.name.localeCompare(newList[index].name) > 0) {
            index++;
          }
          newList.splice(index, 0, task);
          return {
            ...prevState,
            [listType]: newList
          };
        });
    }

  };
  const changeTaskNameHandler = (taskId: TaskId, listType: TaskListType) => {
    return (newTaskName: string) => {
      setTasksList((prevState) => {
        const newList = prevState[listType].map((task) => {
          if (task.id === taskId) {
            return {...task, name: newTaskName};
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
        dueDate: dueDate
      };
      addTaskToList(newTask, "ongoing");
      setTask("");
    }
  };

  return (
    <div className="flex relative top-12 items-center h-screen  flex-col ">
      <div className="max-w-115 min-w-80 w-1/2 h-1/2 p-4">
        <div className="mb-3 flex justify-between items-center">
          <div className="text-2xl text-black dark:text-white ">Tasks</div>
          <TaskControllerDropdown/>
        </div>
        <AddTaskForm
          onSubmit={submitTaskHandler}
          task={task}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTask(e.target.value)
          }
          dueDate={dueDate}
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
