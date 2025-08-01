import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../pages/auth'; // adjust path if needed
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [systemTime, setSystemTime] = useState(new Date().toLocaleTimeString());
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // redirect to login
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center">
        <span className="text-gray-500">Welcome, {user?.role || 'User'}</span>
        <h2 className="text-lg font-semibold ml-2" id="admin-name">
          {user?.fullName || user?.email || 'Loading...'}
        </h2>
      </div>
      <div className="flex items-center space-x-4">
        <span
          id="system-time"
          className="text-gray-500"
          aria-live="polite"
          aria-atomic="true"
        >
          {systemTime}
        </span>
        <div className="relative inline-block text-left">
          <button
            id="profileBtn"
            onClick={toggleMenu}
            type="button"
            className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-haspopup="true"
            aria-expanded={menuOpen}
            aria-label="User menu"
          >
            <svg
              className="w-6 h-6 text-blue-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>

          {menuOpen && (
            <div
              id="dropdownMenu"
              className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="profileBtn"
            >
              <div className="py-1" role="none">
                <a
                  href="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Settings
                </a>
                <button
                  id="logoutBtn"
                  className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
