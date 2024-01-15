"use client";

import { Badge } from "@/components/ui/badge";
import { useModal } from "@/hooks/modal-hook";
import { Company, Service } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import ToolTip from "@/components/tool-tip";
import { Button } from "@/components/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

type FullService =Service &{entity:{id:string,entityName:string,company:{name:string}}}

export const servicesColumns: ColumnDef<FullService>[] = [
  {
    accessorKey: "name",
  
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
    accessorKey: "entity.entityName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Entity name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "entity.company.name",
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
    accessorKey: "parkingAddress",
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
    accessorKey: "parkingCountry",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Country
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },

  {
    accessorKey: "isActive",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) =>
      !row.getValue("isActive") ? (
        <Badge
          className="bg-yellow-500/20 text-yellow-500 border-none"
          variant="outline"
        >
          Pending
        </Badge>
      ) : (
        <Badge
          variant="outline"
          className="bg-green-500/20 text-green-500 border-none"
        >
          Active
        </Badge>
      ),
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => (
      <div className="p-1 flex items-center gap-1">
        <ToolTip 
        title="Edit service" side="left">
        <Link    className="bg-primary block text-white p-2 rounded-sm" href={`/dashboard/services/${row.original.id}`}>
      <Edit className="w-3 h-3" />
      </Link>
        </ToolTip>
    
        
        
      </div>
    ),
  },
];
