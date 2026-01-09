import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import MobileAuthCard from '../components/MobileAuthCard';
import Footer from '../components/Footer';

// Responsive AuthPage with animated overlay and card flip
function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginShowPassword, setLoginShowPassword] = useState(false);
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
  const [signupError, setSignupError] = useState('');
  const [signupShowPassword, setSignupShowPassword] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  // For mobile card flip
  const [isFlipping, setIsFlipping] = useState(false);

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

  // Responsive check
  const isMobile = window.innerWidth < 640;

  // Overlay messages
  const overlayContent = isLogin
    ? {
      title: 'Welcome back!',
      text: 'Glad to see you again. Please login to continue your productivity journey!'
    }
    : {
      title: 'Welcome!',
      text: 'Join us and start organizing your life with style and ease!'
    };

  // Handle flip for mobile
  const handleSwitch = (login) => {
    if (isMobile) {
      setIsFlipping(true);
      setTimeout(() => {
        setIsLogin(login);
        setIsFlipping(false);
      }, 400); // match CSS transition duration
    } else {
      setIsLogin(login);
    }
  };

  // Desktop: side by side with overlay
  // Mobile: single card with flip
    return (
      <div className="auth-bg w-full min-h-screen flex items-center justify-center px-2 transition-colors duration-500 overflow-hidden">
        {/* Desktop layout */}
        <div className="hidden sm:flex relative w-175 h-135 bg-white rounded-2xl  border border-blue-200 overflow-hidden transition-all duration-500 items-stretch">
          {/* Forms */}
          <div className="flex w-full h-full z-10">
            {/* Login */}
            <div className="w-1/2 flex flex-col justify-center items-center px-8 py-4">
              <h1 className="text-2xl font-extrabold mb-4 text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-500">Login</h1>
              <form onSubmit={handleLoginSubmit} className="w-full max-w-xs">
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    className="w-full px-4 py-3 border-2 border-blue-300 bg-white text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                    required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold">Password</label>
                  <div className="relative">
                    <input
                      type={loginShowPassword ? 'text' : 'password'}
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      className="w-full px-4 py-3 border-2 border-blue-300 bg-white text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                      required />
                    <span
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-blue-400 hover:text-blue-600"
                      onClick={() => setLoginShowPassword((v) => !v)}
                    >
                      {loginShowPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
                {loginError && <div className="text-red-500 mb-2 font-semibold">{loginError}</div>}
                <button type="submit" className="w-full bg-linear-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:from-blue-600 hover:to-purple-600 transition-all duration-200 mb-4">Login</button>
                <div className="mt-4 text-center">
                  <span>Not registered? </span>
                  <button
                    className="text-blue-600 hover:underline focus:outline-none font-semibold"
                    type="button"
                    onClick={() => handleSwitch(false)}
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
            {/* Signup */}
            <div className="w-1/2 flex flex-col justify-center items-center px-8 py-4">
              <h1 className="text-2xl font-extrabold mb-4 text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-blue-500">Signup</h1>
              <form onSubmit={handleSignupSubmit} className="w-full max-w-xs">
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={signupData.name}
                    onChange={handleSignupChange}
                    className="w-full px-4 py-3 border-2 border-purple-300 bg-white text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                    required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    className="w-full px-4 py-3 border-2 border-purple-300 bg-white text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                    required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold">Password</label>
                  <div className="relative">
                    <input
                      type={signupShowPassword ? 'text' : 'password'}
                      name="password"
                      value={signupData.password}
                      onChange={handleSignupChange}
                      className="w-full px-4 py-3 border-2 border-purple-300 bg-white text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                      required />
                    <span
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-purple-400 hover:text-purple-600"
                      onClick={() => setSignupShowPassword((v) => !v)}
                    >
                      {signupShowPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <ul className="text-xs text-gray-500 mt-1 ml-1 list-disc pl-4">
                    <li>At least 8 characters</li>
                    <li>At least one uppercase letter</li>
                    <li>At least one lowercase letter</li>
                    <li>At least one number</li>
                    <li>At least one special character (!@#$%^&amp;*)</li>
                  </ul>
                </div>
                {signupError && <div className="text-red-500 mb-2 font-semibold">{signupError}</div>}
                <button type="submit" className="w-full bg-linear-to-r from-purple-500 to-blue-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:from-purple-600 hover:to-blue-600 transition-all duration-200 mb-2">Sign up</button>
                <div className="text-center">
                  <span>Already have an account? </span>
                  <button
                    className="text-purple-600 hover:underline focus:outline-none font-semibold"
                    type="button"
                    onClick={() => handleSwitch(true)}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* Overlay */}
          <div
            className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-500 z-20 flex flex-col items-center justify-center px-8 py-6 bg-linear-to-br from-blue-400 to-purple-400 text-white rounded-2xl shadow-xl ${isLogin ? 'translate-x-full' : 'translate-x-0'}`}
            style={{ pointerEvents: 'none' }}
          >
            <h2 className="text-3xl font-bold mb-2">{overlayContent.title}</h2>
            <p className="text-lg font-medium text-white/90 text-center max-w-xs">{overlayContent.text}</p>
          </div>
        </div>
        {/* Mobile layout */}
        <div className="sm:hidden w-full min-h-[calc(100vh-120px)]">
          <MobileAuthCard
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            loginData={loginData}
            setLoginData={setLoginData}
            loginError={loginError}
            loginShowPassword={loginShowPassword}
            setLoginShowPassword={setLoginShowPassword}
            handleLoginSubmit={handleLoginSubmit}
            signupData={signupData}
            setSignupData={setSignupData}
            signupError={signupError}
            signupShowPassword={signupShowPassword}
            setSignupShowPassword={setSignupShowPassword}
            handleSignupSubmit={handleSignupSubmit}
            isFlipping={isFlipping}
            handleSwitch={handleSwitch}
          />
        </div>
      </div>
    );
}


// AuthPage with Footer wrapper
function AuthPageWithFooter() {
  return (
    <div className="flex flex-col min-h-screen bg-linear-to-r from-blue-100 via-purple-100 to-white">
      <div className="flex-1 flex justify-center items-center">
        <AuthPage />
      </div>
      <Footer />
    </div>
  );
}

export default AuthPageWithFooter;