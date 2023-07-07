import React, {  useState, createContext, useContext} from "react";
import './index.css';

const TodoContext = createContext();

function Todo({ value, done  }) {
  const { todos, setTodos } = useContext(TodoContext);

  const handleClick = () => {
    const updatedTodos = todos.map((todo) =>
      todo.value === value ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodos);
  };

  if (done) {
    return (
      <div onClick={handleClick} style={{ color: "pink" }}>
        {value}
      </div>
    );
  }

  return <div onClick={handleClick}>{value}</div>;
}


function Navbar() {
  const { todos } = useContext(TodoContext);
  const unfinishedTodos = todos.filter((todo) => !todo.done);

  return (
    <div className="unfinished">
      Unfinished Todos: {unfinishedTodos.length}
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState([
    {
      value: "Go to do shopping",
      done: false,
    },
  ]);

  const [todoValue, setTodoValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setTodos((prevTodos) => [
      { value: todoValue, done: false },
      ...prevTodos
    ]);

    setTodoValue("");
  };

  const handleChange = (e) => {
    setTodoValue(e.target.value);
  };

  const handleCheck = (index) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) =>
  todo.value.toLowerCase().startsWith(searchValue.toLowerCase())
);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <div>
        <Navbar />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <input
            type="text"
            value={todoValue}
            onChange={handleChange}
            placeholder="Add todo"
          />
          <button>Click me</button>
        </form>
      {filteredTodos.map((todo, idx) => (
          <Todo
            key={idx}
            value={todo.value}
            done={todo.done}
            onClick={() => handleCheck(todos.indexOf(todo))}
          />
        ))}
      </div>
    </TodoContext.Provider>
  );
}

export default App;