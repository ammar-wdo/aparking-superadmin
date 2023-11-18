import { serviceSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Service } from "@prisma/client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEdgeStore } from '../../../../../../lib/edgestore';
import { useState } from "react"
import Image from "next/image"
import { Loader, XIcon } from "lucide-react"
import { uuid as uuidv4 } from 'uuidv4';

type Props = {
    service:Service
}
export const useServiceId = ({service}:Props)=>{


    const form = useForm<z.infer<typeof serviceSchema>>({
        resolver: zodResolver(serviceSchema),
        defaultValues: {
          timeToAirport:service.timeToAirport || "",
          distanceToAirport:service.distanceToAirport || "",
          generalInformation:service.generalInformation || "",
          importantInfo:service.importantInfo || "",
          logo:service.logo || "",
          images:service.images || [],
          facilities:service.facilities || [],
          highlights:service.highlights || [],
          isActive:service.isActive || false
        },
      })


      function onSubmit(values: z.infer<typeof serviceSchema>) {

        console.log(values)
      }

 const [file, setFile] = useState<File>();
  const [imagesFile, setImagesFile] = useState<File>();
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [deleteImagesLoader, setDeleteImagesLoader] = useState("");
  const [imageLoader, setImageLoader] = useState(false);
  const [imagesLoader, setImagesLoader] = useState(false);

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


 const setImage = (url: string) => {
    form.setValue("logo", url);
  };

  //set the images functions
  const setImages = (url: string) => {
    const images = form.getValues("images");
    form.setValue("images", [...images!, url]);
  };

  const deleteImages = (url: string) => {
    const images = form.getValues("images");
    form.setValue("images", [...images!.filter((image) => image !== url)]);
  };

  const ImagePlaceholder = () => {
    
      if(!!form.watch("logo")) return (
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
              className="object-cover rounded-lg"
            />
          )}

          <XIcon
            className="absolute top-1 right-1 cursor-pointer text-white bg-rose-400 p-1 rounded-md"
            onClick={() => {
              deleteImage(form.getValues("logo"));
            }}
          />
        </div>
      )
      if(imageLoader) return <div
           
      className="w-[150px] h-[150px] overflow-hidden flex items-center justify-center  relative"
    >  <Loader className="w-5 h-5 animate-spin" /></div>

   
  };
  const ImagesPlaceholder = () => {
    return (
      <div className="flex items-center gap-3">
      {!!form.watch("images")?.length && (
        <div className="flex items-center gap-3">
          {form.getValues("images")?.map((image) => (
            <div
              key={image}
              className="w-[150px] h-[150px] overflow-hidden  relative"
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

  

   const handleFacilityAdd = (
  facilityRef: React.MutableRefObject<HTMLInputElement | null>,

) => {
  if (!facilityRef.current?.value.trim()) return;
  const facilities = form.getValues("facilities");
  form.setValue("facilities", [...facilities!, facilityRef.current.value]);
  facilityRef.current.value = "";
};

 const handleDeleteFacility = (input: string) => {
  form.setValue("facilities", [
    ...form.getValues("facilities")!.filter((facility:string) => facility !== input),
  ]);
};

 const MyFacilities = () => {
  return !form.getValues("facilities")!.length ? (
    <p className="p-2 text-gray-500 capitalize">No facilities added</p>
  ) : (
    <div className="flex flex-wrap gap-4">
      {form.getValues("facilities")!.map((facility) => (
        <div
          className="p-2 capitalize flex gap-4 border rounded-sm text-s"
          key={uuidv4()}
        >
          {facility}
          <XIcon
            className="cursor-pointer"
            onClick={() => handleDeleteFacility(facility)}
          />
        </div>
      ))}
    </div>
  );
};
   const handleHighlightAdd = (
  facilityRef: React.MutableRefObject<HTMLInputElement | null>,

) => {
  if (!facilityRef.current?.value.trim()) return;
  const highlights = form.getValues("highlights");
  form.setValue("highlights", [...highlights!, facilityRef.current.value]);
  facilityRef.current.value = "";
};

 const handleDeleteHighlight = (input: string) => {
  form.setValue("highlights", [
    ...form.getValues("highlights")!.filter((facility:string) => facility !== input),
  ]);
};

 const MyHighlights = () => {
  return !form.getValues("highlights")!.length ? (
    <p className="p-2 text-gray-500 capitalize">No highlights added</p>
  ) : (
    <div className="flex flex-wrap gap-4">
      {form.getValues("highlights")!.map((highlight) => (
        <div
          className="p-2 capitalize flex gap-4 border rounded-sm text-s"
          key={uuidv4()}
        >
          {highlight}
          <XIcon
            className="cursor-pointer"
            onClick={() => handleDeleteHighlight(highlight)}
          />
        </div>
      ))}
    </div>
  );
};




      return {form,onSubmit,uploadImage,uploadImages,ImagePlaceholder,ImagesPlaceholder,setFile,setImagesFile,handleFacilityAdd,MyFacilities,file,imagesFile,handleHighlightAdd,MyHighlights,}
}