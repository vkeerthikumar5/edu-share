import axios from 'axios';
import React, { useState , useEffect} from 'react'
import { useParams, Outlet } from 'react-router-dom'; // 👈 import Outlet
import Sidenav from './SideNav';
import UserTab from './UserTab';

export default function UserGroupInfo() {
    const { group_id } = useParams();
    const [name, setName] = useState();

    useEffect(() =>{
        const fetchInfo = async () => {
            try {
                let res = await axios.get(`http://localhost:5000/group_info/${group_id}`);
                setName(res.data.info.name);
                console.log(res);
            } catch(err) {
                console.log(err.message);
            }
        };
        fetchInfo();
    }, [group_id]); // 👈 add dependency

    return (
        <div className="flex">
          {/* Sidebar */}
          <Sidenav />
    
          {/* Main Content */}
          <div className="flex-1 p-6 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
              <p className="text-2xl underline underline-offset-4 text-gray-700 text-center font-semibold">
                {name || "Your Groups"}
              </p>
    
              <div>
                <UserTab/>
              </div>

              {/* 👇 nested route will render here */}
              <Outlet />  
            </div>
          </div>
        </div>
      );
}
