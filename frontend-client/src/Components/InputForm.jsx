import { motion } from "framer-motion";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

import toast from "react-hot-toast";
function InputBar({ onDocCreated }) {
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const {user} = useAuth()

  const submitHandler = async (e) => {
    e.preventDefault();


    if (!title.trim() || !description.trim()) {
      toast.error("Both fields are required.");
      return;
    }

      if (!user) {
      toast.error("Please login to Create a Docs");
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
      onDocCreated()
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
      console.error(err);
    }
  };

  return (
    <div className=" z-50 text-white">
<button
  onClick={() => setShowInput(!showInput)}
  className="group flex items-center overflow-hidden bg-sky-600 hover:bg-sky-700 text-white rounded-full transition-all duration-300 pl-3 pr-3 py-2 max-w-[44px] hover:max-w-[160px]"
>
  <i className="ri-add-line text-lg font-extrabold " />
  <span className="ml-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    Add Doc
  </span>
</button>


      {showInput && (
    
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setShowInput(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-zinc-900 rounded-3xl p-8 max-w-2xl w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4">Add Document</h3>

            <input
            placeholder="Enter Title here!"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="w-full bg-zinc-800/50 rounded-2xl p-4 text-gray-300 min-h-[20px] mb-6 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />

            <textarea
            placeholder="Enter Description here!"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-zinc-800/50 rounded-2xl p-4 text-gray-300 min-h-[200px] mb-6 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowInput(false)}
                className="px-4 py-2 rounded-lg border border-gray-600 hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                onClick={submitHandler}
                className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 flex items-center"
              >
                <i className="ri-save-line mr-2"></i> Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default InputBar;
