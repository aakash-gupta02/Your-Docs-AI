import { useState } from 'react';
import axios from 'axios';

export default function DocumentAIDropdown({ documentContent }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');

  const handleAIAction = async (action) => {
    setIsLoading(true);
    setAiResponse(''); // Clear previous response
    
    try {
      let prompt;
      
      if (action === 'CUSTOM') {
        prompt = customPrompt;
      } else {
        prompt = `${action} this document:\n\n${documentContent}`;
      }

      const response = await axios.post("http://localhost:3000/api/ai/prompt", {
        prompt: prompt,
        document: documentContent // Send both prompt and full document
      }, {
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${userToken}`
        }
      });

      setAiResponse(response.data.result || response.data.response); // Adjust based on your API response structure
    } catch (error) {
      console.error("API Error:", error);
      setAiResponse(error.response?.data?.message || "Failed to process AI request");
    } finally {
      setIsLoading(false);
      setShowCustomModal(false);
    }
  };

  const actions = [
    { label: "Summarize", icon: "📝", action: "Summarize" },
    { label: "Correct Grammar", icon: "✍️", action: "Correct the grammar in" },
    { label: "Simplify Language", icon: "💬", action: "Simplify this text:" },
    { label: "Expand Section", icon: "🔍", action: "Expand on this content:" },
    { label: "Custom Request...", icon: "✨", action: "CUSTOM" },
  ];

  return (
    <div className="relative inline-block text-black ">
      {/* Main AI Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
          isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
        } text-white`}
        disabled={isLoading}
      >
        <span>{isLoading ? 'Processing...' : 'Document AI'}</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-20 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {actions.map(({ label, icon, action }) => (
              <button
                key={label}
                onClick={() => {
                  setIsOpen(false);
                  if (action === 'CUSTOM') {
                    setShowCustomModal(true);
                  } else {
                    handleAIAction(action);
                  }
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                disabled={isLoading}
              >
                <span className="mr-2">{icon}</span>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Custom Prompt Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Custom AI Request</h3>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="w-full h-40 p-3 border border-gray-300 rounded-md mb-4"
              placeholder="Example: 'Convert this to bullet points' or 'Make this more professional'"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCustomModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAIAction('CUSTOM')}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                disabled={!customPrompt.trim() || isLoading}
              >
                {isLoading ? 'Sending...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Response Display */}
      {aiResponse && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-gray-800">AI Response:</h3>
            <button 
              onClick={() => setAiResponse('')}
              className="text-gray-500 hover:text-gray-700 text-lg"
            >
              ×
            </button>
          </div>
          <div className={`whitespace-pre-wrap text-gray-700 ${
            isLoading ? 'opacity-70' : ''
          }`}>
            {isLoading ? 'Generating response...' : aiResponse}
          </div>
        </div>
      )}
    </div>
  );
}