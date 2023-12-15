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
import FaqForm from "@/app/dashboard/faq/(components)/faq-form"
type Props = {}

const FaqModal = (props: Props) => {
    const {open,type,setClose,data} = useModal()
    const isOpen = open && type==='faq-modal'
 
  return (
    <Dialog open={isOpen} onOpenChange={()=>{setClose()}}>
  
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create a new Question</DialogTitle>
      
       <FaqForm />
      </DialogHeader>
      <DialogFooter>
  
        
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default FaqModal