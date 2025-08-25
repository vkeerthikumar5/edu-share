import React from "react";
import { NavLink } from "react-router-dom";

export default function UserTab() {
  const tabClass =
    "inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group";
  const inactive =
    "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300";
  const active =
    "text-gray-600 border-gray-600 dark:text-gray-500 dark:border-blue-500";

  return (
    <div className="my-8 border-b border-gray-200 dark:border-gray-700">
      <ul className="flex flex-wrap justify-center -mb-px text-sm font-medium text-center">
        

        <li className="me-2">
          <NavLink
            to="./resources"
            className={({ isActive }) =>
              `${tabClass} ${isActive ? active : inactive}`
            }
          >
            {({ isActive }) => (
              <>
                <i class="fas fa-book-open"></i>
                &nbsp; Resources
              </>
            )}
          </NavLink>
        </li>
        <li className="me-2">
          <NavLink
            to="./conversations"
            className={({ isActive }) =>
              `${tabClass} ${isActive ? active : inactive}`
            }
          >
            {({ isActive }) => (
              <>
                <i className="fas fa-comments"> </i>
                &nbsp; Conversations
              </>
            )}
          </NavLink>
        </li>
        <li className="me-2">
          <NavLink
            to="./groupInfo"
            className={({ isActive }) =>
              `${tabClass} ${isActive ? active : inactive}`
            }
          >
            {({ isActive }) => (
              <>
                <i class="fas fa-info"></i>
                &nbsp; About Group
              </>
            )}
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
