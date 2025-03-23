import { motion } from "framer-motion";
import SectionOne from "../Components/SectionOne";
import SectionTwo from "../Components/SectionTwo";

export default function About() {
  return (
    <div className="bg-white max-w-7xl mb-16 mx-auto text-black min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center pt-32 px-6 mb-10"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold text-blue-900">Connecting People Across Faiths & Interests</h1>
        <p className="text-gray-600 mt-3 sm:mt-4 mb-8 sm:mb-10 text-lg sm:text-xl text-center max-w-xs sm:max-w-md md:max-w-3xl mx-auto">
          Building bridges between communities by fostering meaningful connections.
        </p>
      </motion.div>
      <SectionOne />
      <SectionTwo />
      <SectionOne />
    </div>
  );
}
