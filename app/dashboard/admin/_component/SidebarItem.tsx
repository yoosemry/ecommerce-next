'use client '
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'


interface sidebarItemsProps {
    id: number;
    icon : LucideIcon;
    label: string;
    href: string;
}

const SidebarItem = ({id , icon : Icon , label , href } : sidebarItemsProps) => {

    const pathName = usePathname();
    const router = useRouter();

    const IsActive = pathName.includes(href);


  return (
    <button 
    onClick={()=> router.push(`/dashboard/admin/${href}`) }
    className={cn("mt-2 flex items-center w-full gap-x-2 text-slate-500 font-[500] pl-6 transition-all group hover:bg-main-50 hover:text-main-600" , IsActive && "text-main-600 bg-main-50") }>

        <div className='flex items-center gap-x-2 py-4'>
            <Icon size={22} className={cn('text-scale-500 group-hover:text-main-600')}/>
            {label}
        </div>
         <div className={cn('opacity-0 border-2 border-main-600 h-[50px] transition-all ml-auto', IsActive && "opacity-1")}/>
    </button>
  )
}

export default SidebarItem