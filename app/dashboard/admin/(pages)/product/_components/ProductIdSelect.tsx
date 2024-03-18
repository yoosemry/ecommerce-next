'use client'

import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Control, Controller, useController } from 'react-hook-form'
import { FormItem, FormLabel } from '@/components/ui/form'
import axios from 'axios'
import { API } from '@/lib/config'
import { Categoty } from '@prisma/client'


const ProductIdSelect = ({ control }: { control: Control<any> }) => {

  const [categories, setCategories] = useState<Categoty[]>([]);

  useEffect(() => {



    const fetchCategories = async () => {
      try {

        const { data } = await axios.get(`${API}/admin/category`);
        setCategories(data);


      } catch (err) {
        console.error("something went wrong", err);
      }

    }


    fetchCategories()

  }, [])

  return (

    <Controller
      name='categoryId'
      control={control}
      render={({ field }) => (

        <FormItem>
          <FormLabel>Select Category</FormLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Choose Category Name" />
            </SelectTrigger>

            <SelectContent>

              {categories.map(cat =>

                <SelectItem className='text-md' key={cat.id} value={cat.id}>{cat.name}</SelectItem>
              )}

            </SelectContent>
          </Select>
        </FormItem>
      )}
    />


  )
}

export default ProductIdSelect