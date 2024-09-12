import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useBlocker = (blocker, when) => {
  const navigate = useNavigate();
  const [isBlocking, setIsBlocking] = useState(when);

  useEffect(() => {
    if (!when) return;

    const handleBlockedNavigation = (event) => {
      event.preventDefault();
      blocker();
      return false; // Prevent navigation
    };

    window.addEventListener('beforeunload', handleBlockedNavigation);

    return () => {
      window.removeEventListener('beforeunload', handleBlockedNavigation);
    };
  }, [blocker, when, navigate]);

  return [isBlocking, setIsBlocking];
};

export default useBlocker;
