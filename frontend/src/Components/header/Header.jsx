import { useState, useEffect } from "react";
import { FaPaw } from "react-icons/fa";
import { HiOutlineUserCircle, HiOutlineUser } from "react-icons/hi";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsMoon, BsSun } from "react-icons/bs"; // Icons for the theme toggle
import { toggleTheme } from "../../Redux/Theme/ThemeSlice"; // Importing the action
import { HiOutlineMenu } from "react-icons/hi"; // Hamburger icon
import { HiX } from "react-icons/hi"; // Close icon for mobile menu
import { FaUserShield } from "react-icons/fa"; // Admin icon
import { FiLogOut } from "react-icons/fi"; // Logout icon
import { signOut } from "../../Redux/UserSlice/UserSlice"; // Import signOut action

const Header = () => {
  const currentUser = useSelector((state) => state.user.currentUser); // Get current user from Redux
  const theme = useSelector((state) => state.theme.theme); // Get current theme from Redux
  const dispatch = useDispatch(); // To dispatch actions
  const navigate = useNavigate();
  const location = useLocation(); // Get current location for routing

  const [menuOpen, setMenuOpen] = useState(false); // State to track if the menu is open on mobile
  const [profileMenuOpen, setProfileMenuOpen] = useState(false); // State to control profile dropdown visibility

  // Handle click for profile navigation
  const handleProfileClick = () => {
    setProfileMenuOpen(!profileMenuOpen); // Toggle dropdown menu visibility
  };

  // Class names for active and inactive NavLink
  const navLinkClasses = ({ isActive }) =>
    isActive
      ? "text-teal-400 font-bold"
      : "text-gray-800 hover:text-teal-400 dark:text-white";

  // Toggle dark/light theme
  const handleThemeToggle = () => {
    dispatch(toggleTheme()); // Dispatch the toggleTheme action
  };

  // Toggle the mobile menu open/closed
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle user logout with Redux
  const handleLogout = () => {
    dispatch(signOut()); // Dispatch the signOut action to clear user data from Redux
    navigate("/login"); // Navigate to login page after logout
  };

  // Apply dark class to <html> or <body> element based on theme
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark"); // Apply dark mode class
    } else {
      document.documentElement.classList.remove("dark"); // Remove dark mode class
    }
  }, [theme]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on navigation
  }, [location]);

  return (
    <header className="flex justify-between items-center px-6 py-4 text-gray-800 bg-gray-50 bg-opacity-50 backdrop-blur-md dark:bg-gray-800 dark:bg-opacity-50 dark:text-gray-200 fixed top-0 left-0 w-full z-30">
      {/* Logo Section */}
      <NavLink to="/" className="flex items-center space-x-2 text-teal-400">
        <FaPaw className="text-teal-400 text-2xl" />
        <span className="text-xl font-bold">Peddy</span>
      </NavLink>

      {/* Navigation Links (Desktop) */}
      <nav className="hidden md:flex space-x-6 text-gray-800">
        <NavLink to="/" className={navLinkClasses} end>
          Home
        </NavLink>

        {/* Other static navigation links */}
        <NavLink to="/shop" className={navLinkClasses}>
          Shop
        </NavLink>
        <NavLink to="/contact" className={navLinkClasses}>
          Contact
        </NavLink>
      </nav>

      {/* Profile or Login Button */}
      <div className="flex items-center space-x-4 relative z-30">
        {currentUser ? (
          <>
            <HiOutlineUserCircle
              className="text-3xl cursor-pointer hover:text-teal-400"
              onClick={handleProfileClick} // Toggle profile dropdown
            />

            {/* Profile Dropdown Menu */}
            {profileMenuOpen && (
              <div
                className={`absolute right-0 top-12 dark:bg-gray-800  dark:text-white w-48 rounded-lg shadow-xl p-4 space-y-2 transition-all duration-300 transform ${
                  profileMenuOpen ? "opacity-100 translate-y-0 " : "opacity-0 translate-y-2"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{currentUser.username}</p>
                    <p className="text-sm text-gray-400">{currentUser.email}</p>
                  </div>

                  {/* Admin Icon next to profile details */}
                  {currentUser.isAdmin === 1 && (
                    <FaUserShield className="text-teal-500 text-xl ml-4" />
                  )}
                </div>

                {/* Profile Link with icon */}
                <div className="flex items-center space-x-2 mt-2">
                  <HiOutlineUser className="text-teal-400" />
                  <NavLink to="/profile" className="text-teal-400 hover:text-teal-500">
                    Profile
                  </NavLink>
                </div>

                {/* Logout Button with icon */}
                <div
                  className="flex items-center space-x-2 mt-2 cursor-pointer"
                  onClick={handleLogout}
                >
                  <FiLogOut className="text-red-500" />
                  <span className="text-red-500">Logout</span>
                </div>
              </div>
            )}
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded"
          >
            Login
          </button>
        )}

        {/* Dark/Light Mode Toggle */}
        <button
          onClick={handleThemeToggle} // Toggle theme when clicked
          className="text-2xl p-1 rounded-full cursor-pointer bg-gray-800 hover:bg-teal-600"
        >
          {theme === "dark" ? (
            <BsSun className="text-yellow-400" />
          ) : (
            <BsMoon className="text-gray-300" />
          )}
        </button>
      </div>

      {/* Mobile Hamburger Icon (Moved after the theme toggle) */}
      <div className="md:hidden flex items-center space-x-4">
        <button
          onClick={toggleMenu}
          className="text-2xl p-2 rounded-full cursor-pointer bg-gray-800 hover:bg-teal-600"
        >
          {menuOpen ? <HiX className="text-white" /> : <HiOutlineMenu className="text-white" />}
        </button>
      </div>

      {/* Mobile Navigation Links */}
      {menuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-gray-900 text-white md:hidden flex flex-col items-center space-y-4 py-4 z-30">
          <NavLink to="/" className={navLinkClasses} end>
            Home
          </NavLink>
          <NavLink to="/shop" className={navLinkClasses}>
            Shop
          </NavLink>
          <NavLink to="/contact" className={navLinkClasses}>
            Contact
          </NavLink>
        </nav>
      )}
    </header>
  );
};

export default Header;
