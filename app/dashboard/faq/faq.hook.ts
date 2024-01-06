import { useModal } from "@/hooks/modal-hook"
import { faqSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { FAQ } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"






  

export const useFaq = ()=>{


    const {data:{faq},setClose} = useModal()


const router = useRouter()

    const form = useForm<z.infer<typeof faqSchema>>({
        resolver: zodResolver(faqSchema),
        defaultValues: {
          question:faq?.question || '',
          answer:faq?.answer || '',
          categoryFaqId:faq?.categoryFaqId || ""
        },
      })
     
     
     async function onSubmit(values: z.infer<typeof faqSchema>) {
      try {
        if(faq){
await axios.patch(`/api/faq/${faq.id}`,values)
        }else{
            await axios.post(`/api/faq`,values)
        }
        setClose()
        router.refresh()
        form.reset()
toast.success(faq ? "Successfully updated" : "Successfully created")
        
      } catch (error) {
        console.log(error)
        toast.error("Something went wrong")
      }
       
      }

      return {onSubmit,form}

}