import { motion } from 'framer-motion';
import img from "../../images/pet.webp"

const Hero = () => {
  return (
    <div className='dark:bg-gray-800'>
      <section className=" w-11/12 mx-auto flex flex-col items-center justify-center text-center ">
        <div>
          <h3 className="mb-4 mt-20 text-gray-500 ">Bringing Families Together ❤️‍🔥</h3>
          <h1 className="text-5xl font-bold mb-4">Your Path to Adoption<br /> Starts Here</h1>
          <p className="mb-6 max-w-2xl mx-auto">
            Every adoption journey is unique, filled with hope, love, and the promise of building a family. Whether you are just beginning to explore the idea or ready to start the process, this is your first step towards a fulfilling and life-changing experience.
          </p>
          <button id="viewMoreBtn" className="btn p-3 rounded-md hover:bg-gray-800 duration-500 btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-teal-700 text-white mb-5">
            View more
          </button>
          <div className="flex justify-center">
            <img src={img} alt="Adoptable Pet" />
          </div>
        </div>
      </section>

      <section id="adoptSection">
        <h2 className="text-3xl font-bold text-center">Adopt Your Best Friend</h2>
        <p className="text-center text-gray-700 dark:text-gray-400 max-w-xl mx-auto mt-5">
          Discover pets available for adoption today.
        </p>
      </section>
    </div>
  );
};

export default Hero;
