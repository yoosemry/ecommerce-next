import React from 'react'
import AdminSideBar from './_component/AdminSideBar';
import Navbar from './_component/Navbar';

const AdminLayout = ({children} : {children : React.ReactNode}) => {
  return (
    <div className='h-full'>

      <div className='h-[70px] md:pl-56 fixed inset-y-0 z-50 w-full'>

      <Navbar/>

      </div>

        <div className='hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50'>

            <AdminSideBar/>

        </div>

<main className='md:ml-5 md:pl-64 mt-[75px] h-full mx-auto py-10 mr-8'>
        {children}
  
</main>

    </div>
  )
}

export default AdminLayout