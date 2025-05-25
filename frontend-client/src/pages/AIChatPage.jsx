// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';

// const AIChatPage = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef(null);
//   const navigate = useNavigate();

//   // Auto-scroll to bottom of chat
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim() || loading) return;

//     // Add user message to chat
//     const userMessage = { text: input, sender: 'user' };
//     setMessages(prev => [...prev, userMessage]);
//     setInput('');
//     setLoading(true);

//     try {
//       // Call your AI API
//       const response = await axios.post('http://localhost:3000/api/ai/prompt', {
//         prompt: input
//       });

//       // Add AI response to chat
//       const aiMessage = {
//         text: response.data.result || "I couldn't process that request",
//         sender: 'ai'
//       };
//       setMessages(prev => [...prev, aiMessage]);
//     } catch (error) {
//       const errorMessage = {
//         text: "Error connecting to AI service",
//         sender: 'ai'
//       };
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full min-h-screen bg-zinc-800 text-white p-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//         className="max-w-4xl mx-auto h-full flex flex-col"
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center text-sky-400 hover:text-sky-300"
//           >
//             <i className="ri-arrow-left-line mr-2"></i> Back
//           </button>
//           <h1 className="text-2xl font-semibold flex items-center">
//             <i className="ri-robot-line mr-3 text-emerald-400"></i>
//             AI Assistant
//           </h1>
//           <div className="w-10"></div> {/* Spacer for balance */}
//         </div>

//         {/* Chat Container */}
//         <div className="flex-1 bg-zinc-900/80 rounded-[40px] p-6 mb-6 overflow-y-auto max-h-[70vh]">
//           {messages.length === 0 ? (
//             <div className="h-full flex flex-col items-center justify-center text-gray-400">
//               <i className="ri-robot-line text-5xl mb-4 text-emerald-400/50"></i>
//               <p>Ask me anything about your documents or request AI assistance</p>
//             </div>
//           ) : (
//             messages.map((message, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div
//                   className={`max-w-[80%] rounded-3xl p-4 ${message.sender === 'user'
//                     ? 'bg-sky-600/90 rounded-br-none'
//                     : 'bg-emerald-600/90 rounded-bl-none'}`}
//                 >
//                   <p className="whitespace-pre-wrap">{message.text}</p>
//                 </div>
//               </motion.div>
//             ))
//           )}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Input Area */}
//         <form onSubmit={handleSubmit} className="bg-zinc-900/80 rounded-[40px] p-6">
//           <div className="flex gap-3">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Type your message..."
//               className="flex-1 bg-zinc-800/50 text-white p-4 rounded-3xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
//               disabled={loading}
//             />
//             <button
//               type="submit"
//               disabled={loading || !input.trim()}
//               className="bg-emerald-600 hover:bg-emerald-700 w-14 h-14 rounded-2xl flex items-center justify-center disabled:opacity-50"
//             >
//               {loading ? (
//                 <span className="animate-spin">🌀</span>
//               ) : (
//                 <i className="ri-send-plane-fill text-xl"></i>
//               )}
//             </button>
//           </div>
//           <p className="text-xs text-gray-400 mt-2 text-center">
//             AI may produce inaccurate information. Verify important details.
//           </p>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default AIChatPage;

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";

// const AIChatPage = () => {
//   const [input, setInput] = useState("");
//   const [responses, setResponses] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const sendPrompt = async () => {
//     if (!input.trim()) return;
//     const userMsg = { role: "user", content: input };
//     setResponses([...responses, userMsg]);
//     setInput("");
//     setLoading(true);

//     try {
//       const { data } = await axios.post("http://localhost:3000/api/ai/prompt", {
//         prompt: input,
//       });

//       const aiMsg = { role: "ai", content: data.response || "No response received." };
//       setResponses((prev) => [...prev, aiMsg]);
//     } catch (err) {
//       setResponses((prev) => [...prev, { role: "ai", content: "Error fetching response." }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full min-h-screen bg-zinc-800 text-white p-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//         className="max-w-4xl mx-auto"
//       >
//         <h1 className="text-3xl font-bold mb-6 text-center text-sky-400">AI Assistant</h1>

//         <div className="bg-zinc-900/80 rounded-[40px] p-6 shadow-lg shadow-blue-500/10 min-h-[500px] flex flex-col justify-between">
//           <div className="overflow-y-auto max-h-[400px] mb-4 pr-2 scroll-smooth">
//             {responses.map((msg, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.2 }}
//                 className={`mb-4 p-4 rounded-2xl ${
//                   msg.role === "user"
//                     ? "bg-sky-700 text-right ml-auto max-w-[70%]"
//                     : "bg-zinc-700 text-left mr-auto max-w-[70%]"
//                 }`}
//               >
//                 {msg.content}
//               </motion.div>
//             ))}
//             {loading && (
//               <div className="text-gray-400 text-sm animate-pulse">Gemini is typing...</div>
//             )}
//           </div>

//           <div className="flex items-center gap-2">
//             <input
//               type="text"
//               placeholder="Ask Gemini anything..."
//               className="flex-1 bg-zinc-700 p-4 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendPrompt()}
//             />
//             <button
//               onClick={sendPrompt}
//               className="bg-sky-600 hover:bg-sky-700 px-5 py-3 rounded-2xl transition"
//             >
//               <i className="ri-send-plane-2-line text-lg"></i>
//             </button>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default AIChatPage;

// working code

// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';

// const AIChatPage = () => {
//   const [messages, setMessages] = useState([
//     { text: "Hello! I'm your AI assistant. What can I help you with today?", sender: 'ai' }
//   ]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef(null);
//   const navigate = useNavigate();

//   // Auto-scroll to bottom when messages change
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim() || loading) return;

//     // Add user message
//     const userMessage = { text: input, sender: 'user' };
//     setMessages(prev => [...prev, userMessage]);
//     setInput('');
//     setLoading(true);
//     setIsTyping(true);

//     try {
//       // Simulate typing delay (1-2 seconds)
//       await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

//       const response = await axios.post('http://localhost:3000/api/ai/prompt', {
//         prompt: input
//       });

//       // Add AI response
//       const aiMessage = {
//         text: response.data.response|| "I couldn't process that request",
//         sender: 'ai'
//       };
//       setMessages(prev => [...prev, aiMessage]);

//       console.log(response);

//     } catch (error) {
//       setMessages(prev => [...prev, {
//         text: "Error connecting to AI service",
//         sender: 'ai'
//       }]);
//     } finally {
//       setLoading(false);
//       setIsTyping(false);
//     }
//   };

//   return (
//     <div className="w-full h-screen bg-zinc-800 text-white flex flex-col">
//       {/* Header */}
//       <div className="bg-zinc-900/80 p-4 border-b border-zinc-700">
//         <div className="max-w-4xl mx-auto flex justify-between items-center">
//           <button
//             onClick={() => navigate(-1)}
//             className="text-sky-400 hover:text-sky-300 flex items-center"
//           >
//             <i className="ri-arrow-left-line mr-2"></i> Back
//           </button>
//           <h1 className="text-xl font-semibold flex items-center">
//             <i className="ri-robot-line mr-2 text-sky-400"></i>
//             AI Assistant
//           </h1>
//           <div className="w-8"></div> {/* Balance the header */}
//         </div>
//       </div>

//       {/* Chat Container */}
//       <div className="flex-1 overflow-y-auto p-4 pb-24">
//         <div className="max-w-4xl mx-auto space-y-6">
//           {messages.map((message, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.2 }}
//               className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//             >
//               <div
//                 className={`max-w-[80%] rounded-2xl p-4 ${message.sender === 'user'
//                   ? 'bg-sky-600/90 rounded-br-none'
//                   : 'bg-zinc-700/90 rounded-bl-none'}`}
//               >
//                 <p className="whitespace-pre-wrap">{message.text}</p>
//               </div>
//             </motion.div>
//           ))}

//           {isTyping && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="flex justify-start"
//             >
//               <div className="bg-zinc-700/90 rounded-2xl rounded-bl-none p-4 max-w-[80%]">
//                 <div className="flex space-x-2">
//                   <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
//                   <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                   <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           <div ref={messagesEndRef} />
//         </div>
//       </div>

//       {/* Fixed Input Area */}
//       <div className="bg-zinc-900/80 border-t border-zinc-700 p-4 fixed bottom-0 left-0 right-0">
//         <form
//           onSubmit={handleSubmit}
//           className="max-w-4xl mx-auto flex gap-3"
//         >
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Type your message..."
//             className="flex-1 bg-zinc-800 text-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
//             disabled={loading}
//           />
//           <button
//             type="submit"
//             disabled={loading || !input.trim()}
//             className="bg-sky-600 hover:bg-sky-700 w-12 h-12 rounded-xl flex items-center justify-center disabled:opacity-50 transition-colors"
//           >
//             {loading ? (
//               <i className="ri-loader-4-line animate-spin"></i>
//             ) : (
//               <i className="ri-send-plane-fill"></i>
//             )}
//           </button>
//         </form>
//         <p className="text-xs text-center text-gray-400 mt-2">
//           AI may produce inaccurate information. Verify important details.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AIChatPage;

// import React, { useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";

// const AIChatPage = () => {
//   const [messages, setMessages] = useState([
//     { role: "assistant", content: "What can I help you with?" },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const newMessages = [...messages, { role: "user", content: input }];
//     setMessages(newMessages);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await axios.post("http://localhost:3000/api/ai/prompt", { prompt: input });
//       setMessages((prev) => [
//         ...prev,
//         { role: "assistant", content: res.data.response },
//       ]);
//     } catch (err) {
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: "Something went wrong. Please try again.",
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-zinc-900 text-white">
//       {/* Chat container */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((msg, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className={`max-w-xl px-4 py-3 rounded-2xl ${
//               msg.role === "assistant"
//                 ? "bg-zinc-800 self-start"
//                 : "bg-sky-600 self-end"
//             }`}
//           >
//             {msg.content}
//           </motion.div>
//         ))}
//         {loading && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="max-w-xl px-4 py-3 rounded-2xl bg-zinc-800 self-start"
//           >
//             <span className="animate-pulse">Typing...</span>
//           </motion.div>
//         )}
//       </div>

//       {/* Input form */}
//       <form
//         onSubmit={handleSend}
//         className="p-4 bg-zinc-950 border-t border-zinc-700 flex gap-2"
//       >
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           type="text"
//           placeholder="Type your message..."
//           className="flex-1 bg-zinc-800 text-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
//         />
//         <button
//           type="submit"
//           className="bg-sky-600 hover:bg-sky-700 px-4 py-2 rounded-xl"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AIChatPage;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "prism-react-renderer";
import { themes } from "prism-react-renderer";


const AIChatPage = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your AI assistant. What can I help you with today?",
      sender: "ai",
      id: 1,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    // Add user message
    const userMessage = {
      text: input,
      sender: "user",
      id: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setIsTyping(true);

    try {
      // Simulate typing delay (1-2 seconds)
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 + Math.random() * 1000)
      );

      const response = await axios.post("http://localhost:3000/api/ai/prompt", {
        prompt: input,
      });

      // Add AI response
      const aiMessage = {
        text: response.data.response || "I couldn't process that request",
        sender: "ai",
        id: Date.now() + 1,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: "Error connecting to AI service",
          sender: "ai",
          id: Date.now() + 1,
        },
      ]);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };


  // Custom components for Markdown rendering
  const markdownComponents = {
    h1: ({ node, ...props }) => (
      <h1 className="text-2xl font-bold my-3" {...props} />
    ),
    h2: ({ node, ...props }) => (
      <h2 className="text-xl font-bold my-2" {...props} />
    ),
    h3: ({ node, ...props }) => (
      <h3 className="text-lg font-bold my-2" {...props} />
    ),
    p: ({ node, ...props }) => (
      <p className="mb-3 leading-relaxed" {...props} />
    ),
    strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
    em: ({ node, ...props }) => <em className="italic" {...props} />,
    a: ({ node, ...props }) => (
      <a
        className="text-sky-400 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),
    ul: ({ node, ...props }) => (
      <ul className="list-disc pl-5 my-2" {...props} />
    ),
    ol: ({ node, ...props }) => (
      <ol className="list-decimal pl-5 my-2" {...props} />
    ),
    li: ({ node, ...props }) => <li className="mb-1" {...props} />,
    blockquote: ({ node, ...props }) => (
      <blockquote
        className="border-l-4 border-sky-500 pl-4 italic text-gray-300 my-2"
        {...props}
      />
    ),
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          children={String(children).replace(/\n$/, "")}
          language={match[1]}
          style={themes.nightOwl}
          PreTag="div"
          {...props}
        />
      ) : (
        <code
          className="bg-zinc-700 px-1.5 py-0.5 rounded text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    },
    table: ({ node, ...props }) => (
      <div className="overflow-auto my-3">
        <table className="min-w-full divide-y divide-zinc-600" {...props} />
      </div>
    ),
    th: ({ node, ...props }) => (
      <th
        className="px-4 py-2 text-left bg-zinc-700/50 font-semibold"
        {...props}
      />
    ),
    td: ({ node, ...props }) => (
      <td className="px-4 py-2 border-t border-zinc-700" {...props} />
    ),
  };

  return (
    <div className="w-full h-screen bg-zinc-800 text-white flex flex-col">
      {/* Header */}
      <div className="bg-zinc-900/80 p-4 border-b border-zinc-700">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="text-sky-400 hover:text-sky-300 flex items-center"
          >
            <i className="ri-arrow-left-line mr-2"></i> Back
          </button>
          <h1 className="text-xl font-semibold flex items-center">
            <i className="ri-robot-line mr-2 text-sky-400"></i>
            AI Assistant
          </h1>
          <div className="w-8"></div> {/* Balance the header */}
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.sender === "user"
                    ? "bg-sky-600/90 rounded-br-none"
                    : "bg-zinc-700/90 rounded-bl-none"
                }`}
              >
                {message.sender === "ai" ? (
                  <div className="prose prose-invert max-w-none">
                    <ReactMarkdown components={markdownComponents} skipHtml>
                      {message.text}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{message.text}</p>
                )}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-zinc-700/90 rounded-2xl rounded-bl-none p-4 max-w-[80%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Fixed Input Area */}
      <div className="bg-zinc-900/80 border-t border-zinc-700 p-4 fixed bottom-0 left-0 right-0">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-zinc-800 text-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-sky-600 hover:bg-sky-700 w-12 h-12 rounded-xl flex items-center justify-center disabled:opacity-50 transition-colors"
          >
            {loading ? (
              <i className="ri-loader-4-line animate-spin"></i>
            ) : (
              <i className="ri-send-plane-fill"></i>
            )}
          </button>
        </form>
        <p className="text-xs text-center text-gray-400 mt-2">
          AI may produce inaccurate information. Verify important details.
        </p>
      </div>
    </div>
  );
};

export default AIChatPage;
