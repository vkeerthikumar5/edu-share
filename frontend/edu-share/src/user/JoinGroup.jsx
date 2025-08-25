import React, { useState } from 'react'
import Sidenav from './SideNav';
import axios from 'axios';
export default function JoinGroup() {
    const user = JSON.parse(localStorage.getItem("user")); // from login response
    const userId = user?.id;
    const name = user?.name;
    const [code,setCode]=useState();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(code);
    
        try {
            const res = await axios.post(`http://localhost:5000/join_group`, { userId, code });
            console.log(res);
            alert(res.data.message);   // success message
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);  // backend message
            } else {
                alert(err.message);  // fallback
            }
        }
    };
    
    return (
        <div>
          <Sidenav/>
    
          <div className="flex-1 p-6 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
              <p className="text-2xl underline underline-offset-4 text-gray-600 text-center font-semibold">
                Join Group
              </p>
    
    
    
              <form className="max-w-md mx-auto my-12" onSubmit={handleSubmit}>
          {/* Event Title */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              id="code"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                border-0 border-b-2 border-gray-300 appearance-none dark:text-white 
                dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none 
                focus:ring-0 focus:border-gray-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="code"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
              duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
              peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
              peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Group Code
            </label>
          </div>
    
          
          {/* Submit */}
          <button
            type="submit"
            className="text-white bg-gray-600 hover:bg-gray-600 
            focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium 
            rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
            dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
          >
            Join Group
          </button>
        </form>
    
            </div>
          </div>
        </div>
      )
}
