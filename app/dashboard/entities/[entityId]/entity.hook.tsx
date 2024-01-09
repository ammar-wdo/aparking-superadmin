import { useImages } from "@/hooks/images-hook"
import { useEdgeStore } from "@/lib/edgestore"
import { entitySchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Entity } from "@prisma/client"
import axios from "axios"
import { Loader, XIcon } from "lucide-react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { UseFormReturn, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

type Props = {
    entity:Entity | null
}
export const useEntity =({entity}:Props)=>{


    const form = useForm<z.infer<typeof entitySchema>>({
        resolver: zodResolver(entitySchema),
        defaultValues: {
            airportId:entity?.airportId || "",
            companyId:entity?.companyId || "",
          email:entity?.email || "" ,
          password:entity?.password || "",
          entityName:entity?.entityName || "",
          entityAddress:entity?.entityAddress || "",
          entityZipcode:entity?.entityZipcode || "",
          entityPlace:entity?.entityPlace || "",
          phone:entity?.phone || "",
          invoiceAddress:entity?.invoiceAddress || "",
          companyName:entity?.companyName || "",
          contactPerson:entity?.contactPerson || "",
          invoiceEmail:entity?.invoiceEmail || "",
          invoiceZipcode:entity?.invoiceZipcode || "",
          invoicePlace:entity?.invoicePlace || "",
          invoiceCountry:entity?.invoiceCountry || "",
          vatNO:entity?.vatNO || "",
          IBAN:entity?.IBAN || "",
          chamberOfCommerce:entity?.chamberOfCommerce || "",
          isActive:entity?.isActive || false,
          images:entity?.images || [],
          content:entity?.content || '',
          slug:entity?.slug || ''


        },
      })



      
      useEffect(()=>{
        const slug = form.watch('slug').replace(/ /g, '-');
form.setValue('slug',slug)

      },[form.watch('slug')])
      const router = useRouter()
      const params = useParams()
          async  function onSubmit(values: z.infer<typeof entitySchema>) {
      
      
      try {

        if(entity){
          const result = await axios.patch(`/api/entities/${entity.id}`,values)
          if(result.data.message){
toast.error(result.data.message)
          }else{
            toast.success("Successfully created")
            router.push(`/dashboard/entities`)
            router.refresh()
          }
        }else{
          const result = await axios.post(`/api/entities`,values)
          if(result.data.message){
            toast.error(result.data.message)

          }else{
            toast.success("Successfully created")
            router.push(`/dashboard/entities`)
            router.refresh()
          }
        }
      
      
      } catch (error) {
        console.log(error)
        toast.error('Something went wrong')
      }
      
      
            
            }


            const {imagesFile,setImagesFile,uploadImages,ImagesPlaceholder} = useImages({form})


      return {form,onSubmit,imagesFile,setImagesFile,uploadImages,ImagesPlaceholder}

}