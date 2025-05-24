// import React from "react";

// function InputBar({ showInput, task, setTask, submitHandler }) {
//   return (
//     <div
//       className={`fixed top-6 flex items-center gap-3 transition-all duration-700 ease-in-out z-40 ${
//         showInput
//           ? "left-1/2 -translate-x-1/2 opacity-100"
//           : "-translate-x-full left-0 opacity-0"
//       }`}
//     >
//       <form
//         className="flex items-center justify-center gap-5"
//         onSubmit={submitHandler}
//       >
//         <input
//           value={task}
//           onChange={(e) => setTask(e.target.value)}
//           type="text"
//           placeholder="Enter your task..."
//           className="px-4 py-2 rounded-full outline-none text-black w-64"
//         />
//         <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
//           Add Task
//         </button>
//       </form>

      
//     </div>
//   );
// }

// export default InputBar;




import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function InputBar() {
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error("Both fields are required.");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/docs/create",
        {
          title,
          content: description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Document uploaded!");
      setTitle("");
      setDescription("");
      setShowInput(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
      console.error(err);
    }
  };

  return (
    <div className="fixed top-6 left-6 z-50">
      <button
        onClick={() => setShowInput(!showInput)}
        className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
      >
        {showInput ? "Close" : "Add Doc"}
      </button>

      {showInput && (
        <form
          onSubmit={submitHandler}
          className="mt-4 bg-white p-4 rounded-xl shadow-lg flex flex-col gap-4 w-80"
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="border px-3 py-2 rounded"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description / Content"
            rows={4}
            className="border px-3 py-2 rounded resize-none"
          ></textarea>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Upload Doc
          </button>
        </form>
      )}
    </div>
  );
}

export default InputBar;
