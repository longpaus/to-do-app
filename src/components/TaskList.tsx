import React from 'react';
import {Task, TaskListType} from '../types/TaskTypes';
import TaskCard from "./cards/TaskCard";

interface TaskListProps {
  listType: TaskListType;
  tasks: Task[];
  onClickCheckBox: (taskId: string, listType: TaskListType) => void;
  onChangeTaskName: (taskId: string, listType: TaskListType, newTaskName: string) => void;
}

const TaskList: React.FC<TaskListProps> = (props) => {
  const {listType, tasks, onClickCheckBox, onChangeTaskName} = props;
  return (
    <div className="collapse collapse-arrow mt-10">
      <input type="checkbox" defaultChecked={true}/>
      <div className="collapse-title text-sm text-white">{listType}</div>
      <ul className="collapse-content max-w divide-y divide-gray-800 dark:divide-gray-700">
        {tasks.map((t: Task, index: number) => (
          <TaskCard
            key={t.id}
            taskName={t.name}
            checked={listType === 'complete'}
            onClickCheckBox={() => onClickCheckBox(t.id, listType)}
            onChange={(newTaskName) => onChangeTaskName(t.id, listType, newTaskName)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;