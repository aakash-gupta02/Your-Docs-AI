import { useState, useEffect } from 'react';

export function useDocTrial() {
  const [docCount, setDocCount] = useState(0);
  const MAX_FREE_DOCS = 3; // Set your limit (3-5)

  useEffect(() => {
    // Initialize from localStorage
    const count = localStorage.getItem('freeDocCount') || 0;
    setDocCount(Number(count));
  }, []);

  const incrementDocCount = () => {
    const newCount = docCount + 1;
    localStorage.setItem('freeDocCount', newCount);
    setDocCount(newCount);
    return newCount;
  };

  const resetDocCount = () => {
    localStorage.removeItem('freeDocCount');
    setDocCount(0);
  };

  const canCreateDoc = docCount < MAX_FREE_DOCS;

  return { docCount,setDocCount, incrementDocCount, resetDocCount, canCreateDoc, MAX_FREE_DOCS };
}