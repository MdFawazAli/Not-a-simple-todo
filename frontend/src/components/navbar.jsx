import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';
import { FaBars, FaTimes, FaHome } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { FaSignOutAlt } from 'react-icons/fa';
import { MdLocalGroceryStore } from "react-icons/md";
import { FaCircleInfo } from "react-icons/fa6";


const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };


  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    logout();
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const linkClasses = ({ isActive }) =>
    isActive
      ? "px-3 py-2 flex items-center gap-1 rounded bg-blue-600 text-white font-semibold"
      : "px-3 py-2 flex items-center gap-1 rounded hover:bg-blue-700 hover:text-white";



  return (
    <>
      <nav className="bg-gray-800 text-white p-3">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo always visible */}
          <Link to="/" className="block"><img src={logo} alt="Logo" className="h-10 w-10 mr-2 inline-block" /></Link>
          {/* Desktop Navbar */}
          <div className="hidden md:flex space-x-4 items-center">
            <NavLink to="/" className={linkClasses}><FaHome /> Home</NavLink>
            {isAuthenticated ? (
              <>
                <NavLink to="/groceries" className={linkClasses}><MdLocalGroceryStore /> Groceries</NavLink>
                <NavLink to="/about" className={linkClasses}><FaCircleInfo /> About</NavLink>
                <button
                  onClick={handleLogoutClick}
                  className="flex gap-1 items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                ><FaSignOutAlt />Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={linkClasses}>Login</NavLink>
                <NavLink to="/about" className={linkClasses}>About</NavLink>
              </>
            )}
          </div>
          {/* Hamburger for mobile */}
          <button className="md:hidden ml-auto" onClick={() => setSidebarOpen(true)}>
            <FaBars size={28} />
          </button>
        </div>
      </nav>

      {/* Sidebar Drawer for Mobile (from right) */}
      <div className={`fixed inset-0 z-50 transition-all duration-300 ${sidebarOpen ? 'block' : 'pointer-events-none'}`}> 
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setSidebarOpen(false)}
        />
        {/* Sidebar (right) */}
        <aside className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 flex flex-col ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-lg font-bold text-gray-800">Menu</span>
            <button onClick={() => setSidebarOpen(false)}><FaTimes size={22} /></button>
          </div>
          <nav className="flex-1 flex flex-col gap-2 p-4">
            <NavLink to="/" className={linkClasses} onClick={() => setSidebarOpen(false)}><FaHome /> Home</NavLink>
            {isAuthenticated ? (
              <>
                <NavLink to="/groceries" className={linkClasses} onClick={() => setSidebarOpen(false)}><MdLocalGroceryStore /> Groceries</NavLink>
                <NavLink to="/about" className={linkClasses} onClick={() => setSidebarOpen(false)}><FaCircleInfo /> About</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/login" className={linkClasses} onClick={() => setSidebarOpen(false)}>Login</NavLink>
                <NavLink to="/about" className={linkClasses} onClick={() => setSidebarOpen(false)}>About</NavLink>
              </>
            )}
          </nav>
          {/* Logout at bottom */}
          {isAuthenticated && (
            <div className="p-4 border-t mt-auto">
              <button
                onClick={handleLogoutClick}
                className="flex items-center gap-2 w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded justify-center"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </aside>
      </div>

      {/* Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center animate-fade-in">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Are you sure?</h2>
            <p className="mb-6 text-gray-600">Have you completed all your todos?<br />Do you really want to log out?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmLogout}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Yes, Logout
              </button>
              <button
                onClick={handleCancelLogout}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;