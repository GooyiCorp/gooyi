import React from 'react'
import LoginForm from './../ui/login-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Page() {
  return (
      <div className='flex items-center justify-center h-screen'>
        <ToastContainer />
        <LoginForm />
    </div>
  )
}



export default Page
