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
          logo: entity?.logo || "",
          content:entity?.content || '',
          slug:entity?.slug || '',
          seoTitle:entity?.seoTitle ??  "",
          seoDescription:entity?.seoDescription ?? ""


        },
      })

      const [file, setFile] = useState<File>();

  const [deleteLoader, setDeleteLoader] = useState(false);

  const [imageLoader, setImageLoader] = useState(false);
  const { edgestore } = useEdgeStore();

  const uploadImage = async () => {
    if (file) {
      setImageLoader(true);
      if (file) {
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            if (progress === 0) {
              setImageLoader(true);
            } else {
              setImageLoader(false);
            }
          },
        });
        setImageLoader(false);

        setImage(res.url);
      }
    }
  };

  const deleteImage = async (image: string) => {
    try {
      setDeleteLoader(true);
      await edgestore.publicFiles.delete({
        url: image,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoader(false);
      setImage("");
    }
  };

  const setImage = (url: string) => {
    form.setValue("logo", url);
  };


  const ImagePlaceholder = () => {
    if (!!form.watch("logo"))
      return (
        <div className="w-[150px] h-[150px] overflow-hidden  relative">
          {deleteLoader ? (
            <div className="flex items-center justify-center w-full h-full ">
              <Loader className="w-5 h-5 animate-spin" />
            </div>
          ) : (
            <Image
              alt="added logo"
              src={form.getValues("logo")}
              fill
              className="object-contain rounded-lg"
            />
          )}

          <XIcon
            className="absolute top-1 right-1 cursor-pointer text-white bg-rose-400 p-1 rounded-md"
            onClick={() => {
              deleteImage(form.getValues("logo"));
            }}
          />
        </div>
      );
    if (imageLoader)
      return (
        <div className="w-[150px] h-[150px] overflow-hidden flex items-center justify-center  relative">
          {" "}
          <Loader className="w-5 h-5 animate-spin" />
        </div>
      );
  };



      
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
            toast.success(entity ? "Successfully Updated" :"Successfully created")
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


      return {form,onSubmit,imagesFile,setImagesFile,uploadImages,ImagesPlaceholder,file,setFile,uploadImage,ImagePlaceholder}

}