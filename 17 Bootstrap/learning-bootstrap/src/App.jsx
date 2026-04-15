import { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState("all");

  // Load from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add / Update Task
  const addTask = () => {
    if (task.trim() === "") return;

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex].text = task;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: task, completed: false }]);
    }

    setTask("");
  };

  // Edit Task
  const editTask = (index) => {
    setTask(tasks[index].text);
    setEditIndex(index);
  };

  // Toggle Complete
  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  // Delete Task
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  // Clear All Tasks
  const clearAllTasks = () => {
    if (window.confirm("Are you sure you want to delete all tasks?")) {
      setTasks([]);
    }
  };

  // Filter Logic
  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">
        Task Manager 🚀
      </h2>

      {/* Input */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button className="btn btn-primary" onClick={addTask}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="d-flex justify-content-center gap-2 mb-3">
        <button className="btn btn-outline-primary btn-sm" onClick={() => setFilter("all")}>
          All
        </button>

        <button className="btn btn-outline-success btn-sm" onClick={() => setFilter("completed")}>
          Completed
        </button>

        <button className="btn btn-outline-warning btn-sm" onClick={() => setFilter("pending")}>
          Pending
        </button>
      </div>

      {/* Clear All Button */}
      <div className="text-center mb-3">
        <button className="btn btn-danger btn-sm" onClick={clearAllTasks}>
          Clear All
        </button>
      </div>

      {/* No Task Message */}
      {tasks.length === 0 && (
        <p className="text-center text-muted">No tasks yet 😴</p>
      )}

      {/* Task List */}
      {filteredTasks.map((t, index) => (
        <div className="card mb-2" key={index}>
          <div className="card-body d-flex justify-content-between align-items-center">

            <div>
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={t.completed}
                onChange={() => toggleComplete(index)}
              />

              <span
                style={{
                  textDecoration: t.completed ? "line-through" : "none",
                }}
              >
                {t.text}
              </span>
            </div>

            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => editTask(index)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}

export default App;