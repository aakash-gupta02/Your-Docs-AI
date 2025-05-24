import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

const DocDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedContent, setEditedContent] = useState('');

  // Fetch document details
  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/docs/read/${id}`);
        setDoc(response.data);
        setEditedContent(response.data.content);
      } catch (error) {
        console.error('Error fetching document:', error);
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
      navigate('/'); // Redirect to home after deletion
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  // Update document
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/api/docs/update/${id}`, {
        content: editedContent
      });
      setDoc({ ...doc, content: editedContent });
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating document:', error);
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
              className="bg-sky-600 hover:bg-sky-700 px-4 py-2 rounded-lg flex items-center"
            >
              <i className="ri-edit-line mr-2"></i> Edit
            </button>
            <button 
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center"
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
          <div className="flex items-center mb-6">
            <span className="text-2xl mr-4">
              <i className="ri-file-text-line"></i>
            </span>
            <h1 className="text-2xl font-semibold">{doc.title}</h1>
          </div>

          <div className="bg-zinc-800/50 rounded-3xl p-6 mb-6">
            <p className="whitespace-pre-line text-gray-300">{doc.content}</p>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>Created: {new Date(doc.createdAt).toLocaleDateString()}</span>
            <span>Size: {doc.size || '2.4 mb'}</span>
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
              <p className="text-gray-300 mb-6">Are you sure you want to delete this document? This action cannot be undone.</p>
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


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// export default function DocDetailPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [doc, setDoc] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editData, setEditData] = useState({ title: '', content: '' });

//   useEffect(() => {
//     axios.get(`http://localhost:3000/api/docs/read/${id}`)
//       .then(res => setDoc(res.data))
//       .catch(err => console.error('Failed to fetch doc', err));
//   }, [id]);

//   const handleDelete = () => {
//     axios.delete(`http://localhost:3000/api/docs/delete/${id}`)
//       .then(() => navigate('/'))
//       .catch(err => console.error('Delete failed', err));
//   };

//   const handleEdit = () => {
//     axios.put(`http://localhost:3000/api/docs/update/${id}`, editData)
//       .then(res => {
//         setDoc(res.data);
//         setShowEditModal(false);
//       })
//       .catch(err => console.error('Edit failed', err));
//   };

//   if (!doc) return <p className="text-white">Loading...</p>;

//   return (
//     <div className="min-h-screen bg-zinc-900 text-white p-10">
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-zinc-800 p-10 rounded-3xl shadow-lg max-w-2xl mx-auto"
//       >
//         <h1 className="text-3xl font-bold text-sky-500 mb-4">{doc.title}</h1>
//         <p className="text-gray-300 mb-6 whitespace-pre-wrap">{doc.content}</p>
//         <div className="flex justify-between">
//           <button
//             onClick={() => setShowEditModal(true)}
//             className="bg-blue-600 hover:bg-blue-700 text-sm px-4 py-2 rounded"
//           >
//             Edit
//           </button>
//           <button
//             onClick={() => setShowDeleteModal(true)}
//             className="bg-red-600 hover:bg-red-700 text-sm px-4 py-2 rounded"
//           >
//             Delete
//           </button>
//         </div>
//       </motion.div>

//       {/* Delete Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//           <div className="bg-zinc-800 p-8 rounded-xl shadow-xl">
//             <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this document?</h2>
//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="px-4 py-2 text-sm bg-gray-600 rounded hover:bg-gray-700"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="px-4 py-2 text-sm bg-red-600 rounded hover:bg-red-700"
//               >
//                 Confirm Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit Modal */}
//       {showEditModal && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//           <div className="bg-zinc-800 p-8 rounded-xl shadow-xl w-[400px]">
//             <h2 className="text-lg font-semibold mb-4 text-sky-400">Edit Document</h2>
//             <input
//               type="text"
//               value={editData.title}
//               onChange={(e) => setEditData({ ...editData, title: e.target.value })}
//               placeholder="Title"
//               className="w-full mb-4 p-2 bg-zinc-700 rounded text-white"
//             />
//             <textarea
//               value={editData.content}
//               onChange={(e) => setEditData({ ...editData, content: e.target.value })}
//               placeholder="Content"
//               className="w-full h-32 p-2 bg-zinc-700 rounded text-white"
//             />
//             <div className="flex justify-end gap-4 mt-4">
//               <button
//                 onClick={() => setShowEditModal(false)}
//                 className="px-4 py-2 text-sm bg-gray-600 rounded hover:bg-gray-700"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleEdit}
//                 className="px-4 py-2 text-sm bg-blue-600 rounded hover:bg-blue-700"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

