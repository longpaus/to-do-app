import React from 'react';
import {Task, TaskId} from '../types/TaskTypes';
import TaskCard from "./cards/TaskCard";
import Accordion from "./menus/Accordion";

interface TaskListProps {
  groupName: string;
  tasks: Task[];
  updateTask: (taskId: TaskId) => (updatedTask: Task, changeTaskGroup?: boolean) => void;
}

const TaskList: React.FC<TaskListProps> = (props) => {
  const {groupName, tasks} = props;
  return (
    <div className="mt-10">
      <Accordion
        title={<div className="text-sm dark:text-white">{groupName}</div>}
        defaultOpen={true}
        content={
          <ul className="max-w divide-y divide-gray-300 dark:divide-gray-700">
            {tasks.map((t: Task) => (
              <TaskCard
                key={t.id}
                task={t}
                updateTask={props.updateTask(t.id)}
              />
            ))}
          </ul>
        }
      />
    </div>
  );
};

export default TaskList;