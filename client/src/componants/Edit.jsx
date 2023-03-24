import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  // const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate()
  // Access the data object passed from the Table_Row component
  const { username, email, message, tableId } = location.state;


  const [updateData, setUpdateData] = useState({
    username: username,
    tableId: tableId,
    email: email,
    message: message
  })

  const HandleChange = (e) => {
    const { value, name } = e.target
    setUpdateData((prev) => ({
      ...prev, [name]: value
    }))
  }

  const HandleUpdate = async (e) => {
    e.preventDefault()
    const res = await fetch("http://localhost:3000/api/update", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData), // body data type must match "Content-Type" header
    })
    const data = await res.json()
    if (data.update){
      navigate('/auth/lead/data')
    }
  }

  return (
    <>
      <div className="relative flex flex-col justify-center overflow-hidden mt-4 p-2 pt-3  mb-3">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-[#1453db] lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-[#4964df] underline uppercase decoration-wavy">
            Update Data
          </h1>
          <form className="mt-6" onSubmit={HandleUpdate}>
            <div className="mb-2">
              <label>
                <span className="text-gray-700">Username can't be change here</span>
                <input readOnly
                  type="text"
                  name="username"
                  value={username}
                  className="w-full block px-16 py-2 mt-2 border-gray-300
                                   rounded-md shadow-sm focus:border-red-500  focus:outline-none
                                 focus:ring-red-200 focus:ring-opacity-50"
                  placeholder="Username"
                  required
                />
              </label>
            </div>
            <div className="mb-2">
              <label>
                <span className="text-gray-700">Email address</span>
                <input onChange={HandleChange} value={updateData.email}
                  name="email"
                  type="email"
                  className=" block  w-full  mt-2 px-16 py-2 border-gray-300
                                    rounded-md shadow-sm focus:border-indigo-300 focus:ring
                                focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Email address"
                  required
                />
              </label>
            </div>
            <div className="mb-2">
              <label>
                <span className="text-gray-700">Message</span>
                <textarea onChange={HandleChange} value={updateData.message}
                  name="message"
                  placeholder='Message'
                  className=" block w-full  mt-2 px-16 py-8  border-gray-300
                                    rounded-md  shadow-sm focus:border-indigo-300 focus:ring
                                  focus:ring-indigo-200 focus:ring-opacity-50 "
                  rows="4"
                ></textarea>
              </label>
            </div>

            <div className="mb-4 flex justify-center">
              <button
                type="submit"
                className=" h-10 px-5 text-indigo-100 bg-[#3163ce] rounded-lg hover:text-black
                                transition-colors duration-150 focus:shadow-outline
                                hover:bg-[#51c1f5]" >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Edit
