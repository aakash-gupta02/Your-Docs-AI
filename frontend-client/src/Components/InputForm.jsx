import { motion } from "framer-motion";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useDocTrial } from "./useDocTrial";

import toast from "react-hot-toast";

function InputBar({ onDocCreated }) {
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [docData, setDocData] = useState({
    title: "",
    content: "", // Changed from 'description' to match your backend
  });

  const { user } = useAuth();

  const {
    docCount,
    setDocCount,
    incrementDocCount,
    canCreateDoc,
    MAX_FREE_DOCS,
  } = useDocTrial();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDocData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSubmit = async () => {
  //   // Validate inputs
  //   if (!docData.title.trim() || !docData.content.trim()) {
  //     toast.error("Title and content are required");
  //     return;
  //   }

  //   try {
  //     if (!user) {
  //       // Local storage save
  //       const localDocs = JSON.parse(localStorage.getItem("freeDocs") || []);
  //       const newDoc = {
  //         ...docData,
  //         id: `local-${Date.now()}`,
  //         createdAt: new Date().toISOString(),
  //       };

  //       localStorage.setItem(
  //         "freeDocs",
  //         JSON.stringify([...localDocs, newDoc])
  //       );
  //       localStorage.setItem("freeDocCount", localDocs.length + 1);

  //       toast.success("Document saved locally");
  //       onDocCreated();

  //     } else {
  //       // API save
  //       await axios.post("/api/documents", docData);
  //       toast.success("Document saved to cloud");
  //     }

  //     setShowInput(false);
  //     setDocData({ title: "", content: "" }); // Reset form
  //     onDocCreated();
  //   } catch (error) {
  //     toast.error("Failed to save document");
  //     console.error(error);
  //   }
  // };
  const handleSubmit = async () => {
    // Validate inputs
    if (!docData.title?.trim()) {
      toast.error("Document title is required");
      return;
    }
    if (!docData.content?.trim()) {
      toast.error("Document content is required");
      return;
    }

    try {
      if (!user) {
        // LOCAL STORAGE SAVE (Free Trial)
        const storedDocs = localStorage.getItem("freeDocs");
        const localDocs = storedDocs ? JSON.parse(storedDocs) : [];

        // Strict limit check
        if (localDocs.length >= MAX_FREE_DOCS) {
          toast.error(`Free trial limit reached (${MAX_FREE_DOCS} documents)`);
          return;
        }

        const newDoc = {
          title: docData.title.trim(),
          content: docData.content.trim(),
          id: `local-${Date.now()}`,
          createdAt: new Date().toISOString(),
        };

        const updatedDocs = [...localDocs, newDoc];

        // Save to localStorage
        localStorage.setItem("freeDocs", JSON.stringify(updatedDocs));
        localStorage.setItem("freeDocCount", updatedDocs.length.toString());

        // Update state
        setDocCount(updatedDocs.length);
        setDocData({ title: "", content: "" });
        setShowInput(false);

        toast.success(
          `Document saved locally (${updatedDocs.length}/${MAX_FREE_DOCS})`
        );
        // onSuccess();
        onDocCreated();
      } else {
        // API SAVE (Logged-in Users)
        const response = await axios.post(
          "http://localhost:3000/api/docs/create",
          {
            title: docData.title.trim(),
            content: docData.content.trim(),
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 201) {
          toast.success("Document saved to cloud!");
          setDocData({ title: "", content: "" });
          setShowInput(false);
          onDocCreated();
          // onSuccess();
        } else {
          throw new Error(response.data.message || "Failed to save document");
        }
      }
    } catch (error) {
      console.error("Save error:", error);

      const errorMsg = !user
        ? "Error saving to local storage (check console)"
        : error.response?.data?.message || "Failed to save to server";

      toast.error(errorMsg);

      // Rollback local storage on failure
      if (!user) {
        try {
          const current = localStorage.getItem("freeDocs");
          const currentDocs = current ? JSON.parse(current) : [];

          if (currentDocs.length > docCount) {
            localStorage.setItem(
              "freeDocs",
              JSON.stringify(currentDocs.slice(0, docCount))
            );
          }
        } catch (rollbackError) {
          console.error("Rollback failed:", rollbackError);
        }
      }
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
              name="title"
              value={docData.title}
              onChange={handleChange}
              className="w-full bg-zinc-800/50 rounded-2xl p-4 text-gray-300 min-h-[20px] mb-6 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />

            <textarea
              placeholder="Enter description"
              name="content" // Changed from 'description'
              value={docData.content}
              onChange={handleChange}
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
                onClick={handleSubmit}
                className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 flex items-center"
              >
                <i className="ri-save-line mr-2"></i> Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* {showInput && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Create New Document</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={docData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-700 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Content
                </label>
                <textarea
                  name="content" // Changed from 'description'
                  value={docData.content}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-700 rounded-md min-h-[120px]"
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowInput(false)}
                  className="px-4 py-2 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-sky-600 text-white rounded-md text-sm"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default InputBar;
