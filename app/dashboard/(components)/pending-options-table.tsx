'use client'
import ToolTip from "@/components/tool-tip"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { ExraOption } from "@prisma/client"
import axios from "axios"
import { Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

type Props = {
    extraOptions:ExraOption[]
}


const PendingOptionsTable = ({extraOptions}: Props) => {


        const [isLoading, setIsLoading] = useState('');
        const router = useRouter();
      
        const toggleOption = async (id: string) => {
          try {
            setIsLoading(id);
            await axios.post(`/api/option/${id}`);
            toast.success("Done successfully!");
            router.refresh();
          } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
          } finally {
            setIsLoading('');
          }
        };
  return (
    <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Label</TableHead>
        <TableHead>Description</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Action</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {extraOptions.map((option) => (
        <TableRow key={option.id}>
          <TableCell>{option.label}</TableCell>
          <TableCell className="max-w-[100px]">
            <ToolTip side="top" title={option.description}>
              {option.description}
            </ToolTip>
          </TableCell>
          <TableCell>€ {option.price}</TableCell>
          <TableCell>
            <span
              className={cn(
                "p-1 rounded-full px-2 bg-green-500/20 text-green-500",
                !option.isActive && "bg-rose-500/20 text-rose-500"
              )}
            >
              {option.isActive ? "Active" : "inActive"}
            </span>
          </TableCell>
          <TableCell>
            <Button
              disabled={isLoading===option.id}
              onClick={() => toggleOption(option.id)}
            >
              {option.isActive ? "Disable" : "Enable"}
              {isLoading===option.id && (
                <Loader className="ml-3 w-4 h-4 animate-spin" />
              )}
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  )
}

export default PendingOptionsTable