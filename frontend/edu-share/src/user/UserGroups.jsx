import React, { useState, useEffect } from "react";
import Sidenav from "./SideNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserGroups() {
  const [groups, setGroups] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")); // from login response
  const userId = user?.id;
  const navigate = useNavigate();

  useEffect(() => {
    fetchGroups();
  }, [userId]);

  const fetchGroups = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/get_user_groups/${userId}`
      );
      setGroups(res.data.groups);
    } catch (err) {
      console.log(err);
    }
  };

  // leave group
  const leaveGroup = async (groupId) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/groups/${groupId}/leave`, {
        userId,
      });
      // refresh groups after leaving
      setGroups((prev) => prev.filter((g) => g._id !== groupId));
    } catch (err) {
      console.error("Error leaving group:", err);
    }
  };

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

                <div className="mt-auto flex gap-2">
                  <button
                    onClick={() =>
                      navigate(`/user/group/${group._id}/conversations`)
                    }
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300"
                  >
                    View Group
                  </button>

                  <button
                    onClick={() => leaveGroup(group._id)}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
                  >
                    Leave
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
