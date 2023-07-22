import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './Home'
import Signup from './Signup'
import Login from './Login'
import Book_Movie_Show from './Book_Movie_Show'
import Book_Event_Show from './Book_Event_Show'
import Admin_Login from './admin/Admin_Login'
import Admin_Signup from './admin/Admin_Signup'

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}  />
        <Route path='/shows' element={<Home />}  />
        <Route path='/user/signup' element={<Signup />}  />
        <Route path='/user/login' element={<Login />}  />
        <Route path='/book/movie' element={<Book_Movie_Show />}  />
        <Route path='/book/event' element={<Book_Event_Show />}  />
        {/* //////////////////////////////// */}
        <Route path='/admin/login' element={<Admin_Login />}   />
        <Route path='/admin/signup' element={<Admin_Signup />}   />
      </Routes>
    </div>
  )
}


export default AllRoutes
