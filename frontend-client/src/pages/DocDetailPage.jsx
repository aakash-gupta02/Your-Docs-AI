import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DocumentAIDropdown from "../Components/DocumentAIDropdown";

const DocDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [editedTitle, seteditedTitle] = useState("");

  // Fetch document details
  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/docs/read/${id}`
        );
        setDoc(response.data);
        seteditedTitle(response.data.title);
        setEditedContent(response.data.content);
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoc();
  }, [id]);

  // Delete document
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/docs/delete/${id}`);
      navigate("/"); // Redirect to home after deletion
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  // Update document
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/api/docs/update/${id}`, {
        title: editedTitle,
        content: editedContent,
      });
      setDoc({ ...doc, title: editedTitle, content: editedContent });
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([doc.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${doc.title || "document"}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Download Started!!");
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: doc.title,
        text: doc.content.substring(0, 100) + "...",
        url: window.location.href,

      });
      toast.success('Share or Copy the Link!');


    } catch (err) {
      // Fallback for non-share API browsers
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-zinc-800 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-zinc-800 text-white">
        <p>Document not found</p>
      </div>
    );
  }

  const getByteSize = (text) => new TextEncoder().encode(text).length;

  const formatBytes = (bytes) => {
    if (bytes < 1024) return `${bytes} bytes`;
    else if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    else return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const contentSize = formatBytes(getByteSize(doc.content));

  return (
    <div className="w-full min-h-screen bg-zinc-800 text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header with actions */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-sky-400 hover:text-sky-300"
          >
            <i className="ri-arrow-left-line mr-2"></i> Back
          </button>
          <div className="flex gap-4">
            <button
              onClick={() => setShowEditModal(true)}
              // className="bg-sky-600 hover:bg-sky-700 px-4 py-2 rounded-lg flex items-center"
              className="rounded-lg flex items-center text-white hover:text-green-500"
            >
              <i className="ri-edit-line mr-2"></i> Edit
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              // className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center"
              className="rounded-lg flex items-center texwhtext-white hover:text-red-700"
            >
              <i className="ri-delete-bin-line mr-2"></i> Delete
            </button>
          </div>
        </div>

        {/* Document Card */}
        <motion.div
          className="w-full bg-zinc-900/80 rounded-[40px] p-8 relative overflow-hidden shadow-lg shadow-blue-500/10"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex justify-between items-center mb-6 ">
            <div className="flex items-center ">
              <span className="text-2xl mr-4">
                <i className="ri-file-text-line"></i>
              </span>
              <h1 className="text-2xl font-semibold">{doc.title}</h1>
            </div>

            <div className="flex items-center gap-1">

 <DocumentAIDropdown documentContent={doc.content} />

              <button
                onClick={handleDownload}
                className="p-2 rounded-md hover:bg-zinc-600 transition duration-200"
              >
                <i className="ri-download-line text-lg"></i>
              </button>

              <button
                onClick={handleShare}
                className="p-2 rounded-md hover:bg-zinc-600 transition duration-200"
              >
                <i className="ri-share-line text-lg"></i>
              </button>
            </div>
          </div>
          {/* <div className="flex gap-3">
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
            >
              share{" "}
            </button>
            <button onClick={()=>{
              handleDownload()
            }} >Download</button>
          </div> */}

          <div className="bg-zinc-800/50 rounded-3xl p-6 mb-6">
            <p className="whitespace-pre-line text-gray-300">{doc.content}</p>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>Created: {new Date(doc.createdAt).toLocaleDateString()}</span>
            <span>Size: {contentSize || "2.4 mb"}</span>
          </div>
        </motion.div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-zinc-900 rounded-3xl p-8 max-w-md w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4">Delete Document</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete this document? This action
                cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded-lg border border-gray-600 hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 flex items-center"
                >
                  <i className="ri-delete-bin-line mr-2"></i> Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Edit Modal */}
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-zinc-900 rounded-3xl p-8 max-w-2xl w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4">Edit Document</h3>

              <input
                type="text"
                value={editedTitle}
                onChange={(e) => {
                  seteditedTitle(e.target.value);
                }}
                className="w-full bg-zinc-800/50 rounded-2xl p-4 text-gray-300 min-h-[20px] mb-6 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />

              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full bg-zinc-800/50 rounded-2xl p-4 text-gray-300 min-h-[200px] mb-6 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 rounded-lg border border-gray-600 hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 flex items-center"
                >
                  <i className="ri-save-line mr-2"></i> Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default DocDetailPage;
