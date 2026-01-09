import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function MobileAuthCard({
  isLogin,
  setIsLogin,
  loginData,
  setLoginData,
  loginShowPassword,
  setLoginShowPassword,
  loginError,
  handleLoginSubmit,
  signupData,
  setSignupData,
  signupShowPassword,
  setSignupShowPassword,
  signupError,
  handleSignupSubmit,
}) {
  const loginRef = useRef(null);
  const signupRef = useRef(null);
  const [cardHeight, setCardHeight] = useState("auto");

  // Measure tallest card once
  useEffect(() => {
    if (loginRef.current && signupRef.current) {
      setCardHeight(
        Math.max(
          loginRef.current.offsetHeight,
          signupRef.current.offsetHeight
        )
      );
    }
  }, []);

  const cardVariants = {
    enter: (direction) => ({
      rotateY: direction ? -90 : 90,
      opacity: 0,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: "easeOut" },
    },
    exit: (direction) => ({
      rotateY: direction ? 90 : -90,
      opacity: 0,
      transition: { duration: 0.35, ease: "easeIn" },
    }),
  };

  return (
    <div className="flex items-center justify-center px-4 w-full">
      <div className="w-full max-w-95">
        <div
          className="relative w-full"
          style={{ height: cardHeight }}
        >
          <AnimatePresence mode="wait" custom={isLogin}>
            {isLogin ? (
              /* LOGIN */
              <motion.div
                key="login"
                ref={loginRef}
                custom={true}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute top-0 left-0 right-0 bg-white rounded-2xl shadow-2xl px-6 py-8 antialiased"
              >
                <h1 className="text-2xl font-extrabold mb-4 text-center bg-linear-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                  Login
                </h1>

                <form onSubmit={handleLoginSubmit}>
                  <div className="mb-4">
                    <label className="font-semibold">Email</label>
                    <input
                      type="email"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 rounded-xl"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="font-semibold">Password</label>
                    <div className="relative">
                      <input
                        type={loginShowPassword ? "text" : "password"}
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border-2 rounded-xl"
                        required
                      />
                      <span
                        onClick={() => setLoginShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                      >
                        {loginShowPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </div>

                  {loginError && (
                    <p className="text-red-500 mb-2">{loginError}</p>
                  )}

                  <button className="w-full bg-linear-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold">
                    Login
                  </button>

                  <p className="text-center mt-4">
                    Not registered?{" "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(false)}
                      className="text-blue-600 font-semibold"
                    >
                      Sign up
                    </button>
                  </p>
                </form>
              </motion.div>
            ) : (
              /* SIGNUP */
              <motion.div
                key="signup"
                ref={signupRef}
                custom={false}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute top-0 left-0 right-0 bg-white rounded-2xl shadow-2xl px-6 py-8 antialiased"
              >
                <h1 className="text-2xl font-extrabold mb-4 text-center bg-linear-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
                  Signup
                </h1>

                <form onSubmit={handleSignupSubmit}>
                  <div className="mb-4">
                    <label className="font-semibold">Name</label>
                    <input
                      type="text"
                      value={signupData.name}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border-2 rounded-xl"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="font-semibold">Email</label>
                    <input
                      type="email"
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border-2 rounded-xl"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="font-semibold">Password</label>
                    <div className="relative">
                      <input
                        type={signupShowPassword ? "text" : "password"}
                        value={signupData.password}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            password: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border-2 rounded-xl"
                        required
                      />
                      <span
                        onClick={() => setSignupShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
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

                  {signupError && (
                    <p className="text-red-500 mb-2">{signupError}</p>
                  )}

                  <button className="w-full bg-linear-to-r from-purple-500 to-blue-500 text-white py-3 rounded-xl font-semibold">
                    Sign up
                  </button>

                  <p className="text-center mt-4">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(true)}
                      className="text-purple-600 font-semibold"
                    >
                      Login
                    </button>
                  </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
