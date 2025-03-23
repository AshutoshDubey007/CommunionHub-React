import { motion } from 'framer-motion';
import React from 'react';
import { FaArrowRightLong } from "react-icons/fa6";

export default function CommunionSec() {

  const highlights = [
    {
      title: "Bringing People Together",
      description: "Communion serves as a bridge, connecting people from various faiths and traditions, fostering unity and shared understanding."
    },
    {
      title: "A Modern Faith Experience",
      description: "Explore spirituality like never before with interactive features, engaging events, and a fresh perspective on faith-driven connections."
    },
    {
      title: "Encouraging Harmony",
      description: "We promote interfaith dialogue and meaningful relationships through shared activities, discussions, and collaborative initiatives."
    }
  ];

  return (
    <section className="bg-gray-900 text-white py-32 px-6 md:px-14 lg:px-28">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Why Choose Communion?</h2>
        <p className="text-lg text-gray-300">
          Communion is more than a platform—it’s a vibrant space where diverse faiths, beliefs, and cultures unite. By fostering strong connections and collaboration, we transform diversity into strength, paving the way for a world built on mutual respect and harmony.
        </p>
      </div>

      <div className="mt-14 grid gap-10 md:grid-cols-3">
        {highlights.map((item, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 p-7 rounded-xl shadow-lg hover:bg-gray-700 transition duration-300"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 12, delay: index * 0.15 }}
            whileHover={{ scale: 1.06 }}
          >
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-gray-400 mb-4">{item.description}</p>
            <a href="#" className="text-blue-400 font-medium flex items-center gap-2 hover:underline">
              Discover More <span className='flex items-center'><FaArrowRightLong /></span>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
