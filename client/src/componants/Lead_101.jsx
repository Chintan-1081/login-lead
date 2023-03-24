import React from 'react'
import Form_NavBar from './form/Form_NavBar'
import Sidebar_final_101 from './Sidebar_final_101'

const Lead_101 = () => {
  return (
    <div>
       <div className="flex h-screen sticky top-0">
                <div className="flex-grow bg-gray-100 overflow-y-auto h-screen">
                    <div className="p-4">
                        <Form_NavBar />
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Lead_101
