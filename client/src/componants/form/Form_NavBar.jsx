import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'


import Create_Form from './Create_Form'
import Data_form from './Data_form'

const Form_NavBar = ({ isAuthenticated }) => {

  const navigate = useNavigate();
  const form_nav_item = ["create", "data"]
  // const [activeTab, setActiveTab] = useState("create")
  const [activeTab, setActiveTab] = useState(() => {
    const savedActiveTab = localStorage.getItem("activeTab_topnav");
    return savedActiveTab !== null ? savedActiveTab : "create";
  });

  useEffect(() => {
    navigate(`/auth/lead/${activeTab}`)
  }, [])

  // useEffect(() => {
  //   navigate(`/auth/lead/${activeTab}`)
  // },[])

  const HandleTabClick = (activeTab) => {
    setActiveTab(activeTab)
    localStorage.setItem("activeTab_topnav", activeTab);
    navigate(`/auth/lead/${activeTab}`)
  }

  return (
    <>

      <div>
        <div className="mt-0 bg-gray-900 text-white  rounded-sm">
          <ul className='flex justify-center space-x-10 text-[18px] '>
            {form_nav_item.map((item, index) =>
              <li key={index} onClick={() => HandleTabClick(item)}
                className={`cursor-pointer p-2 m-2 w-20 text-center ${activeTab === item ? 'bg-gray-600' : ""}`} >
                {item}
              </li>)}
          </ul>
        </div>

        <div className='overflow-y-auto'>
          <Outlet />
          {/* </Outlet> */}
          {/* {activeTab === "Create" && <Create_Form />} */}
          {/* {activeTab === "Data" && <Data_form />} */}
        </div>
      </div>

    </>
  )
}

export default Form_NavBar
