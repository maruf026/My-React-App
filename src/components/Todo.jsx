import { useState } from "react";
export default function Todo() {
  let tasks = [];
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState(tasks);
  function handleChange(e) {
    setTask(e.target.value);
  }
  function handleAddTask() {
    setTaskList((item) => [
      ...item,
      {
        id: task.length,
        name: task,
        isValid: false,
      },
    ]);
    setTask("");
  }
  function handleDelete(id) {
    setTaskList((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  }
  //   console.log(task);
  return (
    <div>
      <h1 className="text-center text-3xl my-5 font-bold">To Do App</h1>
      <div className="join flex justify-center gap-2">
        <div>
          <label className="input validator join-item">
            <input
              value={task}
              onChange={handleChange}
              className="w-60"
              type="text"
              placeholder="Enter Task.."
            />
          </label>
        </div>
        <button
          onClick={handleAddTask}
          className="btn btn-neutral join-item bg-purple-600"
        >
          Add
        </button>
      </div>

      {/* task list here */}
      <h2 className="text-center text-xl my-5 font-bold">Task List</h2>
      {taskList.length > 0 ? (
        <ul className="flex flex-col items-center gap-3 mt-6">
  {taskList.map((task) => (
    <li
      key={task.id}
      className="w-[300px] flex justify-between items-center px-4 py-1 bg-gray-600 rounded-xl shadow-md hover:shadow-lg transition-all"
    >
      <span className="text-white font-medium">{task.name}</span>
      <button
        onClick={() => handleDelete(task.id)}
        className="btn btn-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
      >
        Delete
      </button>
    </li>
  ))}
</ul>

      ) : (
        <p className="text-center text-gray-500">No tasks yet.</p>
      )}
    </div>
  );
}
