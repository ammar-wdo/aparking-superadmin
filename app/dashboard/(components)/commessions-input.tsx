'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

type Props = {id:string,commession:number}

const CommessionInput = ({id,commession}: Props) => {

    const [value, setValue] = useState(commession)
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const handleSave = async ()=>{
        try {
            setIsLoading(true)
await axios.post(`/api/option/${id}`,{value})



            router.refresh()
toast.success('Successfully changed')


        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }finally{
            setIsLoading(false)
        }
    }
  return (
    <div className='flex items-center gap-4'>
        <Input value={value || ''} placeholder='%0' type='number' min={0} className='w-fit' max={100} onChange={(e)=>setValue(+e.target.value)} />
        <Button disabled={isLoading} onClick={handleSave}  className=''>{isLoading ? 'Saving..' : 'Save'} {isLoading&& <Loader className='ml-3 h-4 w-4 animate-spin' />}</Button>
    </div>
  )
}

export default CommessionInput