import React, { useState, useEffect } from 'react'
import Sidenav from './SideNav';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function YourGroups() {
  const [groups, setGroups] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")); // from login response
  const adminId = user?.id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/get_groups/${adminId}`);
        console.log(res.data.groups);  // <-- check your backend response
        setGroups(res.data.groups);   // <-- fix here
      } catch (err) {
        console.log(err);
      }
    };
    fetchGroups();
  }, [adminId]);

  if (groups.length === 0) {
    return (
      <div>
        <Sidenav />
        <div className="flex-1 p-6 sm:ml-64">
          <p className="text-center text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidenav />

      {/* Main Content */}
      <div className="flex-1 p-6 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <p className="text-2xl underline underline-offset-4 text-gray-700 text-center font-semibold">
            Your Groups
          </p>

          <div className="m-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {groups.map((group, index) => (
              <div
                key={index}
                className="max-w-sm flex flex-col justify-between p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
              >
                <div>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {group.name}
                  </h5>
                  <p className=" font-normal text-gray-700 dark:text-gray-400">
                    {group.description}
                  </p>
                  <p className="mb-3 text-xs font-normal text-gray-700 dark:text-gray-400">
                    Join Code: {group.joinCode}
                  </p>
                </div>
                <button
                onClick={() => navigate(`/admin/group/${group._id}/conversations`)}
                className="mt-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300"
              >
                View Group
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
              </div>
              
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
