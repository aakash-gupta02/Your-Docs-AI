import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import CardTask from "./CardTask"; //
import { toast } from "react-toastify";
import InputForm from "./InputForm";
import TopActionBar from "./TopActionBar";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useDocTrial } from "./useDocTrial";

function ForeBg() {
  const [docs, setDocs] = useState([]);
  const [dragConstraints, setDragConstraints] = useState(null);

  const { user } = useAuth();

  const ref = useRef();

  const {
    docCount,
    setDocCount,
    incrementDocCount,
    canCreateDoc,
    MAX_FREE_DOCS,
  } = useDocTrial();

  useEffect(() => {
    if (ref.current) {
      setDragConstraints(ref);
    }
  }, [ref]);

  const fetchDocs = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/docs/alldocs",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDocs(data);
    } catch (err) {
      toast.error("Failed to fetch documents");
      console.error(err);
    }
  };

  // {user &&
  // useEffect(() => {
  //   fetchDocs();
  // }, []);

  // }

  // useEffect(() => {
  //   if (user) {
  //     fetchDocs();
  //   } else {
  //     const localDocs = JSON.parse(localStorage.getItem("freeDocs") || "[]");
  //     setDocs(localDocs);
  //   }
  // }, [user]);

  const refreshDocs = () => {
    if (user) {
      fetchDocs();
    } else {
      const localDocs = JSON.parse(localStorage.getItem("freeDocs") || "[]");
      setDocs(localDocs);
      
    }
  };

  // useEffect
  useEffect(() => {
    refreshDocs();
  }, [user]);

  return (
    <div className="p-6 flex flex-wrap gap-6">
      
      <div className="flex items-center justify-between w-full  ">
        {/* <div className="flex-shrink-0">
          <Link
            to="/"
            className="text-sky-400 font-bold text-xl flex items-center gap-1"
          >
            <i class="ri-robot-2-line"></i> Your Docs - AI
            {!user && (
              <div className="mb-4 text-sm absolute w-fit right-64 text-yellow-500">
                Free trial: {docCount}/{MAX_FREE_DOCS} documents
              </div>
            )}
          </Link>
        </div> */}

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors"
          >
            <i className="ri-robot-2-line text-2xl"></i>
            <span className="font-bold text-xl">Your Docs - AI</span>
          </Link>

          {!user && (
            <div className="bg-slate-800/50 px-3 py-1 rounded-full text-sm text-yellow-400">
              {docCount}/{MAX_FREE_DOCS} Free Document
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <TopActionBar />
          <InputForm onDocCreated={refreshDocs} />
        </div>
      </div>

      <div
        ref={ref}
        className="fixed inset-0 overflow-hidden z-[3] p-6 flex flex-wrap gap-8 mt-12 "
      >
        {docs.length === 0 ? (
          <p className="text-gray-500">No documents found.</p>
        ) : (
          dragConstraints &&
          docs.map((doc) => (
            <CardTask
              key={doc._id || doc.id}
              data={doc}
              dragConstraints={dragConstraints}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ForeBg;

// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import CardTask from "./CardTask";
// import { toast } from "react-toastify";
// import TopActionBar from "./TopActionBar";

// function ForeBg() {
//   const [docs, setDocs] = useState([]);
//   const [dragConstraints, setDragConstraints] = useState(null);
//   const [refreshTrigger, setRefreshTrigger] = useState(0);
//   const ref = useRef();

//   // Set drag constraints
//   useEffect(() => {
//     if (ref.current) {
//       setDragConstraints(ref);
//     }
//   }, [ref]);

//   // Fetch documents with auth
//   const fetchDocs = async () => {
//     try {
//       const { data } = await axios.get(
//         "http://localhost:3000/api/docs/alldocs",
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       setDocs(data);
//     } catch (err) {
//       toast.error("Failed to fetch documents");
//       console.error(err);
//     }
//   };

//   // Initial fetch + watch refresh trigger
//   useEffect(() => {
//     fetchDocs();
//   }, [refreshTrigger]);

//   // Handle new doc creation from child components
//   const handleNewDoc = () => {
//     setRefreshTrigger(prev => prev + 1);
//     toast.success("Document created successfully!");
//   };

//   return (
//     <div className="p-6">
//       <TopActionBar />

//       <div
//         ref={ref}
//         className="fixed inset-0 overflow-y-auto z-[3] p-6 pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12"
//       >
//         {docs.length === 0 ? (
//           <div className="absolute inset-0 flex items-center justify-center">
//             <p className="text-gray-500 text-lg">No documents found. Create one to get started!</p>
//           </div>
//         ) : (
//           dragConstraints &&
//           docs.map((doc) => (
//             <CardTask
//               key={doc._id}
//               data={doc}
//               dragConstraints={dragConstraints}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default ForeBg;
