import React, { useState } from 'react'
import Edit from './Edit';
import { useNavigate } from 'react-router-dom'



const Table_Row = ({ id, username, email, message, Delete_data,tableId }) => {
    const navigate = useNavigate()
    const HandleDelete = async () => {
        await fetch(`http://localhost:3000/api/delete/${username}`, { method: "GET" });
        Delete_data(username)

    }

    const HandleEdit = () => {
        navigate(`/auth/lead/data/edit/${id}`, { state: { username, email, message, tableId } });
    }


    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 w-28">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {id}
            </th>
            <td className="px-6 py-4 ">
                {username}
            </td>
            <td className="px-6 py-4">
                {email}
            </td>
            <td className="px-6 py-4 max-w-xs truncate">
                {message}
            </td>
            <td className="px-6 py-4 text-right">
                <a  onClick={HandleEdit} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
            </td>
            <td className="px-6 py-4 text-right">
                <a onClick={HandleDelete} className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
            </td>
            {/* <td>
                <Edit id={id} username={username} email={email} message={message} />
            </td> */}
        </tr>
    )
}

export default Table_Row
