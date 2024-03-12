import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import AdminSideBar from './AdminSideBar'
  

const  MobileMenu = () => {
  return (
    <Sheet>
        <SheetTrigger className='md:hidden pr-4 hover:apacity-80 transation'>
            <Menu />
        </SheetTrigger>
        <SheetContent side={"left"} className='p-0 bg-white'>
        <AdminSideBar/>
        </SheetContent>

    </Sheet>
  )
}
export default MobileMenu