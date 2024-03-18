'use client'

import { API } from '@/lib/config'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import axios from "axios"

import { DataTable } from '@/components/ui/data-table'
import { columns } from '../columns'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const List = () => {
  const router = useRouter();
  const {data , isLoading , isError} = useQuery({
        queryKey : ['category'],
        queryFn : ()=> axios.get(`${API}/admin/category`).then(res => res.data),
        staleTime: 60 * 1000,
        retry : 3
    })


    if(isLoading) return <h1>Loading ...</h1>


  return (
    <div className=' w-full text-start'>
 <div className="flex justify-end">
         <Button className="md:px-7 md:mb-4" onClick={() => router.push('/dashboard/admin/product/new')}>New Product</Button>

        </div>
<DataTable columns={columns} data={data} />

    </div>
  )
}

export default List