import { useEdgeStore } from "@/lib/edgestore"
import { entitySchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Entity } from "@prisma/client"
import axios from "axios"
import { Loader, XIcon } from "lucide-react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
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
          content:entity?.content || ''


        },
      })



      const { edgestore } = useEdgeStore();

      const setImages = (url: string) => {
        const images = form.getValues("images");
        form.setValue("images", [...images!, url]);
      };
    
      const [imagesFile, setImagesFile] = useState<File>();
      const [imagesLoader, setImagesLoader] = useState(false);
      const [deleteImagesLoader, setDeleteImagesLoader] = useState("");
      const uploadImages = async () => {
       
        if (imagesFile) {
          if (imagesFile) {
            const res = await edgestore.publicFiles.upload({
              file: imagesFile,
              onProgressChange: (progress) => {
                if (progress === 0) {
                  setImagesLoader(true);
                } else {
                  setImagesLoader(false);
                }
                ;
              },
            });
    
            setImages(res.url);
          }
        }
      };
    
      const deleteImages = (url: string) => {
        const images = form.getValues("images");
        form.setValue("images", [...images!.filter((image) => image !== url)]);
      };
    
    
      const deleteanImage = async (image: string) => {
        try {
          setDeleteImagesLoader(image);
          await edgestore.publicFiles.delete({
            url: image,
          });
    
         
        } catch (error) {
          console.log(error);
        } finally {
          setDeleteImagesLoader("");
          deleteImages(image);
        }
      };
    
      const ImagesPlaceholder = () => {
        return (
          <div className="flex items-center gap-3 w-full ">
          {!!form.watch("images")?.length && (
            <div className="flex items-center gap-3 flex-wrap w-full">
              {form.getValues("images")?.map((image) => (
                <div
                  key={image}
                  className="w-[100px] h-[100px] overflow-hidden  relative"
                >
                  {deleteImagesLoader === image ? (
                    <div className="flex items-center justify-center w-full h-full ">
                      <Loader className="w-5 h-5 animate-spin" />
                    </div>
                  ) : (
                    <Image
                      alt="added logo"
                      src={image}
                      fill
                      className="object-cover rounded-lg"
                    />
                  )}
    
                  <XIcon
                    className="absolute top-1 right-1 cursor-pointer text-white bg-rose-400 p-1 rounded-md"
                    onClick={() => {
                      deleteanImage(image);
                    }}
                  />
                
                </div>
              ))}
             
            </div>
          )}
             {imagesLoader &&  <div
               
               className="w-[150px] h-[150px] overflow-hidden flex items-center justify-center  relative"
             >  <Loader className="w-5 h-5 animate-spin" /></div>}
       </div> );
      };

      const router = useRouter()
      const params = useParams()
          async  function onSubmit(values: z.infer<typeof entitySchema>) {
      
      
      try {

        if(entity){
          const result = await axios.patch(`/api/entities/${entity.id}`,values)
        }else{
          const result = await axios.post(`/api/entities`,values)
        }
      
        toast.success("Successfully created")
        router.push(`/dashboard/entities`)
        router.refresh()
      } catch (error) {
        console.log(error)
        toast.error('Something went wrong')
      }
      
      
            
            }


      return {form,onSubmit,imagesFile,setImagesFile,uploadImages,ImagesPlaceholder}

}