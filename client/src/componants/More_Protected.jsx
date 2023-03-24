import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const More_Protected = ({isAuthenticated}) => {
    return (
        isAuthenticated ? <Outlet /> : <Navigate to='/login' />
)}

export default More_Protected
