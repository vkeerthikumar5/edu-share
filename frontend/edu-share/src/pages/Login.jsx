// src/components/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../context/AuthContext";

export function Login() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
        email,
        password: pwd
      });

      login(res.data.user, res.data.token); // save in context + localStorage

      // Redirect based on role
      
      if (res.data.user.role === "admin") navigate("/admin/dashboard");
      else navigate("/user/dashboard");

    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <section className='w-full flex m-8 justify-end md:mr-32 items-center min-h-screen'>
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
        <form className="max-w-md mx-auto " onSubmit={handleLogin}>
          <h5 className="text-xl font-medium text-gray-900 mb-6">Sign in</h5>

          {/* Email */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
                 border-b-2 border-gray-300 appearance-none focus:outline-none 
                 focus:ring-0 focus:border-gray-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 
                 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-gray-600"
            >
              Email Address
            </label>
          </div>

          {/* Password */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              id="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
                 border-b-2 border-gray-300 appearance-none focus:outline-none 
                 focus:ring-0 focus:border-gray-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 
                 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-gray-600"
            >
              Password
            </label>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:outline-none 
               focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login to your account
          </button>

          <div className="text-sm font-medium text-gray-500 mt-4">
            Not registered?{" "}
            <Link to="/register" className="text-gray-700 hover:underline">
              Create account
            </Link>
          </div>
        </form>

      </div>
    </section>
  );
}
