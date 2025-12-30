import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-gray-800 text-white p-4 mb-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          {isAuthenticated ? (
            <>
              <Link to="/groceries" className="hover:text-gray-300">Groceries</Link>
              <Link to="/about" className="hover:text-gray-300">About</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/signup" className="hover:text-gray-300">Signup</Link>
              <Link to="/about" className="hover:text-gray-300">About</Link>
            </>
          )}
        </div>
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;