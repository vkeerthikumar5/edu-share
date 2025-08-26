// src/components/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [role, setRole] = useState('user');
  const [m_no, set_mno] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("${import.meta.env.VITE_API_BASE_URL}/api/auth/register", {
        name,
        email,
        password: pwd,
        role,
        m_no
      });
      alert("Registration successful ✅ Please login");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <section className='w-full flex m-8 justify-end md:mr-32 items-center min-h-screen'>
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
        <form className="max-w-md mx-auto " onSubmit={handleRegister}>
          <h5 className="text-xl font-medium text-gray-900 mb-6">Register</h5>

          {/* Full Name */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
                 border-b-2 border-gray-300 appearance-none focus:outline-none 
                 focus:ring-0 focus:border-gray-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 
                 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-gray-600"
            >
              Full Name
            </label>
          </div>

          {/* Mobile Number */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              id="m_no"
              value={m_no}
              onChange={(e) => set_mno(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
                 border-b-2 border-gray-300 appearance-none focus:outline-none 
                 focus:ring-0 focus:border-gray-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="m_no"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 
                 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-gray-600"
            >
              Mobile Number
            </label>
          </div>

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

          {/* Role */}
          <div className="relative z-0 w-full mb-5 group">
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
                 border-b-2 border-gray-300 appearance-none focus:outline-none 
                 focus:ring-0 focus:border-gray-600 peer"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <label
              htmlFor="role"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 
                 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-gray-600"
            >
              Role
            </label>
          </div>

          <button
            type="submit"
            className="text-white bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:outline-none 
               focus:ring-cyan-300 font-medium rounded-lg text-sm w-full sm:w-auto 
               px-5 py-2.5 text-center"
          >
            Register
          </button>

          <div className="text-sm font-medium text-gray-500 mt-4">
            Already a user?{" "}
            <Link to="/" className="text-gray-700 hover:underline">
              Login
            </Link>
          </div>
        </form>

      </div>
    </section>
  );
}
