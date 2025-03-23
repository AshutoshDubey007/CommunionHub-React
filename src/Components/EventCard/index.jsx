import { FaInfoCircle } from "react-icons/fa";
import { FaLocationDot, FaEllipsisVertical } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function EventCard({ edit, title, desc, date, location, image, category, deleteEvent, showDetails }) {

  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <div className="max-w-xs relative bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-lg">
      <div className="absolute top-4 right-3">
        <button
          className="text-gray-700 hover:text-gray-900 p-2"
          onClick={() => setMenuVisible(!menuVisible)}
        >
          <FaEllipsisVertical size={18} />
        </button>

        {menuVisible && (
          <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-xl overflow-hidden">
            <button onClick={edit} className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-200">
              <FaEdit /> Edit
            </button>
            <button onClick={deleteEvent} className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-gray-200">
              <FaTrash /> Delete
            </button>
          </div>
        )}
      </div>

      <img
        src={image}
        alt="Event"
        className="w-full h-48 object-cover"
      />

      <div className="px-3 max-w-fit ml-4 mt-2 bg-blue-700 text-white rounded-full text-xs font-medium py-1 px-3">
        {category}
      </div>

      <div className="px-5 pb-5 pt-2">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

        <div className="flex items-center text-gray-600 text-sm mt-2">
          <SlCalender className="mr-2 text-gray-600" /> {date}
        </div>
        <div className="flex items-center text-gray-600 text-sm mt-1">
          <FaLocationDot className="mr-2 text-gray-600" /> {location}
        </div>

        <p className="text-gray-700 mt-3 line-clamp-2">
          {desc}
        </p>

        <button onClick={showDetails} className="mt-4 w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition">
          <FaInfoCircle size={18} /> View Details
        </button>
      </div>
    </div>
  );
}
