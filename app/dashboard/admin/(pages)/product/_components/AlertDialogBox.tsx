
"use client"
import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { API } from '@/lib/config'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Loader2Icon } from 'lucide-react'
  

const AlertDialogBox =  ({id} : {id : string}) => {

  const quertClient = useQueryClient();
  const router = useRouter();

  const [loading , setLoading] = useState(false)
  const handleDelete = async()=>{

    try {
      setLoading(true)
      await axios.delete(`${API}/admin/category/${id}`)
      quertClient.invalidateQueries({queryKey : ['category']});
      toast.success("deleted Successfully")
     // router.push('/dashboard/admin/category')
     
     setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error("Unknown Error Please Try Again")
    }

  }
  
  return (
    <div>
        <AlertDialog>
  <AlertDialogTrigger>

    {loading ? <Button  variant={"destructive"} size={"sm"}><Loader2Icon className='h-5 w-5 text-black animate-spin'/></Button>  :  <Button variant={"destructive"} size={"sm"}>Delete</Button>}
 

  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader> 
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </div>
  )
}

export default AlertDialogBox