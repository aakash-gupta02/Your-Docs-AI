import React from "react";

function InputBar({ showInput, task, setTask, submitHandler }) {
  return (
    <div
      className={`fixed top-6 flex items-center gap-3 transition-all duration-700 ease-in-out z-40 ${
        showInput
          ? "left-1/2 -translate-x-1/2 opacity-100"
          : "-translate-x-full left-0 opacity-0"
      }`}
    >
      <form
        className="flex items-center justify-center gap-5"
        onSubmit={submitHandler}
      >
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          type="text"
          placeholder="Enter your task..."
          className="px-4 py-2 rounded-full outline-none text-black w-64"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
          Add Task
        </button>
      </form>

      
    </div>
  );
}

export default InputBar;
