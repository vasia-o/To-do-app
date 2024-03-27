import { useRef, useState } from "react";
import "../reset.css";
import "../App.css";

function App() {
    const inputRef = useRef(null);

    const [todos, setTodos] = useState([
        { id: 1, title: "Finish React Series", isComplete: false },
        { id: 2, title: "Go Grocery", isComplete: true },
        { id: 3, title: "Take over world", isComplete: false },
    ]);

    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

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

    const handleCheckboxClick = (todo) => {
        setTodos(
            todos.map((item) =>
                item.id === todo.id
                    ? { ...item, isComplete: !item.isComplete }
                    : item
            )
        );
    };

    const handleDeleteClick = (todo) => {
        setTodos(todos.filter((item) => item.id !== todo.id));
    };

    const handleEditClick = (todo) => {
        setEditingId(todo.id);
        setEditText(todo.title);
    };

    const handleEditTextChange = (e) => {
        setEditText(e.target.value);
    };

    const handleEditSubmit = (todoId) => {
        setTodos(
            todos.map((todo) =>
                todo.id === todoId ? { ...todo, title: editText } : todo
            )
        );
        setEditingId(null);
        setEditText("");
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
                    {todos.map((todo) => (
                        <li className="todo-item-container" key={todo.id}>
                            <div className="to-do-general-container">
                                <div className="todo-item">
                                    <div className="to-do-container-field">
                                        <input
                                            type="checkbox"
                                            checked={todo.isComplete}
                                            onChange={() =>
                                                handleCheckboxClick(todo)
                                            }
                                        />
                                        {editingId === todo.id ? (
                                            <input
                                                type="text"
                                                value={editText}
                                                onChange={handleEditTextChange}
                                                onBlur={() =>
                                                    handleEditSubmit(todo.id)
                                                }
                                                className="edit-field"
                                                autoFocus
                                            />
                                        ) : (
                                            <span
                                                className={`todo-item-label ${
                                                    todo.isComplete
                                                        ? "todo-item-striked"
                                                        : ""
                                                }`}
                                            >
                                                {todo.title}
                                            </span>
                                        )}
                                    </div>
                                    <div className="to-do-container-buttons">
                                        <button
                                            className="edit-button"
                                            onClick={() =>
                                                handleEditClick(todo)
                                            }
                                        >
                                            <svg
                                                className="edit-button-icon"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            className="x-button"
                                            onClick={() =>
                                                handleDeleteClick(todo)
                                            }
                                        >
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
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
