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
type Props = {}

const DeleteModal = (props: Props) => {
    const {open,type,setClose,data} = useModal()
    const isOpen = open && type==='delete-modal'
    const [isLoading, setIsLoading] = useState(false)

const router = useRouter()
const  handleDelete = async()=>{
    try {
        console.log(data.url)
        setIsLoading(true)
await axios.delete(data?.url as string)

router.back()
setClose()
router.refresh()
toast.success("Successfuly deleted")
     
    } catch (error) {
     toast.error("Something went wrong")
        console.log(error)
    }finally{
        setIsLoading(false)
    }
}

  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
  
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete the element and remove  data from our servers.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button onClick={setClose} variant={'ghost'}>Cancel</Button>
        <Button disabled={isLoading} onClick={handleDelete} variant={'destructive'}>Delete {isLoading && <Loader className="animate-spin ml-3 w-3 h-3" />}</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default DeleteModal