import React, { useState } from 'react'
import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import Table_Row from '../Table_Row'


const Data_form = () => {
    const Fetch_data = useOutletContext()
    const [formData, setFormData] = useState([])
    const [headData, setHeadData] = useState([])

    const featch_Formdata = async () => {
        const result = await fetch("http://localhost:3000/formdata", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "hii": "Cddc" }), // body data type must match "Content-Type" header
        })

        const res = await result.json()
        setFormData([res.rows][0])
        if ([res.rows][0].length) setHeadData(Object.keys(res.rows[0]))

    //  console.log("Xasxas",[res.rows][0].length)
    }
    useEffect(() => {
        setFormData(formData)
    }, [formData, setFormData])


    useEffect(() => {
        featch_Formdata()
    }, [])

    const Delete_data = (username) => {
        console.log(".......................")
        setFormData(formData.filter( (item) => item.username !== username))
        console.log(formData)
    } 


    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        { headData.map((item) => 
                        <th key={item} scope="col" className="px-6 py-3">
                            {item}
                        </th>
                        ) }
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Delete</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    { formData.map((item, index) => 
                    <Table_Row Delete_data={Delete_data} key={item.id} id={index + 1} 
                    tableId={item.id} username={item.username} message={item.message} 
                    email={item.email} />) }
                </tbody>
            </table>
        </div>
    )
}

export default Data_form
