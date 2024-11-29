import React from 'react';
import { motion } from 'framer-motion';
import { FaPaw, FaHeart, FaSearch, FaHandHoldingHeart, FaHome, FaUsers, FaDog } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Add = () => {
    const navigate = useNavigate()
    const handlepet = () =>{
        navigate("/shop")
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex flex-col">
      

      {/* Hero Section */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 onClick={handlepet} className="text-5xl md:text-6xl font-bold text-teal-600 dark:text-teal-400 mb-4" style={{fontFamily : "Dancing Script"}}>
              Find Your Perfect Companion
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Discover joy, love, and friendship through pet adoption
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8"
            >
              <Link
                to="/shop"
                className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105"
              >
                Find Your Pet Now
              </Link>
            </motion.div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <FaSearch className="text-4xl text-teal-500 mb-4 mx-auto" />
              <h2 className="text-2xl font-semibold text-teal-600 dark:text-teal-400 mb-2">Browse Pets</h2>
              <p className="text-gray-600 dark:text-gray-300">Explore our wide selection of lovable pets waiting for a home.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <FaHeart className="text-4xl text-teal-500 mb-4 mx-auto" />
              <h2 className="text-2xl font-semibold text-teal-600 dark:text-teal-400 mb-2">Choose Your Match</h2>
              <p className="text-gray-600 dark:text-gray-300">Find the perfect pet that matches your lifestyle and preferences.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <FaHandHoldingHeart className="text-4xl text-teal-500 mb-4 mx-auto" />
              <h2 className="text-2xl font-semibold text-teal-600 dark:text-teal-400 mb-2">Adopt with Love</h2>
              <p className="text-gray-600 dark:text-gray-300">Complete the adoption process and welcome your new family member.</p>
            </div>
          </motion.div>

          {/* Why Adopt Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-teal-500 text-white rounded-lg shadow-lg p-8 mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Why Adopt?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <FaHome className="text-4xl mr-4" />
                <p>Give pets a loving home and a second chance at life.</p>
              </div>
              <div className="flex items-center">
                <FaUsers className="text-4xl mr-4" />
                <p>Build a lifelong connection with a loyal companion.</p>
              </div>
              <div className="flex items-center">
                <FaDog className="text-4xl mr-4" />
                <p>Experience unconditional love and endless joy.</p>
              </div>
            </div>
          </motion.div>

          {/* Testimonials Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-8 text-center">What people Think</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <p className="text-gray-600 dark:text-gray-300">
                  "Adopting Bella was the best decision! She's brought so much joy to our home."
                </p>
                <span className="block mt-4 text-teal-600 dark:text-teal-400 font-bold">- Sarah M.</span>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <p className="text-gray-600 dark:text-gray-300">
                  "Thank you for helping us find Max. He's the most loving dog ever!"
                </p>
                <span className="block mt-4 text-teal-600 dark:text-teal-400 font-bold">- John D.</span>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <p className="text-gray-600 dark:text-gray-300">
                  "Luna has filled our home with happiness. Thank you, Peddy!"
                </p>
                <span className="block mt-4 text-teal-600 dark:text-teal-400 font-bold">- Emily R.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

     
    </div>
  );
};

export default Add;
