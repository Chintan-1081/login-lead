import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Form_NavBar from './Form_NavBar';

const Create_Form = () => {
    const url ="http://localhost:3000"
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        message: "",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [responseData, setResponseData] = useState("")
    const [formError, setFormError] = useState({})
    useEffect(() => {
        // const hii = Object.keys(formError)
        // console.log(hii)
        // console.log("this is formError", formError)
        // console.log("responseData", responseData)

    }, [formError, responseData])


    useEffect(() => {
        const FormDataPost = async () => {
            // console.log("...............")
            await fetch(`${url}/form`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData), // body data type must match "Content-Type" header
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data === "Your form is submitted successfully") {
                        setResponseData(data)
                    } else {
                        setFormError({ resError: data })
                    }

                })
            // setIsLoading(false)

        }
        if (Object.keys(formError).length === 0 && isLoading) {
            FormDataPost()
        }
        // console.log("object")
        setIsLoading(false)

    }
        , [isLoading])



    const HandleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        setResponseData("")
        setFormError({})
        // console.log(e.target)
    }

    const HandleClick = (e) => {
        e.preventDefault();
        setFormError(validate());
        if (Object.keys(formError).length === 0) {
            setIsLoading(true)
        }

    }

    ////////////it validate every input field
    const validate = () => {
        const errors = {}
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (!formData.username) {
            errors.username = "Enter Username"
            setResponseData("")
        }
        if (!formData.password) {
            errors.password = "Enter Password"
            setResponseData("")
        }
        if (!formData.email) {
            errors.email = "Enter Email"
            setResponseData("")
        } else if (!regex.test(formData.email)) {
            errors.email = "Enter  Valid Email"
            setResponseData("")
        }
        if (!formData.message) {
            errors.message = "Enter Message"
            setResponseData("")
        }

        return errors
    }



    return (
        <>
            

            <div className="relative flex flex-col justify-center overflow-hidden mt-4 p-2 pt-3  mb-3">
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-[#1453db] lg:max-w-xl">
                    <h1 className="text-3xl font-semibold text-center text-[#4964df] underline uppercase decoration-wavy">
                        Contact Form
                    </h1>
                    <form className="mt-6">
                        <div className="mb-2">
                            <label>
                                <span className="text-gray-700">Username</span>
                                <input onChange={HandleChange}
                                    type="text"
                                    name="username"
                                    className="w-full block px-16 py-2 mt-2 border-gray-300
                                           rounded-md shadow-sm focus:border-indigo-300 focus:ring
                                         focus:ring-indigo-200 focus:ring-opacity-50"
                                    placeholder="Username"
                                    required
                                />
                            </label>
                        </div>
                        <div className="mb-2">
                            <label>
                                <span className="text-gray-700">Password</span>
                                <input onChange={HandleChange}
                                    type="password"
                                    name="password"
                                    className="w-full block px-16 py-2 mt-2 border-gray-300
                                           rounded-md shadow-sm focus:border-indigo-300 focus:ring
                                         focus:ring-indigo-200 focus:ring-opacity-50"
                                    placeholder="Password"
                                    required
                                />
                            </label>
                        </div>
                        <div className="mb-2">
                            <label>
                                <span className="text-gray-700">Email address</span>
                                <input onChange={HandleChange}
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
                                <textarea onChange={HandleChange}
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
                            <button onClick={HandleClick}
                                type="submit"
                                className=" h-10 px-5 text-indigo-100 bg-[#3163ce] rounded-lg hover:text-black
                                        transition-colors duration-150 focus:shadow-outline
                                        hover:bg-[#51c1f5]" >
                                Contact Us
                            </button>
                        </div>

                        {Object.keys(formError).length ? <div className='bg-red-500 w-full p-2 text-white flex justify-center rounded-lg'>
                            {formError.username} {formError.password} {formError.email} {formError.message} {formError.resError}</div> : ""}
                        {responseData ? <div className='bg-green-600 w-full p-2 text-white flex justify-center rounded-lg' >
                            {responseData}
                        </div> : ""}
                    </form>
                </div>
            </div>
        </>
    );
};

export default Create_Form
