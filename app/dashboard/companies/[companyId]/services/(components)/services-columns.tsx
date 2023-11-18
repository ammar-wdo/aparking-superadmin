"use client";

import { Badge } from "@/components/ui/badge";
import { useModal } from "@/hooks/modal-hook";
import { Company, Service } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import NewLink from "./new-link";
import ToolTip from "@/components/tool-tip";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.



export const servicesColumns: ColumnDef<Service>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "parkingAddress",
    header: "Address",
  },
  {
    accessorKey: "parkingCountry",
    header: "Country",
  },

  {
    accessorKey: "isActive",
    header: "Status",
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
        <NewLink id={row.getValue("id")}>
      <Edit className="w-3 h-3" />
      </NewLink>
        </ToolTip>
    
        
        
      </div>
    ),
  },
];
