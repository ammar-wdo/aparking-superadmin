import { useEdgeStore } from "@/lib/edgestore";
import { Loader, XIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const useImage = (form:any)=>{

       //image logic 
       const [file, setFile] = useState<File>();

       const [deleteLoader, setDeleteLoader] = useState(false);
     
       const [imageLoader, setImageLoader] = useState(false);
       const { edgestore } = useEdgeStore();
     
       const uploadImage = async (type:"blockOneImage" | "blockTwoImage") => {

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
     
             setImage(type,res.url);
           }
         }
       };
     
       const deleteImage = async (type:"blockOneImage" | "blockTwoImage",image: string) => {
         try {
           setDeleteLoader(true);
           await edgestore.publicFiles.delete({
             url: image,
           });
         } catch (error) {
           console.log(error);
         } finally {
           setDeleteLoader(false);
           setImage(type,"");
         }
       };
     
       const setImage = (type:"blockOneImage" | "blockTwoImage",url: string) => {
        console.log('type',type)
         form.setValue(type, url);
       };
     
     
        const ImagePlaceholder = ({type}:{type:"blockOneImage" | "blockTwoImage"}) => {
       
         if (!!form.watch(type))
           return (
             <div className="w-[150px] h-[150px] overflow-hidden  relative">
               {deleteLoader ? (
                 <div className="flex items-center justify-center w-full h-full ">
                   <Loader className="w-5 h-5 animate-spin" />
                 </div>
               ) : (
                 <Image
                   alt="added logo"
                   src={form.getValues(type)}
                   fill
                   className="object-contain rounded-lg"
                 />
               )}
     
               <XIcon
                 className="absolute top-1 right-1 cursor-pointer text-white bg-rose-400 p-1 rounded-md"
                 onClick={() => {
                   deleteImage(type,form.getValues(type));
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

       return {ImagePlaceholder,uploadImage,file,setFile}
}