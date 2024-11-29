import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { MdOutlinePets } from 'react-icons/md';  // View Pets icon
import { HiOutlineViewGridAdd } from 'react-icons/hi';  // Add Pet icon
import { MdOutlineManageHistory } from 'react-icons/md';  // Purchase History icon
import { AiOutlineLogout } from 'react-icons/ai';  // Logout icon
import { signOut } from '../../Redux/UserSlice/UserSlice';
import { FaUser, FaShieldAlt } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { FaDog, FaCalendarAlt, FaMale, FaFemale, FaDollarSign } from 'react-icons/fa';
import moment from 'moment';

const AdminDashboard = () => {
  const [pets, setPets] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [newPet, setNewPet] = useState({
    name: '',
    breed: '',
    birth_date: '',
    gender: '',
    price: '',
  });
  const [view, setView] = useState('profile'); // Initially show profile view
  const [searchTerm, setSearchTerm] = useState('');
  

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate hook
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    // Redirect to home if the user is not logged in
    if (!currentUser) {
      navigate('/');  // Navigate to home route if currentUser is null
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    // Fetch pets data if admin view is active
    if (view === 'pets') {
      axios.get('http://localhost:3000/pets')
        .then((response) => setPets(response.data))
        .catch((error) => console.error('Error fetching pets:', error));
    }

    // Fetch purchase history if admin view is active
    if (view === 'history') {
      axios.get('http://localhost:3000/pets/history')
        .then((response) => setPurchaseHistory(response.data))
        .catch((error) => console.error('Error fetching purchase history:', error));
    }
  }, [view]);
  

  const handleAddPet = () => {
    axios.post('http://localhost:3000/pets/add', newPet)
      .then((response) => {
        alert('Pet added successfully!');
        setNewPet({ name: '', breed: '', birth_date: '', gender: '', price: '' }); // Reset form
        setView('pets'); // Switch back to pets view
      })
      .catch((error) => console.error('Error adding pet:', error));
  };

  const handleSignOut = () => {
    dispatch(signOut());
    navigate('/');  // Redirect to home when the user logs out
  };

  // Filter purchase history based on search term
  const filteredHistory = purchaseHistory.filter((purchase) => {
    return (
      purchase.buyer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.buyer_contact.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Function to calculate pet's age based on birth date
  const calculateAge = (birthDate) => {
    const now = moment();
    const birthMoment = moment(birthDate);
    const ageInDays = now.diff(birthMoment, 'days');
    const ageInMonths = now.diff(birthMoment, 'months');
    const ageInYears = now.diff(birthMoment, 'years');

    if (ageInYears > 0) {
      return `${ageInYears} year${ageInYears > 1 ? 's' : ''}`;
    } else if (ageInMonths > 0) {
      return `${ageInMonths} month${ageInMonths > 1 ? 's' : ''}`;
    } else if (ageInDays > 0) {
      return `${ageInDays} day${ageInDays > 1 ? 's' : ''}`;
    }
    return 'Newborn'; // For pets that are less than a day old
  };

  // Function to handle active class styling
  const getActiveClass = (section) => {
    return view === section ? 'bg-teal-600 p-5 rounded-md' : '';  // 'bg-gray-600' is used for active section
  };

  return (
    <div className="flex min-h-screen dark:bg-gray-800 dark:text-gray-200">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <div className="text-2xl font-bold mb-4 mt-20">Admin Dashboard</div>
        <ul>
          {currentUser?.isAdmin === 1 && (
            <>
              <li 
                onClick={() => setView('pets')} 
                className={`flex items-center py-2 cursor-pointer ${getActiveClass('pets')}`}
              >
                <MdOutlinePets className="mr-3" /> View Pets
              </li>
              <li 
                onClick={() => setView('addPet')} 
                className={`flex items-center py-2 cursor-pointer ${getActiveClass('addPet')}`}
              >
                <HiOutlineViewGridAdd className="mr-3" /> Add Pet
              </li>
              <li 
                onClick={() => setView('history')} 
                className={`flex items-center py-2 cursor-pointer ${getActiveClass('history')}`}
              >
                <MdOutlineManageHistory className="mr-3" /> Purchase History
              </li>
            </>
          )}
          <li 
            onClick={handleSignOut} 
            className={`flex items-center py-2 cursor-pointer ${getActiveClass('logout')}`}
          >
            <AiOutlineLogout className="mr-3" /> Logout
          </li>
        </ul>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 bg-gray-100 p-6">
       {/* Search Bar */}
{view === 'history' && (
  <div className="mb-6 flex justify-end mt-20">
    <div className="relative w-96">
      <input
        type="text"
        placeholder="Search by Buyer Name or Contact..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 pl-10 pr-4 h-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      {/* Icon inside the input */}
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 18a7 7 0 100-14 7 7 0 000 14zM21 21l-4.35-4.35" />
        </svg>
      </span>
    </div>
  </div>
)}


{/* Profile View */}
{view === 'profile' && currentUser && (
  <div className="space-y-6 mt-20 ">
    <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">User Profile</h2>
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl mx-auto">
      <div className="space-y-4">
        {/* Username Section */}
        <div className="flex items-center space-x-3">
          <FaUser className="text-teal-600 text-2xl" />
          <h3 className="text-2xl font-semibold text-gray-800">
            <span className="text-teal-600">Username:</span> {currentUser.username}
          </h3>
        </div>

        {/* Email Section */}
        <div className="flex items-center space-x-3">
          <HiOutlineMail className="text-teal-600 text-2xl" />
          <p className="text-lg text-gray-600">
            <span className="font-medium text-teal-600">Email:</span> {currentUser.email}
          </p>
        </div>

        {/* Admin Status Section */}
        <div className="flex items-center space-x-3">
          <FaShieldAlt className="text-teal-600 text-2xl" />
          <p className="text-lg text-gray-600">
            <span className="font-medium text-teal-600">Admin Status:</span> 
            {currentUser.isAdmin === 1 ? 'Admin' : 'User'}
          </p>
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="mt-4 p-4 bg-teal-50 rounded-lg text-center hover:shadow-lg transition-shadow duration-300">
        <button className="text-teal-600 font-medium">Edit Profile</button>
      </div>
    </div>
  </div>
)}


        {/* Add Pet Form */}
        {view === 'addPet' && (
  <div className="space-y-6 mt-20">
    <h2 className="text-3xl font-bold text-teal-600 mb-4">Add New Pet</h2>
    
    {/* Add Pet Form */}
    <form onSubmit={(e) => { e.preventDefault(); handleAddPet(); }} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
      {/* Pet Name */}
      <div className="relative">
        <FaDog className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-600 text-xl" />
        <input
          type="text"
          placeholder="Pet Name"
          value={newPet.name}
          onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
          className="pl-12 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Breed */}
      <div className="relative">
        <FaDog className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-600 text-xl" />
        <input
          type="text"
          placeholder="Breed"
          value={newPet.breed}
          onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
          className="pl-12 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Birth Date */}
      <div className="relative">
        <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-600 text-xl" />
        <input
          type="date"
          value={newPet.birth_date}
          onChange={(e) => setNewPet({ ...newPet, birth_date: e.target.value })}
          className="pl-12 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Gender */}
      <div className="relative">
        <select
          value={newPet.gender}
          onChange={(e) => setNewPet({ ...newPet, gender: e.target.value })}
          className="pl-12 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="">Select Gender</option>
          <option value="Male"><FaMale className="inline mr-2 text-teal-600" /> Male</option>
          <option value="Female"><FaFemale className="inline mr-2 text-teal-600" /> Female</option>
        </select>
      </div>

      {/* Price */}
      <div className="relative">
        <FaDollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-600 text-xl" />
        <input
          type="number"
          placeholder="Price"
          value={newPet.price}
          onChange={(e) => setNewPet({ ...newPet, price: e.target.value })}
          className="pl-12 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        className="w-full py-3 mt-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        Add Pet
      </button>
    </form>
  </div>
)}
        {/* Pet List */}
        {view === 'pets' && (
  <div>
    <h2 className="text-2xl font-bold text-teal-600 mb-4">All Pets</h2>
    
    {/* Pet Table */}
    <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
      <table className="min-w-full table-auto">
        <thead className="bg-teal-600 text-white">
          <tr>
            <th className="px-6 py-3 text-left">Pet Name</th>
            <th className="px-6 py-3 text-left">Breed</th>
            <th className="px-6 py-3 text-left">Age</th>
            <th className="px-6 py-3 text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet.id} className="border-t border-gray-200 hover:bg-teal-50">
            
              <td className="px-6 py-3">{pet.name}</td>
              <td className="px-6 py-3">{pet.breed}</td>
              <td className="px-6 py-3">{calculateAge(pet.birth_date)}</td>
              <td className="px-6 py-3">{pet.price} USD</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}


        {/* Purchase History */}
        {view === 'history' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-teal-600 mb-6">Purchase History</h2>
            <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
              <table className="min-w-full table-auto">
                <thead className="bg-teal-600 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Buyer Name</th>
                    <th className="px-6 py-3 text-left">Contact</th>
                    <th className="px-6 py-3 text-left">Pet ID</th>
                    <th className="px-6 py-3 text-left">Purchase Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistory.map((purchase) => (
                    <tr key={purchase.id} className="border-t border-gray-200 hover:bg-teal-50">
                      <td className="px-6 py-3">{purchase.buyer_name}</td>
                      <td className="px-6 py-3">{purchase.buyer_contact}</td>
                      <td className="px-6 py-3">{purchase.pet_id}</td>
                      <td className="px-6 py-3">{moment(purchase.date).format('MMMM D, YYYY')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
