
import React, { useState } from 'react';
import Sidebar from './Sidebar_final_101';
// import Dashboard from './Dashboard';
// import Form_Slide from './Form_Slide';
// import { useNavigate } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link
} from "react-router-dom"
import Form_NavBar from './form/Form_NavBar';
import Data_form from './form/Data_form';
import Create_Form from './form/Create_Form';
import Sidebar101 from './Sidebar101';


function Authenticated({ onLogout }) {
  let navigate = useNavigate();


  return (
    <div className="flex h-screen sticky top-0">
      {/* <Sidebar onLogout={onLogout} /> */}
      <Sidebar101 onLogout={onLogout} />
      <div className="flex-grow bg-gray-100 overflow-y-auto h-screen">
        <div className="p-4">
         
          {/* {activeTab === 'Dashboard' && Link} */}
          {/* {activeTab === 'form' &&<Form_Slide /> }
          {/* {activeTab === 'form' && navigate('/form') } */}
          {/* Add additional tabs and components here */}
        </div>
      </div>

    </div>
  );
}

export default Authenticated;

