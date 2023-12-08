import { useEdgeStore } from "@/lib/edgestore";
import { Loader, XIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { uuid, uuid as uuidv4 } from 'uuidv4';





  
  type Props = {
    form: any;
  };
export const useImages = ({form}:Props)=>{


    console.log(form.getValues('images'))
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
  console.log(res.url)
          setImages(res.url);
        
    
        
        }
      }
    };
  
    const deleteImages = (url: string) => {
      const images = form.getValues("images");
      form.setValue("images", [...images!.filter((image:string) => image !== url)]);
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
            {form.getValues("images")?.map((image:string) => (
              <div
                key={uuid()}
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
              {imagesLoader &&  <div
             
             className="w-[100px] h-[100px] overflow-hidden flex items-center justify-center  relative"
           >  <Loader className="w-5 h-5 animate-spin" /></div>}
          </div>
        )}
        
     </div> );
    };





    return {
        imagesFile,setImagesFile,uploadImages,ImagesPlaceholder
    }
}