import { zodResolver } from "@hookform/resolvers/zod"
import { About, Term } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"



export const useTerm = (term:Term | null)=>{


    const aboutSchema = z.object({
        content: z.string().min(2, {
         
        }),
      })


      const form = useForm<z.infer<typeof aboutSchema>>({
        resolver: zodResolver(aboutSchema),
        defaultValues: {
          content: term?.content || ''
        },
      })

      const router = useRouter()

      async function onSubmit(values: z.infer<typeof aboutSchema>) {
 
      try {
         
        if(term){

            await axios.patch('/api/term',values)

        }else{
            await axios.post('/api/term',values)
        }

router.refresh()
toast.success(term ? "Successfully updated" : "Successfully created")
      } catch (error) {
        console.log(error)
        toast.error('Something went wrong')
      }
      }


      return {onSubmit,form}

}
