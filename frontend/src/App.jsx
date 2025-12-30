import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Groceries from './pages/Groceries.jsx';
import About from './pages/About.jsx';
import ProtectedRoute from './components/protectedRoute.jsx';
import Navbar from './components/navbar.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/groceries" element={<ProtectedRoute><Groceries /></ProtectedRoute>} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;