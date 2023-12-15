import { serviceSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Key, ParkingLocation, ParkingType, Service } from "@prisma/client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEdgeStore } from '../../../../lib/edgestore';
import { useEffect, useState } from "react"
import Image from "next/image"

import { uuid as uuidv4 } from 'uuidv4';
import axios from "axios"
import { toast } from "sonner"
import { useParams, useRouter } from "next/navigation"
import { useImages } from "@/hooks/images-hook"
import { Banknote, BatteryChargingIcon, Bus, Car, CheckCircle, CreditCard, Info, KeyIcon, Loader, ParkingCircle, Star, Warehouse,XIcon } from 'lucide-react'

type Props = {
  service:Service & {entity:{companyId:string}}
}

const theIcons :{[key:string]:React.ReactNode} = {
  car:<Car  className="text-neutral-500 h-5 w-5"/>,
  bus:<Bus  className="text-neutral-500 h-5 w-5"/>,
  key:<KeyIcon  className="text-neutral-500 h-5 w-5"/>,
  info:<Info  className="text-neutral-500 h-5 w-5"/>,
  check:<CheckCircle  className="text-neutral-500 h-5 w-5"/>,
  star:<Star  className="text-neutral-500 h-5 w-5"/>,
  electric:<BatteryChargingIcon  className="text-neutral-500 h-5 w-5"/>,
  payment:<CreditCard  className="text-neutral-500 h-5 w-5"/>,
  cash:<Banknote className="text-neutral-500 h-5 w-5" />,
  parking:<ParkingCircle  className="text-neutral-500 h-5 w-5"/>,
  indoor:<Warehouse  className="text-neutral-500 h-5 w-5"/>,
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
          highlights:service.highlights
          ? service.highlights
              .filter((el): el is { label?: string; icon?: string } => typeof el === "object" && el !== null)
              .map((el) => ({ label: el.label, icon: el.icon }))
          : [],
          isActive:service.isActive || false,
          name: service?.name || "",
          terms: service?.name || "",
          bookingsEmail: service?.bookingsEmail || "",
          parkingAddress: service?.parkingAddress || "",
          parkingZipcode: service?.parkingZipcode || "",
          parkingCountry: service?.parkingCountry || "",
          parkingPlace: service?.parkingPlace || "",
          arrivalTodos: service?.arrivalTodos || "",
          departureTodos: service?.departureTodos || "",
          keyStatus:service?.keyStatus || Key.BOTH,
  parkingLocation:service?.parkingLocation || ParkingLocation.BOTH,
  parkingType: service?.parkingType || ParkingType.shuttle,
  electricCharging:service.electricCharging || false,
        
          spots: service?.spots || 1,
          available: service?.available || false,
       
          entityId:service?.entityId || ''
        },
      })


      useEffect(()=>{
   
        form.setValue('entityId',service.entity.companyId!)
        console.log(form.getValues('entityId'))
      }
    ,[])
 

const router = useRouter()
const params = useParams()
    async  function onSubmit(values: z.infer<typeof serviceSchema>) {


try {
  console.log(values.entityId)
  const result = await axios.patch(`/api/services/${service.id}`,values)
  toast.success("Successfully updated")
  router.back()
  router.refresh()
} catch (error) {
  console.log(error)
  toast.error('Something went wrong')
}


      
      }

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
    <div className="flex flex-wrap gap-1">
      {form.getValues("facilities")!.map((facility) => (
        <div
          className="p-1 px-2 capitalize flex gap-4 border rounded-lg text-s items-center"
          key={uuidv4()}
        >
          <p className="text-xs text-neutral-500">{facility}</p>
          <XIcon
            className="cursor-pointer text-neutral-500 h-4 w-4"
            onClick={() => handleDeleteFacility(facility)}
          />
        </div>
      ))}
    </div>
  );
};
   const handleHighlightAdd = (
  highlightRef: React.MutableRefObject<HTMLInputElement | null>,
  hihlightIconRef:string

) => {
  if (!highlightRef.current?.value.trim()) return;
  const highlights = form.getValues("highlights");
  form.setValue("highlights", [...highlights!, {label:highlightRef.current.value,icon:hihlightIconRef}]);
  highlightRef.current.value = "";
};

 const handleDeleteHighlight = (input: string) => {
  form.setValue("highlights", [
    ...form.getValues("highlights")!.filter((facility:{label:string,icon:React.ReactNode}) => facility.label !== input),
  ]);
};

 const MyHighlights = () => {
  return !form.getValues("highlights")!.length ? (
    <p className="p-2 text-gray-500 capitalize">No highlights added</p>
  ) : (
    <div className="flex flex-wrap gap-1">
      {form.getValues("highlights")!.map((highlight) => (
        <div
          className="p-1 capitalize flex gap-2 border rounded-lg text-s items-center"
          key={uuidv4()}
        >
         <span>{theIcons[highlight.icon]}</span> 
         <span className="text-xs text-neutral-500">{highlight.label} </span> 
          <XIcon
            className="cursor-pointer text-neutral-500 h-4 w-4"
            onClick={() => handleDeleteHighlight(highlight.label)}
          />
        </div>
      ))}
    </div>
  );
};


const {imagesFile,setImagesFile,uploadImages,ImagesPlaceholder} = useImages({form})

      return {form,onSubmit,uploadImage,uploadImages,ImagePlaceholder,ImagesPlaceholder,setFile,setImagesFile,handleFacilityAdd,MyFacilities,file,imagesFile,handleHighlightAdd,MyHighlights,}
}