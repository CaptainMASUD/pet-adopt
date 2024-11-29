'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import { FaPaw, FaUser, FaLock } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInStart, signInSuccess, signInError } from "../../Redux/UserSlice/UserSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [successMessage, setSuccessMessage] = useState(""); // Success message
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    dispatch(signInStart());
    try {
      const response = await axios.post("http://localhost:3000/admin/login", formData);
      setError("");
      dispatch(signInSuccess(response.data.admin));
      setSuccessMessage("Login successful! Redirecting...");

      // Redirect to home page after a short delay
      setTimeout(() => {
        navigate("/"); // Navigate to homepage
      }, 2000); // 2 seconds delay to show success message

      setLoading(false); // Stop loading
    } catch (err) {
      const errorMessage = err.response?.data || "An error occurred.";
      setError(errorMessage);
      dispatch(signInError(errorMessage));
      setLoading(false); // Stop loading in case of error
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex w-full max-w-4xl overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow-xl"
      >
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-1/2 bg-teal-500 dark:bg-teal-600 p-8 text-white"
        >
          <h2 className="text-4xl font-bold mb-6 flex items-center">
            <MdPets className="mr-2 text-5xl" /> Peddy
          </h2>
          <p className="text-lg mb-4">Welcome to Peddy, where hearts and paws connect!</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Find your perfect furry companion</li>
            <li>Give a loving home to pets in need</li>
            <li>Join a community of passionate pet lovers</li>
            <li>Access resources for pet care and training</li>
          </ul>
        </motion.div>

        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-1/2 p-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 dark:text-teal-400 flex items-center mb-6">
            <FaPaw className="mr-2" /> Admin Login
          </h1>

          {/* Display error message if any */}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Display success message */}
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Username</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  className="w-full pl-10 p-3 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  className="w-full pl-10 p-3 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full p-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
              disabled={loading}
            >
              {loading ? (
                <div className="animate-spin border-2 border-white border-t-transparent w-6 h-6 rounded-full mx-auto"></div> // Loader
              ) : (
                "Login"
              )}
            </motion.button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300">
                Register here
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
