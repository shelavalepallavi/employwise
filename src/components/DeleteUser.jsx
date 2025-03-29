import axios from 'axios';
import React from 'react'

const DeleteUser = ({userId, closeDelete, onUserDelete}) => {

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`https://reqres.in/api/users/${userId}`);
      onUserDelete(userId); // Update state and localStorage
      closeDelete();
      alert("User deleted successfully!");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Error deleting user!");
    }
  };

  return (
    <div className='w-full h-screen fixed flex justify-center items-center z-50 inset-0 '>
      <div className='bg-white w-96 px-6 py-8 rounded-md shadow-md flex flex-col gap-4'>
        <h1 className='text-center font-semibold'>Are you sure you want to delete user?</h1>
        <div className='flex items-center justify-center gap-4'>
        <button onClick={closeDelete} className='bg-gray-500 text-white px-3 py-1 rounded cursor-pointer'>Cancel</button>
        <button onClick={handleDeleteUser} className='bg-indigo-600 text-white px-3 py-1 rounded cursor-pointer'>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteUser
