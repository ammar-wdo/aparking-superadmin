"use client"
 
import ToolTip from "@/components/tool-tip"
import { Badge } from "@/components/ui/badge"
import { useModal } from "@/hooks/modal-hook"
import { Company, Entity } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, Trash } from "lucide-react"
import Link from "next/link"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

type Fullentity =Entity & {
company:Company
}

 
export const entitiesColumns: ColumnDef<Entity>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "company.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "entityAddress",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Address
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "entityPlace",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Place
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "entityName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
 
  {
    accessorKey: "id",
    header: "Services",
    cell:({row})=><Link className="font-semibold underline" href={`/dashboard/services?entityId=${row.getValue("id")}`}>Manage services</Link>
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell:({row})=>!row.getValue('isActive')?<Badge className="bg-rose-500/20 text-rose-500 border-none" variant="outline">inActive</Badge>:<Badge variant="outline" className="bg-green-500/20 text-green-500 border-none">Active</Badge>
  },
  {
    accessorKey:"id",
    header: "Actions",
    cell:({row})=><div className="">
       <ToolTip title="Edit entity" side="left"> <Link href={`/dashboard/entities/${row.getValue('id')}`} className="p-2 rounded-sm bg-primary text-white flex cursor-pointer items-center justify-center"><Edit className="w-3 h-3" /></Link></ToolTip>
      
  
    </div>
  },
]