import React, { useState } from 'react'
// import Dashboard from './Dashboard';
import Form_NavBar from './form/Form_NavBar'
import Sidebar from './Sidebar_final_101'
import Sidebar101 from './Sidebar101';

const Lead = ({ onLogout }) => {

  
    return (
        <>
            <div className="flex h-screen sticky top-0">
      {/* <Sidebar activeTab={activeTab} onTabClick={handleTabClick} onLogout={onLogout} /> */}
                <Sidebar101 onLogout={onLogout} />
                <div className="flex-grow bg-gray-100 overflow-y-auto h-screen">
                    <div className="p-4">
                        <Form_NavBar />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Lead
