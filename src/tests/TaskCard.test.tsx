import React from "react";
import {cleanup, render, screen} from '@testing-library/react';
import TaskCard from "../components/cards/TaskCard";
import {Task} from "../types/TaskTypes";

afterEach(cleanup);
describe("TaskCard tests", () => {
  test("render textfield input", () => {
    const onChangeMock = jest.fn();
    const onClickCheckBoxMock = jest.fn();
    const updateTaskMock = jest.fn();

    const taskName = "example"
    const mockTask: Task = {name: taskName, creationTime: new Date(), id: 'id', completed: false, dueDate: new Date()}
    render(
      <TaskCard
        task={mockTask}
        updateTask={updateTaskMock}
      />
    );
    const textfieldElem = screen.getByRole("textbox");
    expect(textfieldElem).toBeInTheDocument();
    expect(textfieldElem).toHaveValue(taskName);

  });
  // test("change task name", () => {
  //   const onChangeMock = jest.fn();
  //   const onClickCheckBoxMock = jest.fn();
  //   const updateTaskMock = jest.fn();
  //   const taskName = "example"
  //   const mockTask: Task = {name: taskName, creationTime: new Date(), id: 'id', completed: false, dueDate: new Date()}
  //   render(
  //     <TaskCard
  //       task={mockTask}
  //       updateTask={updateTaskMock}
  //     />
  //   );
  //   const textFieldElem = screen.getByRole('textbox');
  //   fireEvent.change(textFieldElem, {target: {value: "change task name"}});
  //
  //   expect(onChangeMock).toHaveBeenCalledTimes(1);
  //   expect(onChangeMock).toHaveBeenCalledWith('change task name');
  // })
  // test("render un-checked checkbox input", () => {
  //   const onChangeMock = jest.fn();
  //   const onClickCheckBoxMock = jest.fn();
  //   const updateTaskMock = jest.fn();
  //   const taskName = "example"
  //   const mockTask: Task = {name: taskName, creationTime: new Date(), id: 'id', completed: false, dueDate: new Date()}
  //   render(
  //     <TaskCard
  //       task={mockTask}
  //       updateTask={updateTaskMock}
  //     />
  //   );
  //
  //   const checkbox = screen.getByRole("checkbox");
  //   expect(checkbox).toBeInTheDocument();
  //   expect(checkbox).not.toBeChecked();
  // })
  // test("render checked checkbox input", () => {
  //   const onChangeMock = jest.fn();
  //   const onClickCheckBoxMock = jest.fn();
  //   const updateTaskMock = jest.fn();
  //   const taskName = "example"
  //   const mockTask: Task = {name: taskName, creationTime: new Date(), id: 'id', completed: true, dueDate: new Date()}
  //   render(
  //     <TaskCard
  //       task={mockTask}
  //       updateTask={updateTaskMock}
  //     />
  //   );
  //
  //   const checkbox = screen.getByRole("checkbox");
  //   expect(checkbox).toBeInTheDocument();
  //   expect(checkbox).toBeChecked();
  // })
  // // test("click checkbox input", () => {
  // //   const onChangeMock = jest.fn();
  // //   const onClickCheckBoxMock = jest.fn();
  // //   const updateTaskMock = jest.fn();
  // //
  // //   const taskName = "example"
  // //   const mockTask: Task = {name: taskName, creationTime: new Date(), id: 'id', completed: false, dueDate: new Date()}
  // //   render(
  // //     <TaskCard
  // //       task={mockTask}
  // //       updateTask={updateTaskMock}
  // //     />
  // //   );
  // //   const checkbox = screen.getByRole("checkbox");
  // //   fireEvent.click(checkbox);
  // //   expect(onClickCheckBoxMock).toHaveBeenCalledTimes(1);
  // // })
  // test("focus on task card", () => {
  //   const onChangeMock = jest.fn();
  //   const onClickCheckBoxMock = jest.fn();
  //   const updateTaskMock = jest.fn();
  //
  //   const taskName = "example"
  //   const mockTask: Task = {name: taskName, creationTime: new Date(), id: 'id', completed: false, dueDate: new Date()}
  //   render(
  //     <TaskCard
  //       task={mockTask}
  //       updateTask={updateTaskMock}
  //     />
  //   );
  //   const taskCardElem = screen.getByRole('listitem');
  //   // Simulate focus event
  //   fireEvent.focus(taskCardElem);
  //   expect(taskCardElem).toHaveClass('bg-surface');
  //
  //   // Simulate blur event
  //   fireEvent.blur(taskCardElem);
  //   expect(taskCardElem).not.toHaveClass('bg-surface');
  // })
  // test('applies checked style when checked prop is true', () => {
  //   const onChangeMock = jest.fn();
  //   const onClickCheckBoxMock = jest.fn();
  //   const updateTaskMock = jest.fn();
  //
  //   const taskName = 'example task';
  //
  //   const mockTask: Task = {name: taskName, creationTime: new Date(), id: 'id', completed: false, dueDate: new Date()}
  //   const {rerender} = render(
  //     <TaskCard
  //       task={mockTask}
  //       updateTask={updateTaskMock}
  //     />
  //   );
  //   const taskCardElem = screen.getByRole('listitem');
  //   expect(taskCardElem).not.toHaveClass('opacity-50');
  //
  //   mockTask.completed = true;
  //   rerender(
  //     <TaskCard
  //       task={mockTask}
  //       updateTask={updateTaskMock}
  //     />
  //   );
  //
  //   expect(taskCardElem).toHaveClass('opacity-50');
  // });
})
