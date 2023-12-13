'use client'

import ToolTip from "@/components/tool-tip"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

type Props = {
    label:'ACTIVE' | 'PENDING',
    id:string
}

const StatusToggleButton = ({label,id}: Props) => {
const [isLoading, setIsloading]=useState(false)

const router = useRouter()
const handleToggle = async()=>{
    try {
        setIsloading(true)
       await axios.post(`/api/review/${id}`)
       toast.success('successfully toggled')
       router.refresh()
    } catch (error) {
        console.log(error)
        toast.error('something went wrong')
    }finally{
        setIsloading(false)
    }
}

  return (
    <ToolTip title="Enable and disable a review" side="top">   <Button disabled={isLoading} onClick={handleToggle}>{label === 'ACTIVE' ? 'Disable' : 'Enable'}{isLoading && <Loader className="ml-3 w-4 h-4 animate-spin" />}</Button></ToolTip>
  )
}

export default StatusToggleButton