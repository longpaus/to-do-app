import React from 'react';
import {Task} from '../types/TaskTypes';
import TaskCard from "./cards/TaskCard";
import Accordion from "./menus/Accordion";

interface TaskListProps {
  groupName: string;
  tasks: Task[];
  onClickCheckBox: (taskId: string) => (completed: boolean) => void;
  onChangeTaskName: (taskId: string) => (newTask: string) => void;
}

const TaskList: React.FC<TaskListProps> = (props) => {
  const {groupName, tasks, onClickCheckBox, onChangeTaskName} = props;
  return (
    <div className="mt-10">
      <Accordion
        title={<div className="text-sm text-white">{groupName}</div>}
        defaultOpen={true}
        content={
          <ul className="max-w divide-y divide-gray-800 dark:divide-gray-700">
            {tasks.map((t: Task, index: number) => (
              <TaskCard
                key={t.id}
                task={t}
                onClickCheckBox={onClickCheckBox(t.id)}
                onChange={onChangeTaskName(t.id)}
              />
            ))}
          </ul>
        }
      />
    </div>
  );
};

export default TaskList;