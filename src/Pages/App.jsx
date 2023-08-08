import "./App.css";
import TodoList from "./TodoList";

const App = () => {
  const globalPreventDefault = (e) => {
    e.preventDefault();
    console.log("clicked");
  };

  return <TodoList type="list" globalPreventDefault={globalPreventDefault} />;
};

export default App;
