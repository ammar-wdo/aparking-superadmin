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