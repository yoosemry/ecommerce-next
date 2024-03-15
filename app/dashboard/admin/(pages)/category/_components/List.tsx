'use client'

import { API } from '@/lib/config'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import axios from "axios"
import { Table } from '@/components/ui/table'
import { DataTable } from '@/components/ui/data-table'
import { columns } from '../columns'

const List = () => {

  const {data , isLoading , isError} = useQuery({
        queryKey : ['category'],
        queryFn : ()=> axios.get(`${API}/admin/category`).then(res => res.data),
        staleTime: 60 * 1000,
        retry : 3
    })


    if(isLoading) return <h1>Loading ...</h1>


  return (
    <div className=' w-full text-start'>

<DataTable columns={columns} data={data} title={data.id} />

    </div>
  )
}

export default List