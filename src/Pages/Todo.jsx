import PropTypes from "prop-types";
import Button from "../Components/Button/Button";
import { useState } from "react";

const Todo = ({ item, onChangeStatus, onDeleteTodo, editTask }) => {
  const { completed, id, name } = item;

  const handleDelete = () => {
    onDeleteTodo(id);
  };

  const [isEditing, setEditing] = useState(false);

  const [newName, setNewName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    editTask(id, newName);
    setNewName("");
    setEditing(false);
  };

  const editingTemplate = (
    <form className="stack-small" onSubmit={(e) => e.preventDefault()}>
      <div className="form-group">
        <label className="todo-label" htmlFor={id}>
          New name for {name}
        </label>
        <input
          id={id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <div className="btn-group">
        <Button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {name}</span>
        </Button>
        <Button
          type="button"
          className="btn btn__primary todo-edit"
          onClick={handleSubmit}
        >
          Save
          <span className="visually-hidden">new name for {name}</span>
        </Button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={id}
          type="checkbox"
          defaultChecked={completed}
          onChange={(e) => onChangeStatus(e, id)}
        />
        <label className="todo-label" htmlFor={id}>
          {name}
        </label>
      </div>
      <div className="btn-group">
        <Button type="button" className="btn" onClick={() => setEditing(true)}>
          Edit <span className="visually-hidden">{name}</span>
        </Button>
        <Button
          type="button"
          className="btn btn__danger"
          onClick={handleDelete}
        >
          Delete <span className="visually-hidden">{name}</span>
        </Button>
      </div>
    </div>
  );

  return (
    <li className="todo stack-small">
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  );
};

Todo.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  onChangeStatus: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default Todo;
