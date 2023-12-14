'use client'

import { useEdgeStore } from "@/lib/edgestore"
import { blogSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Blog } from "@prisma/client"
import { Loader, XIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { uuid as uuidv4 } from 'uuidv4';
import { toast } from "sonner"
import axios from "axios"
import { useRouter } from "next/navigation"

export const useBlog = (blog?:Blog | null)=>{


    const form = useForm<z.infer<typeof blogSchema>>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
          title:blog?.title || "",
          categoryId:blog?.categoryId || "",
          content:blog?.content || "",
          slug:blog?.slug || "",
          featuredImage:blog?.featuredImage || "",
          tags:blog?.tags || [],
          shortDescription:blog?.shortDescription || '',
          author:blog?.author || ''

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
           ;
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

 const ImagePlaceholder = () => {
    
    if(!!form.watch("featuredImage")) return (
      <div className="w-[150px] h-[150px] overflow-hidden  relative">
        {deleteLoader ? (
          <div className="flex items-center justify-center w-full h-full ">
            <Loader className="w-5 h-5 animate-spin" />
          </div>
        ) : (
          <Image
            alt="added logo"
            src={form.getValues("featuredImage")}
            fill
            className="object-cover rounded-lg"
          />
        )}

        <XIcon
          className="absolute top-1 right-1 cursor-pointer text-white bg-rose-400 p-1 rounded-md"
          onClick={() => {
            deleteImage(form.getValues("featuredImage"));
          }}
        />
      </div>
    )
    if(imageLoader) return <div
         
    className="w-[150px] h-[150px] overflow-hidden flex items-center justify-center  relative"
  >  <Loader className="w-5 h-5 animate-spin" /></div>

 
};


const setImage = (url: string) => {
   form.setValue("featuredImage", url);
 };




 const handleTagAdd = (
  tagRef: React.MutableRefObject<HTMLInputElement | null>,

) => {
  if (!tagRef.current?.value.trim()) return;
  const tags = form.getValues("tags");
  form.setValue("tags", [...tags!, tagRef.current.value]);
  tagRef.current.value = "";
};

 const handleDeleteTag = (input: string) => {
  form.setValue("tags", [
    ...form.getValues("tags")!.filter((tag:string) => tag !== input),
  ]);
};

 const Mytags = () => {
  return !form.getValues("tags")!.length ? (
    <p className="p-2 text-gray-500 capitalize">No tags added</p>
  ) : (
    <div className="flex flex-wrap gap-1">
      {form.getValues("tags")!.map((tag) => (
        <div
          className="p-1 px-2 capitalize flex gap-4 border rounded-lg text-s items-center"
          key={uuidv4()}
        >
          <p className="text-xs text-neutral-500">{tag}</p>
          <XIcon
            className="cursor-pointer text-neutral-500 h-4 w-4"
            onClick={() => handleDeleteTag(tag)}
          />
        </div>
      ))}
    </div>
  );
};
     
     const router = useRouter()
    async  function onSubmit(values: z.infer<typeof blogSchema>) {
    try {
         if(blog){
          await axios.patch(`/api/blogs/${blog.id}`,values)
         }else{
          await axios.post(`/api/blogs`,values)
         }

         router.back()
         router.refresh()
         toast.success(blog ? 'Updated successfully' : 'Created successfully')


    } catch (error) {
        console.log(error)
        toast.error('something went wrong')
    }

      }

return {onSubmit,form,file,setFile,uploadImage,ImagePlaceholder,handleTagAdd,Mytags}
}