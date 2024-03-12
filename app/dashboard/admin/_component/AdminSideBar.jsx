import React from 'react'
import SidebarRouters from './SidebarRouters'
import Image from 'next/image'

const AdminSideBar = () => {
  return (
    <div className='h-full border-r shadow-sm flex flex-col overflow-y-auto'>

            <div className='p-6'>
                <Image 
                width={140}
                height={140}
                alt='logo image'
                src='/logo.svg'
                />  
            </div>
            <div className='flex flex-col w-full'>

                <SidebarRouters />
                  
            </div>

    </div>
  )
}

export default AdminSideBar