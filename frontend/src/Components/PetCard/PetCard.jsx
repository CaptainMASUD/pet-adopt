import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaPaw, FaCartPlus, FaSearch, FaTimes } from "react-icons/fa";

const RANDOM_IMAGES = {
  dog: [
    "https://images.unsplash.com/photo-1507146426996-ef05306b995a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHVwcHl8ZW58MHx8MHx8fDA%3D",
    "https://cdn.pixabay.com/photo/2024/03/07/10/38/simba-8618301_1280.jpg",
    "https://images.pexels.com/photos/4001296/pexels-photo-4001296.jpeg?cs=srgb&dl=pexels-smpicturez-4001296.jpg&fm=jpg"
  ],
  cat: [
    "https://cdn.pixabay.com/photo/2024/03/07/10/38/simba-8618301_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/03/07/10/38/simba-8618301_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/03/07/10/38/simba-8618301_1280.jpg"
  ],
  rabbit: [
    "/placeholder.svg?height=300&width=400&text=Rabbit+1",
    "/placeholder.svg?height=300&width=400&text=Rabbit+2",
    "/placeholder.svg?height=300&width=400&text=Rabbit+3"
  ]
};

function AllPets() {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState("");
  const [lovedPets, setLovedPets] = useState([]);
  const [wishlistPets, setWishlistPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedPetForAdoption, setSelectedPetForAdoption] = useState(null);
  const [userName, setUserName] = useState("");
  const [userContact, setUserContact] = useState("");
  const [adoptionError, setAdoptionError] = useState("");

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("http://localhost:3000/pets");
        setPets(response.data);
      } catch (err) {
        setError("Failed to fetch pets.");
      }
    };

    fetchPets();
  }, []);

  const handleLovePet = (petId) => {
    setLovedPets((prev) => 
      prev.includes(petId) ? prev.filter(id => id !== petId) : [...prev, petId]
    );
  };

  const handleAddToWishlist = (pet) => {
    setWishlistPets((prev) => 
      prev.some(p => p.id === pet.id) ? prev.filter(p => p.id !== pet.id) : [...prev, pet]
    );
  };

  const handleAdoptPet = (petId) => {
    setSelectedPetForAdoption(petId);
    setIsWishlistOpen(false);
  };

  const handleAdoptModalSubmit = async () => {
    if (!userName || !userContact) {
      setAdoptionError("Please provide both your name and contact information.");
      return;
    }
  
    try {
      const petToAdopt = pets.find(pet => pet.id === selectedPetForAdoption);
      if (!petToAdopt) return;
  
      const response = await axios.post('http://localhost:3000/pets/purchase', {
        pet_id: petToAdopt.id,
        buyer_name: userName,
        buyer_contact: userContact
      });
  
      if (response.status === 200) {
        alert(response.data);
        setWishlistPets(prev => prev.filter(pet => pet.id !== selectedPetForAdoption));
        setUserName("");
        setUserContact("");
        setSelectedPetForAdoption(null);
      }
    } catch (error) {
      setAdoptionError("Failed to process adoption. Please try again.");
    }
  };

  const getRandomPetImage = (type) => {
    const images = RANDOM_IMAGES[type] || RANDOM_IMAGES.dog;
    return images[Math.floor(Math.random() * images.length)];
  };

  const filteredPets = pets.filter(pet => 
    (selectedType === "All" || pet.type === selectedType) &&
    pet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br  from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-8 relative">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-teal-600 dark:text-teal-400 mb-8 mt-14 text-center" style={{fontFamily : "Dancing Script",fontWeight: "bolder"}}>Discover Your Perfect Pet</h1>
        
        {/* Search and Filter Options */}
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search pets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 rounded-full border-2 border-teal-300 focus:border-teal-500 focus:outline-none dark:bg-gray-700 dark:border-teal-600 dark:text-white"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="p-3 rounded-full border-2 border-teal-300 focus:border-teal-500 focus:outline-none bg-white dark:bg-gray-700 dark:border-teal-600 dark:text-white"
          >
            <option value="All">All Types</option>
            <option value="dog">Dogs</option>
            <option value="cat">Cats</option>
            <option value="rabbit">Rabbits</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsWishlistOpen(true)}
            className="p-3 bg-yellow-500 text-white rounded-full shadow-md transition-all flex items-center space-x-2"
          >
            <FaCartPlus />
            <span>Wishlist ({wishlistPets.length})</span>
          </motion.button>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Pet Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {filteredPets.map((pet) => (
            <motion.div
              key={pet.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <div className="relative">
                <img
                  src={getRandomPetImage(pet.type)}
                  alt={pet.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleLovePet(pet.id)}
                    className={`p-2 rounded-full ${
                      lovedPets.includes(pet.id)
                        ? "bg-red-500 text-white"
                        : "bg-white text-gray-600"
                    }`}
                  >
                    <FaHeart />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleAddToWishlist(pet)}
                    className={`p-2 rounded-full ${
                      wishlistPets.some(p => p.id === pet.id)
                        ? "bg-yellow-500 text-white"
                        : "bg-white text-gray-600"
                    }`}
                  >
                    <FaCartPlus />
                  </motion.button>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-2">{pet.name}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-2">Breed: {pet.breed}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Price: ${pet.price}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAdoptPet(pet.id)}
                  className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <FaPaw />
                  <span>Adopt Now</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Wishlist Modal */}
      <AnimatePresence>
        {isWishlistOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-full md:w-96 h-full bg-white dark:bg-gray-800 shadow-lg overflow-y-auto z-50"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400">Your Wishlist</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsWishlistOpen(false)}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                >
                  <FaTimes />
                </motion.button>
              </div>
              {wishlistPets.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-300 text-center">Your wishlist is empty.</p>
              ) : (
                wishlistPets.map((pet) => (
                  <motion.div
                    key={pet.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4 flex items-center"
                  >
                    <img
                      src={getRandomPetImage(pet.type)}
                      alt={pet.name}
                      className="w-16 h-16 object-cover rounded-full mr-4"
                    />
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-teal-600 dark:text-teal-400">{pet.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{pet.breed}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAdoptPet(pet.id)}
                      className="px-3 py-1 bg-teal-500 hover:bg-teal-600 text-white rounded-lg shadow-md transition-all text-sm"
                    >
                      Adopt
                    </motion.button>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Adoption Modal */}
      <AnimatePresence>
        {selectedPetForAdoption && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold text-teal-600 dark:text-teal-400 mb-4">
                Complete Your Adoption
              </h2>
              <input
                type="text"
                placeholder="Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-3 mb-4 border rounded-lg dark:bg-gray-700 dark:text-white"
              />
              <input
                type="text"
                placeholder="Your Contact"
                value={userContact}
                onChange={(e) => setUserContact(e.target.value)}
                className="w-full p-3 mb-4 border rounded-lg dark:bg-gray-700 dark:text-white"
              />
              {adoptionError && <p className="text-red-500 text-center mb-4">{adoptionError}</p>}
              <div className="flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdoptModalSubmit}
                  className="w-full py-3 bg-teal-500 text-white rounded-lg shadow-md transition-all"
                >
                  Confirm Adoption
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPetForAdoption(null)}
                  className="w-full py-3 bg-gray-300 text-gray-600 dark:bg-gray-600 dark:text-white rounded-lg shadow-md transition-all"
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AllPets;

