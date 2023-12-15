import { zodResolver } from "@hookform/resolvers/zod"
import { About, Privacy, Term } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"



export const usePrivacy = (privacy:Privacy | null)=>{


    const aboutSchema = z.object({
        content: z.string().min(2, {
         
        }),
      })


      const form = useForm<z.infer<typeof aboutSchema>>({
        resolver: zodResolver(aboutSchema),
        defaultValues: {
          content: privacy?.content || ''
        },
      })

      const router = useRouter()

      async function onSubmit(values: z.infer<typeof aboutSchema>) {
 
      try {
         
        if(privacy){

            await axios.patch('/api/privacy',values)

        }else{
            await axios.post('/api/privacy',values)
        }

router.refresh()
toast.success(privacy ? "Successfully updated" : "Successfully created")
      } catch (error) {
        console.log(error)
        toast.error('Something went wrong')
      }
      }


      return {onSubmit,form}

}
