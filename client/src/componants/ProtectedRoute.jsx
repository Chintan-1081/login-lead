import React from 'react'
import { Navigate, Route } from 'react-router-dom'
// import Dashboard from './Dashboard'

const ProtectedRoute = ({ isAuthenticated, element }) => {
  return (
     isAuthenticated ? element : <Navigate to="/login" /> 
  )
}

export default ProtectedRoute
