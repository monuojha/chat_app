import React from 'react'
import { useState , useEffect } from 'react'
import { registerUser } from '../features/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import Image1 from "../assets/images/signup.jpg";
import Image2 from "../assets/images/chatSignup.webp";
import Imag3 from "../assets/images/signup3.jpg";
import { FaUserAlt, FaEnvelope, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Slider from '../components/Slider';


const Register = () => {
  const images = [
    Image1, Image2, Imag3
  ]
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => { 
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(userData));
  };

  useEffect(() => {
    if (error) {
      alert(error);
    }
  })
  return (
    <>
     <div className="grid grid-cols-1 md:grid-cols-2 h-screen justify-center items-center">
      {/* Optional image or other content */}
      <div>
         <Slider images={images} /> 
      </div>

      <div className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-r from-gray-500/80 via-gray-600/80 to-gray-700/80 shadow-lg rounded-lg backdrop-filter backdrop-blur-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaUserAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={userData.name}
              onChange={handleChange}
              required
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleChange}
              required
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleChange}
              required
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg text-white ${
              isLoading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } transition duration-300`}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        {error && <p className="mt-4 text-red-600">{error}</p>}

        <div className="mt-4 text-center">
          <p className="text-white">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-200 underline hover:text-blue-300"
            >
              Login
            </Link>
          </p>
          <p className="mt-2 text-xs text-gray-200">
            By registering, you agree to our{" "}
            <a
              href="/terms"
              className="text-blue-200 underline hover:text-blue-300"
            >
              Terms and Conditions
            </a>
            .
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Register
