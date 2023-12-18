'use client'


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useModal } from "@/hooks/modal-hook"
import { Button } from "../ui/button"

import axios from "axios"
import { useState } from "react"
import { Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useCategory } from "@/app/dashboard/blogs/category.hook"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import CategoryForm from "@/app/dashboard/blogs/(components)/categoryForm"
type Props = {}

const CategoryModal = (props: Props) => {
    const {open,type,setClose,data} = useModal()
    const isOpen = open && type==='category-modal'
 
  return (
    <Dialog open={isOpen} onOpenChange={()=>{setClose()}}>
  
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{data.category ? "Edit category" :"Create a new category "}</DialogTitle>
      
       <CategoryForm />
      </DialogHeader>
      <DialogFooter>
  
        
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default CategoryModal