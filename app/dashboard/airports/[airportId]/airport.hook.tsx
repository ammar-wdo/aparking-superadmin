import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Airport } from "@prisma/client"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useEdgeStore } from "@/lib/edgestore"
import Image from "next/image"
import { Loader, XIcon } from "lucide-react"
import { useImages } from "@/hooks/images-hook"
import { airportSchema } from "@/schemas"






type Props = {
    airport:Airport | null
}


export const useAirport =({airport}:Props)=>{


    const form = useForm<z.infer<typeof airportSchema>>({
        resolver: zodResolver(airportSchema),
        defaultValues: {
          name:airport?.name || "",
          images:airport?.images || [],
          content:airport?.content || '',
          slug:airport?.slug || ''
        },
      })

      useEffect(()=>{
        const slug = form.watch('slug').replace(/ /g, '-');
form.setValue('slug',slug)

      },[form.watch('slug')])

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
      const {imagesFile,setImagesFile,uploadImages,ImagesPlaceholder,deleteImagesLoader,imagesLoader,deleteanImage} = useImages({form})

      return {form ,onSubmit,imagesFile,setImagesFile,uploadImages,ImagesPlaceholder,deleteImagesLoader,imagesLoader,deleteanImage}

}