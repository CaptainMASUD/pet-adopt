import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaw } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="text-white py-10 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
          <NavLink to="/" className="flex items-center space-x-2 text-teal-400">
        <FaPaw className="text-teal-400 text-2xl" />
        <span className="text-xl font-bold">Peddy</span>
      </NavLink>
            <p className="text-gray-400 mb-2">
              <FaMapMarkerAlt className="inline-block mr-2 text-teal-400" />
              av. Washington 165, NY CA 54003
            </p>
            <p className="text-gray-400 mb-2">
              <FaPhoneAlt className="inline-block mr-2 text-teal-400" />
              +31 85 964 47 25
            </p>
            <p className="text-gray-400 mb-2">
              <FaEnvelope className="inline-block mr-2 text-teal-400" />
              info@yourdomain.com
            </p>
            <p className="text-gray-400">
              Opening Hours: <span className="text-teal-400">9:00 AM - 5:00 PM</span>
            </p>
          </div>

          {/* Useful Links Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Useful Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition">
                  Animals
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition">
                  Foundation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Subscribe Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Subscribe</h3>
            <p className="text-gray-400 mb-4">
              Sign up to get the latest updates and news about pet adoption.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 rounded-lg bg-gray-800 text-gray-300 focus:ring-2 focus:ring-teal-500 outline-none w-full"
              />
              <button className="px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg text-white font-bold transition w-full sm:w-auto">
                Subscribe
              </button>
            </div>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <p className="text-gray-400 mb-4">
              Stay connected with us on social media for updates and stories.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-3 bg-gray-800 rounded-full text-teal-400 hover:bg-teal-500 hover:text-white transition"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="p-3 bg-gray-800 rounded-full text-teal-400 hover:bg-teal-500 hover:text-white transition"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="p-3 bg-gray-800 rounded-full text-teal-400 hover:bg-teal-500 hover:text-white transition"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        <div className="text-center text-gray-400">
          &copy; 2024 Peddy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
