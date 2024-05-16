import React from 'react';
import {Task, TaskListType} from '../types/TaskTypes';
import TaskCard from "./cards/TaskCard";
import Accordion from "./menus/Accordion";

interface TaskListProps {
  listType: TaskListType;
  tasks: Task[];
  onClickCheckBox: (taskId: string, listType: TaskListType) => void;
  onChangeTaskName: (taskId: string, listType: TaskListType) => (newTask: string) => void;
}

const TaskList: React.FC<TaskListProps> = (props) => {
  const {listType, tasks, onClickCheckBox, onChangeTaskName} = props;
  return (
    <div className="mt-10">
      <Accordion
        title={<div className="text-sm text-white">{listType}</div>}
        defaultOpen={true}
        content={
          <ul className="max-w divide-y divide-gray-800 dark:divide-gray-700">
            {tasks.map((t: Task, index: number) => (
              <TaskCard
                key={t.id}
                taskName={t.name}
                checked={listType === 'complete'}
                onClickCheckBox={() => onClickCheckBox(t.id, listType)}
                onChange={onChangeTaskName(t.id, listType)}
              />
            ))}
          </ul>
        }
      />
    </div>
  );
};

export default TaskList;