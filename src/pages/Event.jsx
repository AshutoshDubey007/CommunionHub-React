import React, { Fragment, useEffect, useState } from 'react'
import EventCard from '../Components/EventCard'
import { RiFlashlightFill } from "react-icons/ri";
import EventForm from '../Components/EventForm';
import { FiPlusCircle } from "react-icons/fi";
import { deleteFromDb, getEventFromDb, getEventWithFilters, isLogedIn } from '../supabase-service';
import { constVariables } from '../utils/constVariables';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLoader } from '../context/LoaderContext';
import { routes } from '../utils/routes';

export default function Event() {

  const { setLoading } = useLoader()
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const [seletedCategory, setSelectedCategory] = useState(null)

  const getEventData = async () => {
    setLoading(true)
    try {
      const { data } = await getEventFromDb(constVariables.TABLES.EVENT);
      setData(data);
    } catch (error) {
      toast.error("Error fetching data");
    } finally {
      setLoading(false)
    }
  };

  const getEventByFilters = async (category) => {
    setLoading(true)
    if (seletedCategory == category) {
      getEventData()
      setSelectedCategory(null)
      return
    }
    setSelectedCategory(category)
    try {
      const { data } = await getEventWithFilters(constVariables.TABLES.EVENT, 'category', category);
      setData(data)
    } catch (error) {
      toast.error("Error fetching data");
    } finally {
      setLoading(false)
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleString("en-US", options);
  };

  const handleEdit = async(id) => {
    const user = await isLogedIn();
    if(!user){
      navigate(routes.SIGNIN)
      return
    }
    setEditId(id)
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
    setEditId(null)
  }

  const fetchData = () => {
    getEventData()
  }

  const handleDelete = async (id) => {
    const user = await isLogedIn();
      if(!user){
        navigate(routes.SIGNIN)
      return
    }
    setLoading(true)
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteFromDb(constVariables.TABLES.EVENT, id);
        getEventData();
        toast.success("Event deleted successfully");
      } catch (error) {
        toast.error("Error deleting event");
      } finally {
        setLoading(false)
      }
    }
  }

  const isSignedIn = async () => {
    try {
      const user = await isLogedIn();
      if(!user){
        navigate(routes.SIGNIN)
        return
      }
      setIsOpen(true)
    } catch (error) {}
  } 

  const viewEventDetails = (id) => {
    navigate(`${routes.EVENTDETAILS}/${id}`)
  }

  useEffect(() => {
    getEventData()
  }, [])

  return (
    <>
      <div className='mt-24 max-w-7xl mx-auto'>
        <div className="text-center my-8">
          <h2 className="text-2xl sm:text-4xl sm:px-2 px-4 font-semibold text-gray-800 flex items-center justify-center gap-2">
            Empowering Communities to Thrive & Grow
          </h2>

          <p className="mt-3 sm:text-4xl text-2xl font-bold text-sky-600 flex items-center justify-center gap-1">
            <RiFlashlightFill /> Upcoming Events
          </p>
          <div className='flex items-center justify-center mt-2 sm:mt-6'>
            <button
              onClick={isSignedIn}
              className="px-4 py-2 text-white font-medium bg-gray-800 flex justify-center items-center gap-2 rounded-lg hover:bg-gray-700"
            >
              Create Events <FiPlusCircle />
            </button>
          </div>
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          <button onClick={() => getEventByFilters('Charity')} className={`px-6 py-1 cursor-pointer border-2 border-gray-200 rounded-full transition ${seletedCategory == 'Charity' ? 'bg-sky-500 text-white' : 'text-gray-900 hover:bg-gray-100'}`}>
            Charity
          </button>
          <button onClick={() => getEventByFilters('Religious')} className={`px-6 py-1 cursor-pointer border-2 border-gray-200 rounded-full transition ${seletedCategory == 'Religious' ? 'bg-sky-500 text-white' : 'text-gray-900 hover:bg-gray-100'}`}>
            Religious
          </button>
          <button onClick={() => getEventByFilters('Social')} className={`px-6 py-1 cursor-pointer border-2 border-gray-200 rounded-full transition ${seletedCategory == 'Social' ? 'bg-sky-500 text-white' : 'text-gray-900 hover:bg-gray-100'}`}>
            Social
          </button>
        </div>
        {!data?.length && (<>
          <h2 className='text-center mt-30'>No events Found!</h2>
        </>)}
        <div className='flex justify-center mx-auto'>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.map((item, i) => (
              <Fragment key={i}>
                <EventCard
                  image={item?.image}
                  title={item?.title}
                  desc={item?.desc}
                  location={item?.location}
                  category={item?.category}
                  date={formatDate(item?.date)}
                  edit={() => handleEdit(item?.id)}
                  deleteEvent={() => handleDelete(item?.id)}
                  showDetails={() => viewEventDetails(item?.id)}
                  showMenu={isLogedIn()}
                />
              </Fragment>
            ))}
          </div>
        </div>
        {isOpen && <EventForm close={close} id={editId} fetchData={fetchData} />}
      </div>
    </>
  )
}
