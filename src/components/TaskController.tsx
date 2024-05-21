import React, {useEffect, useState} from "react";
import AddTaskForm from "./AddTaskForm";
import {Task, TaskId} from "../types/TaskTypes";
import uuid from "react-uuid";
import TaskList from "./TaskList";
import TaskControllerDropdown from "./TaskControllerDropdown";
import {useStore} from "../store";
import {getGroupKey, groupTasks, mergeGroupsIntoArray} from "../utils/GroupingTasks";
import {sortByDate, sortByTitle} from "../utils/SortingTasks";
import {TasksGroups} from "../types/GroupStrategyTypes";

export default function TaskController() {
  const store = useStore();
  const [task, setTask] = useState<string>("");
  const [tasksGroups, setTasksGroups] = useState<TasksGroups>(() => groupTasks(store.groupTask, []));

  useEffect(() => {
    setTasksGroups(() => groupTasks(store.groupTask, mergeGroupsIntoArray(tasksGroups)));
  }, [store.groupTask]);


  useEffect(() => {
    switch (store.sortTask) {
      case "Date":
        Object.keys(tasksGroups).forEach(group => {
          setTasksGroups((prevState: TasksGroups) => ({
              ...prevState,
              [group]: sortByDate(prevState[group])
            }
          ));
        })

        break;
      case "Title":
        Object.keys(tasksGroups).forEach(group => {
          setTasksGroups((prevState: TasksGroups) => ({
              ...prevState,
              [group]: sortByTitle(prevState[group])
            }
          ));
        })
        break;
      default:
        break;
    }
  }, [store.sortTask]);
  const addTask = (newTask: Task): void => {
    addTaskToList(newTask, getGroupKey(newTask, store.groupTask))
  }
  const addTaskToList = (task: Task, groupName: string) => {
    switch (store.sortTask) {
      case "Date":
        setTasksGroups((prevState: TasksGroups) => ({
          ...prevState,
          [groupName]: [task, ...prevState[groupName]]
        }))
        break;
      case "Title":
        setTasksGroups((prevState: TasksGroups) => {
          const newList = [...prevState[groupName]];
          let index = 0;
          while (index < newList.length && task.name.localeCompare(newList[index].name) > 0) {
            index++;
          }
          newList.splice(index, 0, task);
          return {
            ...prevState,
            [groupName]: newList
          };
        });
    }

  };
  const changeTaskNameHandler = (groupName: string) => (taskId: TaskId) => (newTaskName: string) => {
    setTasksGroups((prevState: TasksGroups) => {
      const newList = updateTask(prevState[groupName], taskId, {name: newTaskName})
      return {
        ...prevState,
        [groupName]: newList,
      };
    });
  };

  const findTask = (taskId: TaskId, groupName: string): Task | undefined => {
    return tasksGroups[groupName].find(task => task.id === taskId);
  }
  const removeTaskFromList = (id: TaskId, groupName: string) => {
    setTasksGroups((prevState: TasksGroups) => {
      const newList = [...prevState[groupName]].filter((task) => task.id !== id);
      return {
        ...prevState,
        [groupName]: newList,
      };
    });
  };

  const updateTask = (tasks: Task[], taskId: TaskId, updatedTask: Partial<Task>): Task[] => {
    return tasks.map((task: Task) => {
      if (task.id === taskId) {
        return {...task, ...updatedTask};
      }
      return task;
    });
  };

  const clickCheckedHandler = (groupName: string) => (taskId: TaskId) => (completed: boolean) => {
    console.log(taskId);
    const task = {...findTask(taskId, groupName), completed}
    if (task) {
      removeTaskFromList(taskId, groupName);
      addTaskToList(task as Task, getGroupKey(task as Task, store.groupTask));
    }

    // setTasksGroups((prevState: TasksGroups) => {
    //   const newList: Task[] = updateTask(prevState[groupName], taskId, {completed});
    //   return {
    //     ...prevState,
    //     [groupName]: newList,
    //   }
    // })
  };
  const submitTaskHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.length !== 0) {
      const newTask: Task = {
        name: task,
        id: uuid(),
        creationTime: new Date(),
        dueDate: store.defaultDueDate,
        completed: false,
      };
      addTask(newTask);
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
          onChangeTaskName={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTask(e.target.value)
          }
        />
        {Object.keys(tasksGroups).map((groupName) =>
            tasksGroups[groupName].length > 0 && (
              <TaskList
                key={groupName}
                groupName={groupName}
                tasks={tasksGroups[groupName]}
                onClickCheckBox={clickCheckedHandler(groupName)}
                onChangeTaskName={changeTaskNameHandler(groupName)}
              />
            )
        )}
      </div>
    </div>
  );
}
