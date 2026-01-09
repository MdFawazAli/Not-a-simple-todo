import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';
import { FaBars, FaTimes, FaHome } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { FaSignOutAlt } from 'react-icons/fa';
import { MdLocalGroceryStore } from "react-icons/md";
import { FaCircleInfo } from "react-icons/fa6";


const Navbar = () => {
  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
    setSidebarOpen(false);
  };
  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    setSidebarOpen(false);
    logout();
  };
  const linkClasses = ({ isActive }) =>
    (isActive
      ? "px-3 py-2 flex items-center bg-blue-500 shadow-md shadow-blue-500/50 gap-1 rounded text-white font-semibold drop-shadow-lg"
      : "px-3 py-2 flex items-center gap-1 rounded hover:bg-blue-700 hover:text-white hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.7)] hover:ring-2 hover:ring-blue-400/60 hover:scale-105")
    +
    " cursor-pointer transition-all duration-200 ease-in-out";
  const { isAuthenticated, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
    setSidebarOpen(false);
  };



  return (
    <React.Fragment>
      <nav className="backdrop-blur-md bg-linear-to-r from-blue-800/80 via-blue-600/70 to-purple-700/80 shadow-lg shadow-blue-900/30 text-white p-3 z-40 rounded-b-2xl border-b border-white/10">
        <div className="container mx-auto flex justify-between items-center px-2 sm:px-6 py-1">
          {/* Logo always visible */}
          <Link to="/" className="block"><img src={logo} alt="Logo" className="h-11 w-11 mr-3 drop-shadow-lg rounded-full border-2 border-white/30 bg-white/10 p-1" /></Link>
          {/* Desktop Navbar */}
          <div className="hidden md:flex items-center text-lg font-medium gap-2">
            {/* Main navigation links */}
            <NavLink to="/" className={linkClasses}><FaHome className="mr-1" /> Home</NavLink>
            {isAuthenticated && (
              <NavLink to="/groceries" className={linkClasses}><MdLocalGroceryStore className="mr-1" /> Groceries</NavLink>
            )}
            <NavLink to="/about" className={linkClasses}><FaCircleInfo className="mr-1" /> About</NavLink>
            {/* Spacer */}
            <span className="mx-2 border-l border-white/20 h-6"></span>
            {/* Auth controls */}
            {isAuthenticated ? (
              <button
                onClick={handleLogoutClick}
                className="flex gap-1 items-center relative bg-linear-to-r from-red-500 via-pink-500 to-purple-500 hover:from-red-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded hover:ring-2 hover:ring-pink-400/60 transition-all duration-200 cursor-pointer overflow-hidden group"
                style={{ zIndex: 1 }}
              >
                <span className="absolute inset-0 bg-linear-to-r from-pink-400 via-purple-400 to-red-400 opacity-0 group-hover:opacity-30 blur-lg transition-all duration-300 pointer-events-none animate-pulse" style={{zIndex:0}}></span>
                <span className="relative z-10 flex items-center gap-1">
                  <FaSignOutAlt />Logout
                </span>
              </button>
            ) : null}
          </div>
          {/* Hamburger for mobile */}
          <button className="md:hidden ml-auto cursor-pointer transition-all duration-200 hover:scale-110" onClick={() => setSidebarOpen(true)}>
            <FaBars size={28} />
          </button>
        </div>
      </nav>
      {/* Overlay */}
      {/* Sidebar Overlay */}
      {/* Blurred dark overlay */}
      {/* Sidebar Overlay and Sidebar */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} bg-linear-to-br from-blue-200/60 via-purple-100/60 to-white/80 backdrop-blur-sm`}
        onClick={() => setSidebarOpen(false)}
        style={{ zIndex: 51 }}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-72 max-w-full bg-linear-to-b from-blue-200/90 via-purple-100/90 to-white/90 border-l border-blue-200/40 shadow-2xl flex flex-col backdrop-blur-xl z-60 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ zIndex: 52 }}
      >
        <div className="flex items-center justify-between p-4 border-b border-blue-200/40">
          <span className="text-lg font-bold text-black tracking-wide">Menu</span>
          <button onClick={() => setSidebarOpen(false)} className="hover:text-red-500 transition cursor-pointer"><FaTimes size={22} /></button>
        </div>
        <nav className="flex-1 flex flex-col gap-2 p-4 text-black">
          <NavLink to="/" className={linkClasses} onClick={() => setSidebarOpen(false)}><FaHome /> Home</NavLink>
          {isAuthenticated && (
            <NavLink to="/groceries" className={linkClasses} onClick={() => setSidebarOpen(false)}><MdLocalGroceryStore /> Groceries</NavLink>
          )}
          <NavLink to="/about" className={linkClasses} onClick={() => setSidebarOpen(false)}><FaCircleInfo /> About</NavLink>
        </nav>
        {/* Logout at bottom */}
        {isAuthenticated && (
          <div className="p-4 border-t border-blue-200/40 mt-auto">
            <button
              onClick={handleLogoutClick}
              className="flex items-center gap-2 w-full relative bg-linear-to-r from-red-500 via-pink-500 to-purple-500 hover:from-red-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded hover:ring-2 hover:ring-pink-400/60 transition-all duration-200 cursor-pointer overflow-hidden group"
              style={{ zIndex: 1 }}
            >
              <span className="absolute inset-0 bg-linear-to-r from-pink-400 via-purple-400 to-red-400 opacity-0 group-hover:opacity-30 blur-lg transition-all duration-300 pointer-events-none animate-pulse" style={{zIndex:0}}></span>
              <span className="relative z-10 flex items-center gap-2">
                <FaSignOutAlt /> Logout
              </span>
            </button>
          </div>
        )}
      </aside>
      {/* Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60 z-50 transition-all duration-300 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center scale-100 opacity-100 transition-all duration-300 animate-modal-in">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Are you sure?</h2>
            <p className="mb-6 text-gray-600">Have you completed all your todos?<br />Do you really want to log out?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition cursor-pointer duration-200 shadow-md"
              >
                Yes, Logout
              </button>
              <button
                onClick={handleCancelLogout}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition cursor-pointer duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Navbar;