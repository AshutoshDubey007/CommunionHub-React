import { motion } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { routes } from "../../utils/routes";

export default function Hero() {
  return (
    <section className="bg-gray-50 pb-10 sm:pb-0 sm:min-h-screen min-h-fit flex flex-col sm:flex-row items-center">
    <img
      src="/images/mobileHero.jpg"
      alt="img"
      className="w-full h-48 object-cover md:hidden"
    />
  
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 items-center mt-6">
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-900">
          Connecting People Across Faiths & Interests
        </h1>
        <p className="mt-4 text-lg text-gray-900">
          Join a diverse community where people from different faiths and
          interests come together to connect, share, and grow. Discover
          meaningful conversations and build strong relationships.
        </p>
        <Link to={routes.EVENT} className="flex items-center justify-center sm:justify-normal">
          <button className="mt-6 px-6 cursor-pointer flex items-center justify-center gap-3 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-700">
            Explore Events
            <span>
              <FaArrowRightLong />
            </span>
          </button>
        </Link>
      </div>
  
      <div className="md:w-1/2 flex justify-center mt-10 md:mt-0 relative hidden sm:block">
        <motion.img
          src="/images/heroImg2.jpg"
          alt="Community"
          className="w-80 h-60 rounded-xl shadow-lg absolute top-3 left-0"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
        <motion.img
          src="/images/heroImg.jpg"
          alt="Discussion"
          className="w-70 h-44 rounded-xl shadow-lg absolute top-10 right-0"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.img
          src="/images/heroImg1.jpg"
          alt="Connection"
          className="w-100 h-52 rounded-xl shadow-lg absolute bottom-2 left-28"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }}
        />
      </div>
    </div>
  </section>
  
  );
}
