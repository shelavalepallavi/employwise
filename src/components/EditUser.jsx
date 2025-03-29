import axios from 'axios'
import React, { useState } from 'react'

const EditUser = ({userData, closeEdit, onUserUpdate}) => {
  const [user, setUser] = useState({...userData})

  
  const handleEditUser = async() =>{
    try {
      const response = await axios.put(`https://reqres.in/api/users/${user.id}`, user)
      console.log("user updated", response.data)
      onUserUpdate(user)
      closeEdit()
      alert("User updated successfully!");
    } catch (err) {
      console.log(err)
      alert("Error updating user!");
    }
  }

  
  return (
    <div className='w-full h-screen fixed flex justify-center items-center z-50 inset-0 '>
      <div className='bg-white w-96 p-6 rounded-md shadow-md'>
        <h2 className='text-xl font-bold mb-4 text-center'>Edit User</h2>
        <input
          type='text'
          value={user.first_name}
          onChange={(e) => setUser({ ...user, first_name: e.target.value })}
          className='w-full border-[0.5px] border-gray-400 p-2 mb-2 rounded-md outline-0'
          placeholder="First Name"
        />
        <input
          type='text'
          value={user.last_name}
          onChange={(e) => setUser({ ...user, last_name: e.target.value })}
          className='w-full border-[0.5px] border-gray-400 p-2 mb-2 rounded-md outline-0 my-2'
          placeholder="Last Name"
        />
        <input
          type='email'
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className='w-full border-[0.5px] border-gray-400 p-2 mb-4 rounded-md outline-0'
          placeholder="Email"
        />
        <div className='flex justify-end gap-2'>
          <button onClick={closeEdit} className='bg-gray-500 text-white px-3 py-1 rounded cursor-pointer'>Cancel</button>
          <button onClick={handleEditUser} className='bg-indigo-600 text-white px-3 py-1 rounded cursor-pointer'>Save</button>
        </div>
      </div>
    </div>
  )
}

export default EditUser
