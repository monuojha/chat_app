import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginUser } from "../features/authSlice";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FiHelpCircle } from "react-icons/fi";
import Image1 from "../assets/images/signup.jpg";
import Image2 from "../assets/images/chatSignup.webp";
import Imag3 from "../assets/images/signup3.jpg";
import { Link } from "react-router-dom";
import Slider from "../components/Slider";
const Login = () => {

  const images = [
    Image1, Image2, Imag3
  ]
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials));
  };
  useEffect(() => {
    if (error) {
      alert(error);
    }
  });
  return (
    <>

    <div className="grid grid-cols-1 md:grid-cols-2 h-screen justify-center items-center">

      <div  > <Slider images={images} /></div>
    <div className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-r from-gray-500/80 via-gray-600/80 to-gray-700/80 shadow-lg rounded-lg backdrop-filter backdrop-blur-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
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
              value={credentials.password}
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
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p className="mt-4 text-red-600">{error}</p>}

        <div className="mt-4 text-center">
          <p className="text-white">
            <AiOutlineUserAdd className="inline-block mr-1" />
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-200 underline hover:text-blue-300"
            >
              Sign up
            </Link>
          </p>
          <p className="mt-2">
            <FiHelpCircle className="inline-block mr-1" />
            <a
              href="/forgot-password"
              className="text-blue-200 underline hover:text-blue-300"
            >
              Forgot password?
            </a>
          </p>
          <p className="mt-2 text-xs text-gray-200">
            By logging in, you agree to our{" "}
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
  );
};

export default Login;
