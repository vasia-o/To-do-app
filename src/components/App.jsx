import { useRef, useState } from "react";
import "../reset.css";
import "../App.css";

function App() {
    const inputRef = useRef(null);

    const [todos, setTodos] = useState([
        {
            id: 1,
            title: "Finish React Series",
            isComplete: false,
        },
        {
            id: 2,
            title: "Go Grocery",
            isComplete: true,
        },
        {
            id: 3,
            title: "Take over world",
            isComplete: false,
        },
    ]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (inputRef.current.value === "") {
            return;
        }

        const newTodo = {
            id: todos.length + 1,
            title: inputRef.current.value,
            isComplete: false,
        };

        setTodos((prevTodos) => [...prevTodos, newTodo]);
        inputRef.current.value = "";
    };

    const handleCheckboxClick = (clickedTodo) => {
        const todosCopy = [...todos];

        const newTodos = todosCopy.map((item) => {
            if (item.id === clickedTodo.id) {
                item.isComplete = !item.isComplete;
            }
            return item;
        });
        setTodos(newTodos);
    };

    return (
        <div className="todo-app-container">
            <div className="todo-app">
                <h2>Todo App</h2>
                <form onSubmit={handleSubmit} className="form">
                    <input
                        type="text"
                        className="todo-input"
                        placeholder="What do you need to do?"
                        ref={inputRef}
                    />
                    <button className="button">Add</button>
                </form>

                <ul className="todo-list">
                    {todos.map((todo, index) => (
                        <li
                            className="todo-item-container"
                            key={todo.id}
                            onClick={() => {
                                console.log(todo.id);
                            }}
                        >
                            <div className="todo-item">
                                <input
                                    type="checkbox"
                                    checked={todo.isComplete}
                                    onChange={() => handleCheckboxClick(todo)}
                                />
                                {todo.isComplete ? (
                                    <span className="todo-item-label todo-item-striked">
                                        {todo.title}
                                    </span>
                                ) : (
                                    <span className="todo-item-label">
                                        {todo.title}
                                    </span>
                                )}
                            </div>
                            <button className="x-button">
                                <svg
                                    className="x-button-icon"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
