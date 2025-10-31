import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useFirebase } from "../context/fireBase";
import { Link , useNavigate} from "react-router-dom";


const SignIn = () => {

    
    const navigate = useNavigate();
  const firebase = useFirebase();

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await firebase.signinUserWithEmailAndPassword(
        userDetails.email,
        userDetails.password
      );
      alert("Login Successfully");
      setError("");
    } catch (err) {
      setError(err.code);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await firebase.signInWithGoogle();
      alert("User Signed In with Google Successfully");
      setError("");
    } catch (err) {
      setError(err.code);
    }
  };

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase , navigate]);

  return (
    <div className="h-full mt-15 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl w-[400px] max-w-sm sm:max-w-md md:max-w-lg">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm sm:text-base">
          Sign in to your account
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
              Email Address
            </label>
            <input
              name="email"
              onChange={handleInputChange}
              value={userDetails.email}
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
              Password
            </label>
            <input
              name="password"
              onChange={handleInputChange}
              value={userDetails.password}
              type="password"
              placeholder="••••••••"
              className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm sm:text-base"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition duration-200 text-sm sm:text-base">
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 flex items-center justify-between">
          <span className="border-b w-1/5 md:w-1/4"></span>
          <span className="text-xs text-gray-500 uppercase">or</span>
          <span className="border-b w-1/5 md:w-1/4"></span>
        </div>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleSignIn}
          className="mt-6 flex items-center justify-center gap-3 w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition">
          <FcGoogle size={22} />
          <span className="text-gray-700 font-medium text-sm sm:text-base">
            Sign in with Google
          </span>
        </button>

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to={"/register"}
            className="text-indigo-600 hover:underline font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
