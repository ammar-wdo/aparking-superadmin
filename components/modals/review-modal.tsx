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
import ReviewForm from "@/app/dashboard/reviews/(components)/review-form"
type Props = {}

const ReviewModal = (props: Props) => {
    const {open,type,setClose,data} = useModal()
    const isOpen = open && type==='review-modal'
 
  return (
    <Dialog open={isOpen} onOpenChange={()=>{setClose()}}>
  
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{data.review ? "Edit review" :"Create a new review "}</DialogTitle>
      
       <ReviewForm />
      </DialogHeader>
      <DialogFooter>
  
        
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default ReviewModal