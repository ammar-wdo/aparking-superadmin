'use client'

import { useForm } from "react-hook-form"
import { useModal } from "@/hooks/modal-hook"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useFormField } from "@/components/ui/form"
import { useEffect } from "react"
import axios from "axios"
import { toast } from "sonner"


const categorySchema = z.object({
    label: z.string().min(2, {
      message: "label must be at least 2 characters.",
    }),
  })

export const useFaqCat = ()=>{

    const {setClose,data} = useModal()
const router = useRouter()


  
const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
     label:data.categoryFaq?.label || ''
     
    },
  })

  

  
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof categorySchema>) {

        try {

            if(data.category){
                await axios.patch(`/api/faq-category/${data.category.id}`,values)
            }else {
                await axios.post('/api/faq-category',values)
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