import React from 'react'
import CategoryForm from '../_components/CategoryForm'
import { notFound } from 'next/navigation';


const CategoryUpdate = async ({ params }: { params: { id: string } }) => {

  let category;


  try {

    category = await prisma?.categoty.findUnique({ where: { id: params.id } })

    if (!category) notFound()

  } catch (error) {
    notFound()

  }

 


  return (
    <div>

      <CategoryForm category={category} />

    </div>
  )
}

export default CategoryUpdate