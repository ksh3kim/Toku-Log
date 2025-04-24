import React, { useState, useEffect } from 'react';
import AdminGate from './components/AdminGate';
import AdminMode from './components/AdminMode';
import UserMode from './components/UserMode';

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem('admin_verified') === 'true';
    setAuthenticated(verified);
    setIsAdmin(verified);

    const settings = JSON.parse(localStorage.getItem('user_settings') || 'null');
    if (settings) {
      document.body.style.fontFamily = settings.fontFamily;
      document.body.style.fontSize = settings.fontSize;
    }
  }, []);

  const handleAuthSuccess = () => {
    setAuthenticated(true);
    setIsAdmin(true);
  };

  if (!authenticated && !localStorage.getItem('admin_pw')) {
    return <AdminGate onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {isAdmin ? <AdminMode /> : <UserMode />}
    </div>
  );
}