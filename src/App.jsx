import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import UsersList from './components/UsersList';

const App = () => {
  const [search, setSearch] = useState('')
  return (
   <Router>
     <div className='w-full'>
      <Navbar search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/users' element={<UsersList search={search} />}/>
      </Routes>
    </div>
   </Router>
  )
}

export default App
