import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Airport } from "@prisma/client"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


 
const airportSchema = z.object({
  name: z.string().min(2).max(50),
})



type Props = {
    airport:Airport | null
}


export const useAirport =({airport}:Props)=>{


    const form = useForm<z.infer<typeof airportSchema>>({
        resolver: zodResolver(airportSchema),
        defaultValues: {
          name:airport?.name || "",
        },
      })

      const router = useRouter()

     async function onSubmit(values: z.infer<typeof airportSchema>) {

        try {
console.log('try')
            if(airport){
await axios.patch(`/api/airport/${airport.id}`,values)

toast.success("Successfully Created")
            }else{

                await axios.post(`/api/airport`,values)
                toast.success("Successfully Updated")
            }

            router.back()
            router.refresh()
            
        } catch (error) {
            console.log(error)

            toast.error("Something went wrong")
        }

 
      }


      return {form ,onSubmit}

}