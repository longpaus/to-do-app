import React, {useState} from "react";
import AddTaskForm from "../components/AddTaskForm";
import TaskCard from "../components/cards/TaskCard";

type TaskListType = 'ongoing' | 'complete';
type Task = string
type TasksList = {
  [listName in TaskListType]: Task[];
};

export default function Home() {
  const [task, setTask] = useState<Task>('');
  const [tasksList, setTasksList] = useState<TasksList>({complete: [], ongoing: []});
  // const [tasks, setTasks] = useState<string[]>([]);
  const ListTypes: TaskListType[] = ['ongoing', 'complete'];
  const addTask = (task: Task, listType: TaskListType) => {
    setTasksList(prevState => ({
      ...prevState,
      [listType]: [task, ...prevState[listType]]
    }));
  };
  const changeTaskHandler = (index: number, listType: TaskListType) => {
    return (newTask: string) => {
      setTasksList(prevState => {
        const newList = [...prevState[listType]];
        newList[index] = newTask;
        return {
          ...prevState,
          [listType]: newList
        };
      });
    };
  };
  const handleSubmitTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.length !== 0) {
      addTask(task, 'ongoing');
      setTask('');
    }
  }
  return (
    <div className="flex relative top-12 items-center h-screen  flex-col ">
      <div className="max-w-110 min-w-80 w-1/2 h-1/2 p-4">
        <AddTaskForm
          onSubmit={handleSubmitTask} task={task}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTask(e.target.value)}
        />
        {ListTypes.map((listType) => (
          <details className="collapse collapse-arrow mt-12 ">
            <summary className="collapse-title text-sm">{listType}</summary>
            <ul className="collapse-content max-w divide-y divide-gray-200 dark:divide-gray-700">
              {tasksList[listType].map((t: Task, index: number) => (
                <TaskCard key={`${listType}-${index}`} task={t} onChange={changeTaskHandler(index, listType)}/>
              ))}
            </ul>
          </details>

        ))}

      </div>
    </div>
  )
}