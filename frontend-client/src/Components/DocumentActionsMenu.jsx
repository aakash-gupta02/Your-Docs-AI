import { useState, useRef } from 'react';
import { FiTrash2, FiEdit, FiShare2, FiDownload, FiCopy, FiMoreVertical } from 'react-icons/fi';
import toast from 'react-hot-toast';
export default function DocumentActionsMenu({ 
  onDelete, 
  onEdit, 
  onShare, 
  onDownload,
  documentName,
  documentContent 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [copied, setCopied] = useState(false);

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Add/remove event listener
  useState(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

const handleCopy = () => {
  const fullText = `Title: ${documentName}\n\nContent:\n${documentContent}`;
  navigator.clipboard.writeText(fullText);
  setCopied(true);
  toast.success("Coied Succesfully")
  setTimeout(() => setCopied(false), 2000);
  setIsOpen(false);
};


  const actions = [
    // { icon: <FiEdit className="mr-2" />, label: "Edit", action: onEdit },
    { icon: <FiShare2 className="mr-2" />, label: "Share", action: onShare },
    { icon: <FiDownload className="mr-2" />, label: "Download", action: onDownload },
    { icon: <FiCopy className="mr-2" />, label: copied ? "Copied!" : "Copy Document", action: handleCopy },
    { icon: <FiTrash2 className="mr-2" />, label: "Delete", action: onDelete, danger: true },
  ];

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white hover:text-indigo-600 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Document actions"
      >
        <FiMoreVertical size={20} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 z-30 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {actions.map(({ icon, label, action, danger }) => (
              <button
                key={label}
                onClick={() => {
                  action?.();
                  setIsOpen(false);
                }}
                className={`flex items-center w-full px-4 py-2 text-sm ${
                  danger 
                    ? 'text-red-600 hover:bg-red-50' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}