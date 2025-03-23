import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { signup } from "../supabase-service";
import { toast } from "react-toastify";
import { useLoader } from "../context/LoaderContext";
import { routes } from "../utils/routes";
import { RiUserCommunityFill } from "react-icons/ri";

export default function Signup() {

  const { setLoading } = useLoader()

  const [showPassword, setShowPassword] = useState(false)
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const handleSignUp = async() => {
    setLoading(true)
    const payload = {
      email: userData?.email,
      password: userData?.password
    }
    try {
      const response = await signup(payload)
      setUserData({
        email: '',
        password: ''
      })
      toast.success('Signed up successfully')
      window.location.href="/"
    } catch (error) {
      toast.error('Error in sign up')
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <Link to={routes.HOME}>
          <h2 className="flex items-center gap-2 justify-center text-2xl font-bold text-center text-sky-700 mb-1"><RiUserCommunityFill size={30} />Communion</h2>
        </Link>
        <h2 className="text-3xl font-medium text-center text-gray-800 mb-1">Create Account</h2>
        <p className="text-md text-center text-gray-800 mb-6">Join our community today</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input 
              type="email" 
              onChange={(e) => setUserData({...userData, email: e.target.value})}
              value={userData.email}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Enter your email"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-600 mb-1">Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              onChange={(e) => setUserData({...userData, password: e.target.value})}
              value={userData.password}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800 pr-10"
              placeholder="Enter your password"
            />
            <button 
              type="button" 
              className="absolute inset-y-0 right-3 top-7 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          <button onClick={handleSignUp} className="w-full bg-gray-800 text-white p-3 rounded-xl font-semibold hover:bg-gray-900 transition">
            Sign Up
          </button>
        </div>
        
        <div className="mt-6 flex items-center justify-center">
          <div className="border-t border-gray-300 w-full"></div>
          <span className="px-3 text-gray-500">OR</span>
          <div className="border-t border-gray-300 w-full"></div>
        </div>
        <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to={routes.SIGNIN} className="text-blue-600 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
