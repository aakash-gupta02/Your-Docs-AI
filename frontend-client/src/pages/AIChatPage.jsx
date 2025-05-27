import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import TopActionBar from "../Components/TopActionBar";

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
      console.error("Error:", error);
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

  // Simplified Markdown renderer
  const renderMarkdown = (text) => {
    return (
      <ReactMarkdown
        components={{
          // Basic styling for markdown elements
          p: ({ node, ...props }) => <p className="mb-3" {...props} />,
          strong: ({ node, ...props }) => (
            <strong className="font-bold" {...props} />
          ),
          em: ({ node, ...props }) => <em className="italic" {...props} />,
          h1: ({ node, ...props }) => (
            <h1 className="text-2xl font-bold my-3" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-xl font-bold my-2" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-lg font-bold my-2" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-5 my-2" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-5 my-2" {...props} />
          ),
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          a: ({ node, ...props }) => (
            <a
              className="text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          code: ({ node, ...props }) => (
            <code
              className="bg-gray-700 px-1.5 py-0.5 rounded text-sm font-mono"
              {...props}
            />
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    );
  };

  return (
    <div className="w-full h-screen bg-zinc-800 text-white flex flex-col">
      {/* Header */}
      <div className="bg-zinc-900/80 p-4 border-b border-zinc-700 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors flex-shrink-0"
          >
            <i className="ri-robot-2-line text-2xl" />
            <span className="font-bold text-xl hidden sm:inline">
              Your Docs - AI
            </span>
          </Link>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="text-sky-400 hover:text-sky-300 flex items-center text-sm sm:text-base"
            >
              <i className="ri-arrow-left-line mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Back</span>
            </button>

            <div className="ml-2">
              <TopActionBar />
            </div>
          </div>
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
                  <div className="max-w-none">{renderMarkdown(message.text)}</div>
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