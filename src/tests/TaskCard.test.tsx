import React from "react";
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import TaskCard from "../components/cards/TaskCard";

afterEach(cleanup);
describe("TaskCard tests", () => {
  test("render textfield input", () => {
    const onChangeMock = jest.fn();
    const onClickCheckBoxMock = jest.fn();

    const taskName = "example"
    render(
      <TaskCard
        taskName={taskName}
        onChange={onChangeMock}
        onClickCheckBox={onClickCheckBoxMock}
        checked={false}
      />
    );
    const textfieldElem = screen.getByRole("textbox");
    expect(textfieldElem).toBeInTheDocument();
    expect(textfieldElem).toHaveValue(taskName);

  });
  test("change task name", () => {
    const onChangeMock = jest.fn();
    const onClickCheckBoxMock = jest.fn();

    const taskName = "example"
    render(
      <TaskCard
        taskName={taskName}
        onChange={onChangeMock}
        onClickCheckBox={onClickCheckBoxMock}
        checked={false}
      />
    );
    const textFieldElem = screen.getByRole('textbox');
    fireEvent.change(textFieldElem, {target: {value: "change task name"}});

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith('change task name');
  })
  test("render un-checked checkbox input", () => {
    const onChangeMock = jest.fn();
    const onClickCheckBoxMock = jest.fn();

    const taskName = "example"
    render(
      <TaskCard
        taskName={taskName}
        onChange={onChangeMock}
        onClickCheckBox={onClickCheckBoxMock}
        checked={false}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  })
  test("render checked checkbox input", () => {
    const onChangeMock = jest.fn();
    const onClickCheckBoxMock = jest.fn();

    const taskName = "example"
    render(
      <TaskCard
        taskName={taskName}
        onChange={onChangeMock}
        onClickCheckBox={onClickCheckBoxMock}
        checked={true}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  })
  test("click checkbox input", () => {
    const onChangeMock = jest.fn();
    const onClickCheckBoxMock = jest.fn();

    const taskName = "example"
    render(
      <TaskCard
        taskName={taskName}
        onChange={onChangeMock}
        onClickCheckBox={onClickCheckBoxMock}
        checked={false}
      />
    );
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(onClickCheckBoxMock).toHaveBeenCalledTimes(1);
  })
  test("focus on task card", () => {
    const onChangeMock = jest.fn();
    const onClickCheckBoxMock = jest.fn();

    const taskName = "example"
    render(
      <TaskCard
        taskName={taskName}
        onChange={onChangeMock}
        onClickCheckBox={onClickCheckBoxMock}
        checked={false}
      />
    );
    const taskCardElem = screen.getByRole('listitem');
    // Simulate focus event
    fireEvent.focus(taskCardElem);
    expect(taskCardElem).toHaveClass('bg-surface');

    // Simulate blur event
    fireEvent.blur(taskCardElem);
    expect(taskCardElem).not.toHaveClass('bg-surface');
  })
  test('applies checked style when checked prop is true', () => {
    const onChangeMock = jest.fn();
    const onClickCheckBoxMock = jest.fn();
    const taskName = 'example task';

    const {rerender} = render(
      <TaskCard
        taskName={taskName}
        onChange={onChangeMock}
        onClickCheckBox={onClickCheckBoxMock}
        checked={false}
      />
    );

    const taskCardElem = screen.getByRole('listitem');
    expect(taskCardElem).not.toHaveClass('opacity-50');

    rerender(
      <TaskCard
        taskName={taskName}
        onChange={onChangeMock}
        onClickCheckBox={onClickCheckBoxMock}
        checked={true}
      />
    );

    expect(taskCardElem).toHaveClass('opacity-50');
  });
})
