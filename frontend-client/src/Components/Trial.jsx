import { useState } from "react";

export default function TaskInput() {
  const [showInput, setShowInput] = useState(false);

  return (

    <div className="select-none py-6">
      {/* + Button (Visible when input bar is hidden) */}
      {!showInput && (
        <button
          onClick={() => setShowInput(true)}
          className="bg-blue-600 text-white rounded-full p-4 text-2xl fixed top-6 left-6 z-50 hover:bg-blue-700 transition-all"
        >
          +
        </button>
      )}

      {/* Sliding Input Bar */}
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
            onChange={(e) => {
              settask(e.target.value);
            }}
            type="text"
            placeholder="Enter your task..."
            className="px-4 py-2 rounded-full outline-none text-black w-64"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
            Add Task
          </button>
          -
        </form>

        {/* Cross (×) Button to Hide Input */}
        <button
          onClick={() => setShowInput(false)}
          className="text-white text-2xl font-bold px-3 hover:text-red-500 transition"
        >
          ×
        </button>
      </div>
    </div>
    
  );
}
