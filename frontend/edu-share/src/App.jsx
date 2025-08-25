import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { AuthProvider } from "./context/AuthContext";
import './App.css'
import ProtectedRoute from './pages/ProtectedRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import Main from './pages/Main';
import User_Dashboard from './user/User_Dashboard';
import A_Dashboard from './admin/A_Dashboard';
import AddGroups from './admin/AddGroups';
import YourGroups from './admin/YourGroups';
import JoinGroup from './user/JoinGroup';
import UserGroups from './user/UserGroups';
import GroupInfo from './admin/groupInfo';
import Conversations from './admin/groupInfo/Conversations';
import Resources from './admin/groupInfo/Resources';
import AboutGroup from './admin/groupInfo/AboutGroup';
import UserGroupInfo from './user/User_GroupInfo';
import UserConversations from './user/UserConversations';
import UserResources from './user/UserResources';
import UserAboutGroup from './user/UserAboutGroup';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Main><Login /></Main>} />
            <Route path="/register" element={<Main><Register /></Main>} />

            {/* User Routes */}
            <Route element={<ProtectedRoute roles={["user"]} />}>

              <Route path="/user/dashboard" element={<User_Dashboard />} />
              <Route path="/user/join_group" element={<JoinGroup />} />
              <Route path="/user/user_groups" element={<UserGroups />} />
              <Route path="user/group/:group_id" element={<UserGroupInfo />}>
                <Route path="conversations" element={<UserConversations />} />
                <Route path="resources" element={<UserResources />} />
                <Route path="groupInfo" element={<UserAboutGroup />} />
              </Route>

            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute roles={["admin"]} />}>
              <Route path="/admin/dashboard" element={<A_Dashboard />} />
              <Route path="/admin/add_groups" element={<AddGroups />} />
              <Route path="/admin/view_groups" element={<YourGroups />} />
              <Route path="admin/group/:group_id" element={<GroupInfo />}>
                <Route path="conversations" element={<Conversations />} />
                <Route path="resources" element={<Resources />} />
                <Route path="groupInfo" element={<AboutGroup />} />
              </Route>


            </Route>


          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
