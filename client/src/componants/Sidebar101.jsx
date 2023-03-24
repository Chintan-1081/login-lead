import React, { useState } from 'react'

import { Navigate, useNavigate, redirect, Link } from 'react-router-dom';

const Sidebar101 = ({ onLogout }) => {
    let navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Dashboard');
    const tabs = [
        { name: 'dashboard', icon: 'home' },
        { name: 'Settings', icon: 'cog' },
        { name: 'Help', icon: 'question-mark-circle' },
        { name: 'lead' }]

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        let hii = <Navigate to={`/Authenticated/${tabName}`} />
        console.log(hii)
        navigate(`/Authenticated/${tabName}`)
        console.log(tabName);
        return hii;
    };
    const HandleLogout = () => onLogout()
    return (
        <div>
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

                            {tab.name}

                        </li>
                    ))}
                </ul>
                <div className='flex justify-center'>
                    <button onClick={HandleLogout} className='absolute bottom-2 px-6 py-2 text-lg bg-gray-700 hover:bg-gray-500 ease-out rounded-sm ' >logout</button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar101
