import React, { useEffect, useState } from 'react'
import { FaCalendarAlt, FaMapMarkerAlt, FaTag } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { getEventById } from '../supabase-service';
import { toast } from 'react-toastify';
import { constVariables } from '../utils/constVariables';
import { useLoader } from '../context/LoaderContext';

export default function EventDetails() {

  const { setLoading } = useLoader()
  const { id } = useParams()
  const [eventData, setEventData] = useState(null)

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleString("en-US", options);
  };

  const getEvent = async () => {
    setLoading(true)
    try {
      const data = await getEventById(id, constVariables.TABLES.EVENT)
      setEventData(data)
    } catch (error) {
      toast.error("Error fetching data");
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getEvent()
  }, [])

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 mt-28 space-y-6">
        <div className="w-full h-64 md:h-96 overflow-hidden rounded-2xl shadow-lg">
          <img
            src={eventData?.image}
            alt={eventData?.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">{eventData?.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-gray-900" />
              <span>{formatDate(eventData?.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-gray-900" />
              <span>{eventData?.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaTag className="text-gray-900" />
              <span>{eventData?.category}</span>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">{eventData?.desc}</p>
        </div>
      </div>
    </>
  )
}
