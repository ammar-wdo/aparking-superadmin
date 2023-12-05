import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Airport } from "@prisma/client"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useEdgeStore } from "@/lib/edgestore"
import Image from "next/image"
import { Loader, XIcon } from "lucide-react"


 
const airportSchema = z.object({
  name: z.string().min(2).max(50),
  images:z.array(z.string()).default([]),
  content:z.string().default('')
})



type Props = {
    airport:Airport | null
}


export const useAirport =({airport}:Props)=>{
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


    const form = useForm<z.infer<typeof airportSchema>>({
        resolver: zodResolver(airportSchema),
        defaultValues: {
          name:airport?.name || "",
          images:airport?.images || [],
          content:airport?.content || ''
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


      return {form ,onSubmit,imagesFile,setImagesFile,uploadImages,ImagesPlaceholder}

}