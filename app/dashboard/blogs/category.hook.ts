'use client'


import { useModal } from "@/hooks/modal-hook"
import { zodResolver } from "@hookform/resolvers/zod"
import { Category } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

const categorySchema = z.object({
    label: z.string().min(2, {
      message: "label must be at least 2 characters.",
    }),
  })

 

export const useCategory = ()=>{

const {setClose,data} = useModal()
const router = useRouter()


    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
         label:data.category?.label || ''
         
        },
      })

      useEffect(()=>{ console.log(form.watch('label'))},[])

  
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof categorySchema>) {

        try {

            if(data.category){
                await axios.patch(`/api/category/${data.category.id}`,values)
            }else {
                await axios.post('/api/category',values)
            }
            
          
            toast.success('Category created successfully')
            setClose()
            router.refresh()
            form.reset()


        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
       
        console.log(values)
      }



      return {onSubmit, form}


}