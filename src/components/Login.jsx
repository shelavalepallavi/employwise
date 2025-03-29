import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('eve.holt@reqres.in')
  const [password, setPassword] = useState('cityslicka')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email: email.trim(), // Ensure no extra spaces
        password: password.trim(),
      });
  
      console.log('Login Success:', response.data); // Debugging log
      localStorage.setItem('token', response.data.token);
      navigate('/users');
    } catch (error) {
      console.error('Error Response:', error.response?.data || error.message);
      setError(error.response?.data?.error || 'Something went wrong');
    }
  };
  
  return (
    <div className='bg-black/20 w-full h-screen fixed flex justify-center items-center z-50 inset-0'>
        <form action="" className='bg-white p-6 flex flex-col gap-4 rounded-md w-96' onSubmit={handleLogin}>
          <h1 className='text-center font-semibold text-2xl mb-2'>Login</h1>
          <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} className='w-full border border-gray-400 rounded-md p-2 outline-0' required/>
          <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} className='w-full border border-gray-400 rounded-md p-2 outline-0' required/>

          {error && <p className="text-red-500">{error}</p>}
          <button type='submit' className='bg-indigo-600 text-white font-semibold rounded-md  py-2 hover:bg-indigo-700 cursor-pointer'>Login</button>
        </form>
    </div>
  )
}

export default Login
