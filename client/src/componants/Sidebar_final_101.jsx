import React, { useState } from 'react';
import { useEffect } from 'react';
import { Navigate, useNavigate, redirect, Link, Outlet } from 'react-router-dom';

function Sidebar_final_101({ onLogout }) {
  let navigate = useNavigate();

  const tabs = [
    { name: 'dashboard', icon: 'home' },
    { name: 'Settings', icon: 'cog' },
    { name: 'Help', icon: 'question-mark-circle' },
    { name: 'lead' }
  ];
  // const [activeTab, setActiveTab] = useState('dashboard');
  const [activeTab, setActiveTab] = useState(() => {
    const savedActiveTab= localStorage.getItem("activeTab");
    return savedActiveTab !== null ? savedActiveTab : "dashboard";
  });
  // const [activeTheTab, setActiveTheTab] = useState("")



  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    localStorage.setItem("activeTab",`${tabName}`)
    navigate(`/auth/${tabName}`)
  };


  const HandleLogout = () => onLogout()

  return (
    <>
      <div className="flex h-screen sticky top-0">



        <div className="flex-none w-64 bg-gray-900 text-gray-100 h-screen">
          <div className="p-4 text-lg font-bold">My App</div>

          <ul className="p-2 ">
            {tabs.map((tab) => (
              <li
                key={tab.name}
                className={`px-4 py-2 cursor-pointer ${activeTab === tab.name ? 'bg-gray-700' : ''
                  }`}
                onClick={() => handleTabClick(tab.name)}
              >
                {/* <i className={`fas fa-${tab.icon} mr-2`}></i> */}
                {/* {tab.name} */}
                {tab.name}
              </li>
            ))}
          </ul>
          <div className='flex justify-center'>
            <button onClick={HandleLogout} className='absolute bottom-2 px-6 py-2 text-lg bg-gray-700 hover:bg-gray-500 ease-out rounded-sm ' >logout</button>
          </div>
        </div>

        <div className="flex-grow bg-gray-100 overflow-y-auto h-screen">
          <div className="p-4">
            <Outlet />
          </div>
        </div>
      </div>
      {/* <Link to="/dashboard" /> */}
      {/* {activeTab === 'dashboard' && <Redirect to="/Authenticated/dashboad" />} */}
      {/* {activeTab === 'Dashboard' && navigate('/Authenticated/lead')} */}
    </>
  );
}

export default Sidebar_final_101;