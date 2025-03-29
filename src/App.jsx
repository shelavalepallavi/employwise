import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import UsersList from './components/UsersList';

const App = () => {
  const [search, setsearch] = useState('')
  return (
   <Router>
     <div className='w-full'>
      <Navbar search={search} setsearch={setsearch} />
      <Routes>
        <Route path="/" element={<Navigate to="/users" />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/users' element={<UsersList search={search} />}/>
      </Routes>
    </div>
   </Router>
  )
}

export default App
