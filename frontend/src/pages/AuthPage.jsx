import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  // Login state
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginShowPassword, setLoginShowPassword] = useState(false);
  // Signup state
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
  const [signupError, setSignupError] = useState('');
  const [signupShowPassword, setSignupShowPassword] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  // Handlers for login
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    const result = await login(loginData.email, loginData.password);
    if (result.success) {
      navigate('/');
    } else {
      setLoginError(result.message);
    }
  };

  // Handlers for signup
  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignupError('');
    const result = await signup(signupData.name, signupData.email, signupData.password);
    if (result.success) {
      setIsLogin(true);
    } else {
      setSignupError(result.message);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100" style={{ minHeight: 'calc(100vh - 64px)' }}>
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md transition-all duration-500">
        {isLogin ? (
          <>
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={loginShowPassword ? 'text' : 'password'}
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                  <span
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setLoginShowPassword((v) => !v)}
                  >
                    {loginShowPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              {loginError && <div className="text-red-500 mb-2">{loginError}</div>}
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Login</button>
            </form>
            <div className="mt-4 text-center">
              <span>Not registered? </span>
              <button
                className="text-blue-600 hover:underline focus:outline-none"
                onClick={() => setIsLogin(false)}
              >
                Sign up
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">Signup</h1>
            <form onSubmit={handleSignupSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={signupData.name}
                  onChange={handleSignupChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={signupShowPassword ? 'text' : 'password'}
                    name="password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                  <span
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setSignupShowPassword((v) => !v)}
                  >
                    {signupShowPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              {signupError && <div className="text-red-500 mb-2">{signupError}</div>}
              <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Sign up</button>
            </form>
            <div className="mt-4 text-center">
              <span>Already have an account? </span>
              <button
                className="text-blue-600 hover:underline focus:outline-none"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;