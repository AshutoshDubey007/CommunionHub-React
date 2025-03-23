import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { RiUserCommunityFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { routes } from "../../utils/routes";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 text-center md:text-left">

        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-2 justify-center sm:justify-normal"><RiUserCommunityFill size={40} />Communion</h2>
          <p className="text-gray-400 mt-2 text-sm">
            Empowering businesses with cutting-edge web solutions.
            We specialize in modern web development and digital transformation.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-300">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to={routes.HOME} className="text-gray-400 hover:text-white transition">Home</Link></li>
            <li><Link to={routes.EVENT} className="text-gray-400 hover:text-white transition">Events</Link></li>
            <li><Link to={routes.ABOUT} className="text-gray-400 hover:text-white transition">About</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-300">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4">
            <Link to="#" className="text-gray-400 hover:text-white transition text-xl">
              <FaFacebookF />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white transition text-xl">
              <FaTwitter />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white transition text-xl">
              <FaInstagram />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white transition text-xl">
              <FaLinkedinIn />
            </Link>
          </div>
        </div>

      </div>

      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-800 pt-4">
        &copy; {new Date().getFullYear()} Communion. All rights reserved.
      </div>
    </footer>
  );
}
