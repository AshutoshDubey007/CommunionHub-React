import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { RiMenu3Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { FaCircleUser } from "react-icons/fa6";
import { getUserData, signOut } from '../../supabase-service';
import { toast } from 'react-toastify';
import { RiUserCommunityFill } from "react-icons/ri";
import { routes } from '../../utils/routes';

export default function Navbar() {

  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null)

  const logout = async () => {
    const data = await signOut()
    setUser(null)
    if (data?.error) {
      toast.error('Error in logout')
    }
    navigate(routes.HOME)
  }

  const userData = async () => {
    const response = await getUserData()
    if(response?.user){
      setUser({
        email: response?.user?.email,
        id: response?.user?.id
      })
    }
    if (response?.error) {
      toast.error('Error fetching user')
    }
  }

  useEffect(() => {
    userData()
  }, [])

  return (
    <>
      <nav className="bg-gray-50 shadow-md fixed top-0 mb-10 w-full z-10">
        <div className="max-w-sm sm:max-w-md md:max-w-7xl mx-auto px-2 sm:px-6">
          <div className="flex justify-between h-18 items-center">
            <div className="flex-shrink-0 text-xl sm:text-2xl font-bold text-sky-700">
              <Link to={routes.HOME} className='flex items-center gap-2'><RiUserCommunityFill size={40} />Communion</Link>
            </div>
            <div className="hidden md:flex flex-1 justify-center space-x-12">
              <Link to={routes.HOME} className="text-gray-900 text-lg font-medium hover:text-gray-700">Home</Link>
              <Link to={routes.EVENT} className="text-gray-900 text-lg font-medium hover:text-gray-700">Events</Link>
              <Link to={routes.ABOUT} className="text-gray-900 text-lg font-medium hover:text-gray-700">About</Link>
            </div>
            {!user ? (<>
              <div className="hidden md:flex">
                <Link to={routes.SIGNIN} className="px-4 py-1 bg-gray-900 text-md font-medium text-white rounded-full hover:bg-gray-600">Sign in</Link>
              </div>
            </>) : (<>
              <div className="hidden md:flex relative">
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <FaCircleUser className="h-9 w-9 text-gray-900" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-10 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <button
                      className="flex items-center gap-2 cursor-pointer w-full px-4 py-2 text-gray-900 hover:bg-gray-900 hover:text-white hover:rounded-lg"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>)}

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-900 focus:outline-none"
              >
                {isOpen ? <RxCross2 size={20} /> : <RiMenu3Line size={20} />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white shadow-md">
            <div className="px-4 pt-2 pb-3 space-y-2">
              <Link to={routes.HOME} className="block text-gray-700 hover:text-gray-900">Home</Link>
              <Link to={routes.EVENT} className="block text-gray-700 hover:text-gray-900">Events</Link>
              <Link to={routes.ABOUT} className="block text-gray-700 hover:text-gray-900">About</Link>
              {!user ? (<>
                <Link to={routes.SIGNIN} className="block bg-gray-900 text-white text-center p-2 rounded-md hover:text-gray-800">Sign In</Link>
              </>) : (<>
                <div onClick={logout} className="block bg-gray-900 text-white text-center p-2 rounded-md hover:text-gray-800">Log Out</div>
              </>)}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
