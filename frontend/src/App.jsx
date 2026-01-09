import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import AuthPageWithFooter from './pages/AuthPage.jsx';
import { AnimatePresence, motion } from 'framer-motion';
import Groceries from './pages/Groceries.jsx';
import About from './pages/About.jsx';
import ProtectedRoute from './components/protectedRoute.jsx';
import Navbar from './components/navbar.jsx';
import Loader from './components/loader.jsx';

function AnimatedRoutes() {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={pathname}>
        <Route
          path="/"
          element={
            <motion.div
              key={pathname}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5 }}
            >
              <ProtectedRoute><Home /></ProtectedRoute>
            </motion.div>
          }
        />
        <Route
          path="/login"
          element={
            <motion.div
              key={pathname}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5 }}
            >
              <AuthPageWithFooter />
            </motion.div>
          }
        />
        <Route
          path="/signup"
          element={
            <motion.div
              key={pathname}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5 }}
            >
              <AuthPageWithFooter />
            </motion.div>
          }
        />
        <Route
          path="/groceries"
          element={
            <motion.div
              key={pathname}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5 }}
            >
              <ProtectedRoute><Groceries /></ProtectedRoute>
            </motion.div>
          }
        />
        <Route
          path="/about"
          element={
            <motion.div
              key={pathname}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5 }}
            >
              <About />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <Navbar />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;