import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPaw, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "flowbite-react"; 

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [showModal, setShowModal] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true); // Show loader
      const response = await axios.post(
        "http://localhost:3000/admin/register", 
        formData
      );
      setMessage(response.data.message);
      setError("");
      setLoading(false); 
      setShowModal(true); 

      
      setTimeout(() => {
        navigate("/login");
      }, 2000); 
    } catch (err) {
      setLoading(false); 
      if (err.response) {
        setError(err.response?.data?.message || "An error occurred during registration.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

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
          <p className="text-lg mb-4">Join Peddy and start your journey to pet adoption!</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Create your profile</li>
            <li>Browse available pets</li>
            <li>Connect with shelters and rescues</li>
            <li>Start your adoption process</li>
          </ul>
        </motion.div>

        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-1/2 p-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 dark:text-teal-400 flex items-center mb-6">
            <FaPaw className="mr-2" /> Admin Register
          </h1>
          {message && <p className="text-green-500 mb-4">{message}</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}
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
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
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
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full pl-10 pr-10 p-3 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400"
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="w-full pl-10 pr-10 p-3 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400"
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className={`w-full p-3 ${loading ? 'bg-teal-300' : 'bg-teal-500 hover:bg-teal-600'} text-white rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1`}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>

      {/* Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Registration Successful</Modal.Header>
        <Modal.Body>
          <p className="text-center text-white">Your registration was successful! You will be redirected to the login page shortly.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)} color="gray">Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Register;
