import React, { useState } from 'react'
import { Navigate, Outlet, Route } from 'react-router-dom'
import Authenticated from './Authenticated';


function PrivateRoute({ isAuthenticated }) {


  return (<>
    {/* <Outlet /> */}
    {
      isAuthenticated ? <Outlet /> : <Navigate to='/login' />
    }
  </>
    // <Route path='/Authenticated' exact element={<Authenticated />} />
    // {isAuthenticated ?}
    // <Route
    //   {...rest}
    //   element={isAuthenticated ? <Element /> : <Navigate to="/login" replace />}
    // />
  );
}
export default PrivateRoute
