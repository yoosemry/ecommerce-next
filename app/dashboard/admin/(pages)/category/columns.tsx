'use client'

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { useRouter } from "next/navigation"

import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import AlertDialogBox from "./_components/AlertDialogBox"

export type CategoryType = {
  id: string
  name : string
  createdAt: string
}


export const columns: ColumnDef<CategoryType>[] = [
  {
    accessorKey: "id",
   header: () => <div className="text-left">Id</div>,
    cell: ({ row }) => {
    const ViewCHaracter = row.getValue("id").slice(7, 25)
  
      return <div className="text-left font-mediem">{ViewCHaracter}</div>
    }},
  
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
         <div className="">Name</div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "created",
    header: ({column}) => {
      return(
        <>
         <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
        <div className="">Created At</div>
     
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        </>
      )
    } ,
    cell: ({ row }) => {
      const formattedDate = new Date(row.getValue("created")).toLocaleDateString();
  return <div className=" font-medium">{formattedDate}</div>
    }
  },
{
  header : () => <div className="text-right font-medium pr-2 md:pr-8">Action</div>,
  id: "actions",
  cell: ({ row }) => {
    
    const categoryInfo = row.original;
    const router = useRouter();
    return (
      <div className="flex space-x-4 justify-end">

      <Button variant={"outline"} size={"sm"} onClick={() => router.push(`category/${categoryInfo.id}`)}>Update</Button>
      
      <AlertDialogBox  id={categoryInfo.id}/>
      
      </div>
    )}
  }

]