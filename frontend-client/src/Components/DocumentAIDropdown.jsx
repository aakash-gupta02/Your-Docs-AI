import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "prism-react-renderer";
import toast from "react-hot-toast";

export default function DocumentAIDropdown({ documentContent }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");

  const handleAIAction = async (action) => {
    setIsLoading(true);
    setAiResponse(""); // Clear previous response

    try {
      let prompt;

      if (action === "CUSTOM") {
        prompt = customPrompt;
      } else {
        prompt = `${action} this document:\n\n${documentContent}`;
      }

      const response = await axios.post(
        "http://localhost:3000/api/ai/prompt",
        {
          prompt: prompt,
          document: documentContent, // Send both prompt and full document
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Add authorization header if needed
            // 'Authorization': `Bearer ${userToken}`
          },
        }
      );

      setAiResponse(response.data.result || response.data.response); // Adjust based on your API response structure
    } catch (error) {
      console.error("API Error:", error);
      setAiResponse(
        error.response?.data?.message || "Failed to process AI request"
      );
    } finally {
      setIsLoading(false);
      setShowCustomModal(false);
    }
  };

  const actions = [
    { label: "Summarize", icon: "ri-file-list-3-line", action: "Summarize" },
    {
      label: "Correct Grammar",
      icon: "ri-file-check-line",
      action: "Correct the grammar in",
    },
    {
      label: "Simplify Language",
      icon: "ri-chat-smile-2-line",
      action: "Simplify this text:",
    },
    {
      label: "Expand Section",
      icon: "ri-zoom-in-line",
      action: "Expand on this content:",
    },
    { label: "Custom Request...", icon: "ri-magic-line", action: "CUSTOM" },
  ];

  // return (
  //   <div className="relative inline-block text-black  ">
  //     {/* Main AI Button */}
  //     <button
  //       onClick={() => setIsOpen(!isOpen)}
  //       className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
  //         isLoading ? "bg-indigo-400" : "bg-sky-600 hover:bg-sky-700"
  //       } text-white`}
  //       disabled={isLoading}
  //     >
  //       <span>{isLoading ? "Processing..." : "AI Document"}</span>
  //       {/* <span className="" >{isOpen ? <i class="ri-arrow-down-line"></i> : <i class="ri-arrow-up-line"></i>}</span> */}
  //     </button>

  //     {/* Dropdown Menu */}
  //     {isOpen && (
  //       <div className="absolute z-20  mt-2  w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
  //         <div className="py-1">
  //           {actions.map(({ label, icon, action }) => (
  //             <button
  //               key={label}
  //               onClick={() => {
  //                 setIsOpen(false);
  //                 if (action === "CUSTOM") {
  //                   setShowCustomModal(true);
  //                 } else {
  //                   handleAIAction(action);
  //                 }
  //               }}
  //               className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
  //               disabled={isLoading}
  //             >
  //               <span> <i className={`${icon} text-lg mr-3 text-sky-600 `} /> </span>
  //               {label}
  //             </button>
  //           ))}
  //         </div>
  //       </div>
  //     )}

  //     {/* Custom Prompt Modal */}
  //     {showCustomModal && (
  //       <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
  //         <div className="bg-white rounded-lg p-6 w-full max-w-md">
  //           <h3 className="text-lg font-medium mb-4">Custom AI Request</h3>
  //           <textarea
  //             value={customPrompt}
  //             onChange={(e) => setCustomPrompt(e.target.value)}
  //             className="w-full h-40 p-3 border border-gray-300 rounded-md mb-4"
  //             placeholder="Example: 'Convert this to bullet points' or 'Make this more professional'"
  //           />
  //           <div className="flex justify-end gap-2">
  //             <button
  //               onClick={() => setShowCustomModal(false)}
  //               className="px-4 py-2 border rounded hover:bg-gray-50"
  //             >
  //               Cancel
  //             </button>
  //             <button
  //               onClick={() => handleAIAction("CUSTOM")}
  //               className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
  //               disabled={!customPrompt.trim() || isLoading}
  //             >
  //               {isLoading ? "Sending..." : "Submit"}
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     )}

  //     {aiResponse && (
  //       <div className=" mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 prose max-w-none">
  //         <div className="flex justify-between items-center mb-2">
  //           <h3 className="font-medium text-gray-800">AI Response:</h3>
  //           <button
  //             onClick={() => setAiResponse("")}
  //             className="text-gray-500 hover:text-gray-700 text-lg"
  //           >
  //             ×
  //           </button>
  //         </div>
  //         <div className={`${isLoading ? "opacity-70" : ""}`}>
  //           {isLoading ? (
  //             "Generating response..."
  //           ) : (
  //             <ReactMarkdown
  //               components={{
  //                 code({ node, inline, className, children, ...props }) {
  //                   const match = /language-(\w+)/.exec(className || "");
  //                   return !inline && match ? (
  //                     <SyntaxHighlighter
  //                       language={match[1]}
  //                       style={themes.github}
  //                       PreTag="div"
  //                       {...props}
  //                     >
  //                       {String(children).replace(/\n$/, "")}
  //                     </SyntaxHighlighter>
  //                   ) : (
  //                     <code className={className} {...props}>
  //                       {children}
  //                     </code>
  //                   );
  //                 },
  //               }}
  //             >
  //               {aiResponse}
  //             </ReactMarkdown>
  //           )}
  //         </div>
  //       </div>
  //     )}

  //   </div>
  // );

  return (
    <div className="relative inline-block text-black">
      {/* Main AI Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
          isLoading ? "bg-sky-800" : "bg-sky-600 hover:bg-sky-700"
        } text-white`}
        disabled={isLoading}
      >
        <span>{isLoading ? "Processing..." : "AI Document"}</span>
        <i className={`ri-magic-line text-white`} />
      </button>

      {/* Dropdown Menu - Improved Positioning */}
      {isOpen && (
        <div className="absolute z-20 right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-xl ring-1 ring-gray-200">
          <div className="py-1">
            {actions.map(({ label, icon, action }) => (
              <button
                key={label}
                onClick={() => {
                  setIsOpen(false);
                  if (action === "CUSTOM") {
                    setShowCustomModal(true);
                  } else {
                    handleAIAction(action);
                  }
                }}
                className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-800 transition-colors"
                disabled={isLoading}
              >
                <span>
                  <i className={`${icon} text-lg mr-3 text-sky-600`} />
                </span>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Custom Prompt Modal - Improved Design */}
      {showCustomModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md border border-gray-200 overflow-hidden">
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Custom AI Request
                </h3>
                <button
                  onClick={() => setShowCustomModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-close-line text-xl" />
                </button>
              </div>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="w-full h-40 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Example: 'Convert this to bullet points' or 'Make this more professional'"
                autoFocus
              />
            </div>
            <div className="bg-gray-50 px-5 py-4 flex justify-end gap-3">
              <button
                onClick={() => setShowCustomModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md border border-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAIAction("CUSTOM")}
                className={`px-4 py-2 rounded-md text-white ${
                  !customPrompt.trim() || isLoading
                    ? "bg-sky-400 cursor-not-allowed"
                    : "bg-sky-600 hover:bg-sky-700"
                }`}
                disabled={!customPrompt.trim() || isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <i className="ri-loader-4-line animate-spin" /> Sending...
                  </span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Response - Improved Design and Positioning */}
      {aiResponse && (
        <div className="absolute z-10 right-0 mt-2 w-full min-w-[700px] max-w-lg">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden flex flex-col max-h-[80vh]">
            {/* Header */}
            <div className="flex justify-between items-center bg-sky-50 px-4 py-3 border-b border-gray-200">
              <h3 className="font-medium text-sky-800 flex items-center gap-2">
                <i className="ri-ai-generate text-sky-600" /> AI Response
              </h3>
              <button
                onClick={() => setAiResponse("")}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                title="Close"
              >
                <i className="ri-close-line text-lg" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div
              className={`p-4 overflow-y-auto flex-1 ${
                isLoading ? "opacity-80" : ""
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3 text-gray-500 py-8">
                  <i className="ri-loader-4-line animate-spin text-xl" />
                  <span>Generating response...</span>
                </div>
              ) : (
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          language={match[1]}
                          style={themes.github}
                          PreTag="div"
                          className="rounded-md text-sm my-2"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">
                          {children}
                        </code>
                      );
                    },
                    h1: ({ node, ...props }) => (
                      <h2
                        className="text-xl font-semibold mt-4 mb-2 text-gray-800"
                        {...props}
                      />
                    ),
                    h2: ({ node, ...props }) => (
                      <h3
                        className="text-lg font-medium mt-3 mb-1.5 text-gray-800"
                        {...props}
                      />
                    ),
                    p: ({ node, ...props }) => (
                      <p
                        className="text-gray-700 mb-3 leading-relaxed"
                        {...props}
                      />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul
                        className="list-disc pl-5 mb-3 space-y-1"
                        {...props}
                      />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol
                        className="list-decimal pl-5 mb-3 space-y-1"
                        {...props}
                      />
                    ),
                  }}
                >
                  {aiResponse}
                </ReactMarkdown>
              )}
            </div>

            {/* Copy Button - always visible */}
            <div className="bg-gray-50 px-4 py-2 border-t border-gray-200 text-right">
              <button
                onClick={() => {navigator.clipboard.writeText(aiResponse), toast.success("Copied to Clip Board")}
                }
                className="text-sm text-sky-600 hover:text-sky-700 flex items-center gap-1 ml-auto"
              >
                <i className="ri-file-copy-line" /> Copy
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );

  // return(
  // <div className="relative inline-block text-black">
  //   {/* AI Button */}
  //   <button
  //     onClick={() => setIsOpen(!isOpen)}
  //     className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
  //       isLoading ? "bg-indigo-400" : "bg-sky-600 hover:bg-sky-700"
  //     } text-white`}
  //     disabled={isLoading}
  //   >
  //     <span>{isLoading ? "Processing..." : "AI Document"}</span>
  //     <i className={`ri-magic-line text-white`} />
  //   </button>

  //   {/* Dropdown (position-safe) */}
  //   {isOpen && (
  //     <div className="absolute right-0 mt-2 z-40 w-60 bg-white shadow-xl rounded-lg border border-gray-200">
  //       <div className="py-2">
  //         {actions.map(({ label, icon, action }) => (
  //           <button
  //             key={label}
  //             onClick={() => {
  //               setIsOpen(false);
  //               action === "CUSTOM"
  //                 ? setShowCustomModal(true)
  //                 : handleAIAction(action);
  //             }}
  //             className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-sky-50"
  //             disabled={isLoading}
  //           >
  //             <i className={`${icon} text-sky-600 mr-2 text-lg`} />
  //             {label}
  //           </button>
  //         ))}
  //       </div>
  //     </div>
  //   )}

  //   {/* Custom Prompt Modal */}
  //  {showCustomModal && (
  //   <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm p-4">
  //     <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
  //       <h3 className="text-xl font-semibold text-sky-700 mb-4">Custom AI Request</h3>
  //       <textarea
  //         value={customPrompt}
  //         onChange={(e) => setCustomPrompt(e.target.value)}
  //         className="w-full h-36 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 outline-none"
  //         placeholder="E.g. 'Summarize this', 'Improve tone', etc."
  //       />
  //       <div className="flex justify-end mt-4 gap-2">
  //         <button
  //           onClick={() => setShowCustomModal(false)}
  //           className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
  //         >
  //           Cancel
  //         </button>
  //         <button
  //           onClick={() => handleAIAction("CUSTOM")}
  //           className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700"
  //           disabled={!customPrompt.trim() || isLoading}
  //         >
  //           {isLoading ? "Sending..." : "Submit"}
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // )}

  //   {/* AI Response */}
  // {aiResponse && (
  //   <div className="mt-4 p-4 bg-white rounded-xl border border-sky-200 shadow-md max-w-3xl">
  //     <div className="flex justify-between items-center mb-3">
  //       <h3 className="text-lg font-semibold text-sky-800">AI Response:</h3>
  //       <button
  //         onClick={() => setAiResponse("")}
  //         className="text-gray-400 hover:text-gray-700 text-xl"
  //       >
  //         &times;
  //       </button>
  //     </div>
  //     <div className={`prose max-w-none text-gray-800 ${isLoading ? "opacity-70" : ""}`}>
  //       {isLoading ? (
  //         "Generating response..."
  //       ) : (
  //         <ReactMarkdown>{aiResponse}</ReactMarkdown>
  //       )}
  //     </div>
  //   </div>
  // )}

  // </div>

  // )
}
