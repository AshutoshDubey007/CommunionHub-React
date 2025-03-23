import { motion } from "framer-motion";

export default function SectionOne() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="container mx-auto px-4 sm:px-8 py-5 grid grid-cols-1 md:grid-cols-2 gap-2 items-center text-center md:text-left overflow-hidden"
    >
      <div>
        <h2 className="text-3xl sm:text-4xl font-semibold text-sky-500">
          Bridging Cultures & Beliefs
        </h2>
        <p className="text-gray-700 mt-4 text-base sm:text-lg leading-relaxed">
          We believe in the power of diversity and inclusivity. Our platform fosters open discussions,
          shared experiences, and meaningful relationships across different faiths and interests.
        </p>
      </div>

      <motion.img
        src="https://images.pexels.com/photos/708440/pexels-photo-708440.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt="Connecting people"
        className="rounded-3xl shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-[70%] mx-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />
    </motion.div>
  );
}
