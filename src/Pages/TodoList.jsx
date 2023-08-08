import PropTypes from "prop-types";
import { DATA, FILTER_MAP } from "../Common/constants";
import Todo from "./Todo";
import Form from "../Components/Form/Form";
import FilterButton from "../Components/FilterButton/FilterButton";
import { useState } from "react";

const TodoList = () => {
  const [data, setData] = useState(DATA);
  const [remainingTasks, setRemainingTasks] = useState(
    DATA.filter((item) => !item.completed).length
  );

  const [currentFilter, setCurrentFilter] = useState("All");
  const filteredTasks = data.filter(FILTER_MAP[currentFilter]);

  const onChangeFilter = (filter) => {
    setCurrentFilter(filter);
  };

  const onChangeStatus = (e, id) => {
    console.log("🚀 ~ file: Todo.jsx:10 ~ onChange ~ e:", e.target.checked, id);

    const cloneState = JSON.parse(JSON.stringify(data));

    cloneState.filter((item) => item.id === id)[0].completed = e.target.checked;

    setData(cloneState);

    const newRemainingTasks = cloneState.filter(
      (item) => !item.completed
    ).length;
    setRemainingTasks(newRemainingTasks);
  };

  const onDeleteTodo = (id) => {
    const updatedData = data.filter((item) => item.id !== id);

    const newRemainingTasks = updatedData.filter(
      (item) => !item.completed
    ).length;
    setRemainingTasks(newRemainingTasks);

    setData(updatedData);
  };

  const addTask = (newTodoName) => {
    const newTodo = {
      id: `todo-${data.length}`,
      name: newTodoName,
      completed: false,
      isEditing: false,
    };

    const newRemainingTasks = remainingTasks + 1;
    setRemainingTasks(newRemainingTasks);

    setData((prevData) => [...prevData, newTodo]);
  };

  const editTask = (id, newName) => {
    const editedTaskList = data.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setData(editedTaskList);
  };

  return (
    <div className="todoapp stack-large">
      <h1>TodoList</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {Object.keys(FILTER_MAP).map((filterKey) => (
          <FilterButton
            key={filterKey}
            filter={filterKey}
            setFilter={onChangeFilter}
            active={currentFilter === filterKey}
          />
        ))}
      </div>
      <h2 id="list-heading">{remainingTasks} tasks remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {filteredTasks.map((item) => {
          return (
            <Todo
              item={item}
              key={item.id}
              onChangeStatus={onChangeStatus}
              onDeleteTodo={onDeleteTodo}
              editTask={editTask}
            />
          );
        })}
      </ul>
    </div>
  );
};

TodoList.propTypes = {
  type: PropTypes.string,
  globalPreventDefault: PropTypes.func,
};

export default TodoList;
