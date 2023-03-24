import './App.css'
import { Login } from './componants/Login'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import Register from './componants/Register'
import Authenticated from './componants/Authenticated'
import PrivateRoute from './componants/PrivateRoute'
import { useEffect, useState } from 'react'
import PageNotFound from './componants/PageNotFound'
import Cookies from 'js-cookie'
import Create_Form from './componants/form/Create_Form'
import Lead from './componants/Lead'
import Dashboard from './componants/Dashboard'
import ProtectedRoute from './componants/ProtectedRoute'
import Data_form from './componants/form/Data_form'
import More_Protected from './componants/More_Protected'
import Dashboard_101 from './componants/Dashboard_101'
import Lead_101 from './componants/Lead_101'
import Sidebar_final_101 from './componants/Sidebar_final_101'
import Form_NavBar from './componants/form/Form_NavBar'
import Edit from './componants/Edit'



function App() {
  const url ="http://localhost:3000"
  const [sessionId, setSessionId] = useState("")
  const [isAuthenticated, setIsAuthenticated] =
    useState(() => {
      // Get the authentication state from localStorage or default to false
      return JSON.parse(localStorage.getItem('isLoggedIn')) || false;
      // if (localStorage.getItem('isLoggedIn')) {
      //   return true
      // }else false;
    });

  // Store the authentication state in localStorage whenever it changes
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('isLoggedIn', JSON.stringify(isAuthenticated));
    }


  }, [isAuthenticated]);

  const handleLogin = (sessionId) => {
    setIsAuthenticated(true);
    setSessionId(sessionId);
    // localStorage.setItem('isLoggedIn', false);
    localStorage.setItem('isLoggedIn', JSON.stringify(isAuthenticated));
  };

  const handleLogout = async () => {
    setIsAuthenticated(false)
    Cookies.remove('user123', { path: "/" })
    localStorage.clear();
    // Delete an item from localStorage
    // localStorage.removeItem("myKey");
    const options = {
      method: "POST",
      cache: "no-cache",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({})
    }
    const res = await fetch(`${url}/logout`, options)
    // const data = await res.json();
    // console.log(data);
    // console.log(".............................")

  };

  return (
    <>
      <Router>
        <Routes>
          {/* <Login /> */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {/* Register */}
          <Route path='/' exact element={<Register />} />

          {/* Try  */}
          {/* Authenticated */}
          <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
            <Route path='Authenticated' index element={<Authenticated onLogout={handleLogout} />} />
            {/* </Route> */}
            {/* <Route path='form/*' element={<Lead onLogout={handleLogout}  />} />*/}

          </Route>

          {/* Better try */}
          {/* <Route exact path="/dashboard" element={<Dashboard />} />  */}
          <Route path='/Authenticated/dashboard'
            element={<ProtectedRoute isAuthenticated={isAuthenticated}
              element={<Dashboard onLogout={handleLogout} />} />} />
          <Route path='/Authenticated/lead'
            element={<ProtectedRoute isAuthenticated={isAuthenticated} path="/dashboard"
              element={<Lead onLogout={handleLogout} isAuthenticated={isAuthenticated} />} />} >
            <Route path='create' element={<Create_Form />} />
            <Route path='data' element={<Data_form />} />
          </Route>

          {/* This is win */}
          <Route element={<More_Protected isAuthenticated={isAuthenticated} />}>
            <Route path='/' element={<Sidebar_final_101 onLogout={handleLogout} />} >
              <Route path='/auth' element={<Navigate replace to='/auth/dashboard' />} />
              <Route path='/auth/dashboard' element={<Dashboard_101 />} />
              <Route path='/auth/lead' element={<Form_NavBar />} >
                <Route path='/auth/lead' element={<Navigate replace to='/auth/lead/create' />} />
                <Route path='create' element={<Create_Form />} />
                <Route path='data' element={<Data_form />} />
                <Route path='edit' element={<Edit />} />
                {/* </Route> */}
              </Route>
            </Route>
            <Route path='/auth/lead/data/edit/:id' element={<Edit />} />
          </Route>
          <Route path='edit' element={<Edit />} />
          {/* Pagenotfound */}
          <Route path='*' element={<PageNotFound />} />

        </Routes>
      </Router>

    </>
  )
}

export default App
