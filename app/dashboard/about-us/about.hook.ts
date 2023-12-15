import { zodResolver } from "@hookform/resolvers/zod"
import { About } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"



export const useAbout = (about:About | null)=>{


    const aboutSchema = z.object({
        content: z.string().min(2, {
         
        }),
      })


      const form = useForm<z.infer<typeof aboutSchema>>({
        resolver: zodResolver(aboutSchema),
        defaultValues: {
          content: about?.content || ''
        },
      })

      const router = useRouter()

      async function onSubmit(values: z.infer<typeof aboutSchema>) {
 
      try {
         
        if(about){

            await axios.patch('/api/about',values)

        }else{
            await axios.post('/api/about',values)
        }

router.refresh()
toast.success(about ? "Successfully updated" : "Successfully created")
      } catch (error) {
        console.log(error)
        toast.error('Something went wrong')
      }
      }


      return {onSubmit,form}

}
