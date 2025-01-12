import { serviceSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Key, ParkingLocation, ParkingType, Service } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEdgeStore } from "../../../../lib/edgestore";
import { useEffect, useState } from "react";
import Image from "next/image";

import { uuid as uuidv4 } from "uuidv4";
import axios from "axios";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { useImages } from "@/hooks/images-hook";
import {
  Banknote,
  BatteryChargingIcon,
  Bus,
  Car,
  CheckCircle,
  CreditCard,
  Info,
  KeyIcon,
  Loader,
  ParkingCircle,
  Star,
  Warehouse,
  XIcon,
} from "lucide-react";

type Props = {
  service: Service & { entity: { companyId: string } };
};

const theIcons: { [key: string]: React.ReactNode } = {
  car: <Car className="text-neutral-500 h-5 w-5" />,
  bus: <Bus className="text-neutral-500 h-5 w-5" />,
  key: <KeyIcon className="text-neutral-500 h-5 w-5" />,
  info: <Info className="text-neutral-500 h-5 w-5" />,
  check: <CheckCircle className="text-neutral-500 h-5 w-5" />,
  star: <Star className="text-neutral-500 h-5 w-5" />,
  electric: <BatteryChargingIcon className="text-neutral-500 h-5 w-5" />,
  payment: <CreditCard className="text-neutral-500 h-5 w-5" />,
  cash: <Banknote className="text-neutral-500 h-5 w-5" />,
  parking: <ParkingCircle className="text-neutral-500 h-5 w-5" />,
  indoor: <Warehouse className="text-neutral-500 h-5 w-5" />,
};
export const useServiceId = ({ service }: Props) => {
  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      timeToAirport: service.timeToAirport || undefined,
      distanceToAirport: service.distanceToAirport || undefined,
      generalInformation: service.generalInformation || "",
      importantInfo: service.importantInfo || "",
   
      images: service.images || [],
      facilities: service.facilities || [],
      highlights: service.highlights
        ? service.highlights
            .filter(
              (el): el is { label?: string; icon?: string } =>
                typeof el === "object" && el !== null
            )
            .map((el) => ({ label: el.label, icon: el.icon }))
        : [],
      isActive: service.isActive || false,
      name: service?.name || "",
      terms: service?.terms || "",
      bookingsEmail: service?.bookingsEmail || "",
      parkingAddress: service?.parkingAddress || "",
      parkingZipcode: service?.parkingZipcode || "",
      parkingCountry: service?.parkingCountry || "",
      commession: service.commession,
      parkingPlace: service?.parkingPlace || "",
      arrivalTodos: service?.arrivalTodos || "",
      departureTodos: service?.departureTodos || "",
      keyStatus: service?.keyStatus || Key.LEAVE,
      parkingLocation: service?.parkingLocation || ParkingLocation.INDOOR,
      parkingType: service?.parkingType || ParkingType.shuttle,
      electricCharging: service.electricCharging || false,

      slug: service.slug || "",

      spots: service?.spots || 1,
      available: service?.available || false,

      entityId: service?.entityId || "",
      isParkingproService:service?.isParkingproService,
      parkingproId:service.parkingproId || '',
      parkingproCompanyId:service.parkingproCompanyId || '',
      seoTitle:service.seoTitle ?? "",
      seoDescription:service.seoDescription ?? ""
    },
  });

  //   useEffect(()=>{

  //     form.setValue('entityId',service.entity.companyId!)
  //     console.log(form.getValues('entityId'))
  //   }
  // ,[])

  useEffect(()=>{
    const slug = form.watch('slug').replace(/ /g, '-');
form.setValue('slug',slug)

  },[form.watch('slug')])

  const router = useRouter();
  const params = useParams();
  async function onSubmit(values: z.infer<typeof serviceSchema>) {
    try {
      console.log(values.entityId);
      const result = await axios.patch(`/api/services/${service.id}`, values);
      if(result.data.message){
toast.error(result.data.message)
      }else{
        toast.success("Successfully updated");
        router.back();
        router.refresh();
      }
      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }



 





  //set the images functions
  const setImages = (url: string) => {
    const images = form.getValues("images");
    form.setValue("images", [...images!, url]);
  };

  const deleteImages = (url: string) => {
    const images = form.getValues("images");
    form.setValue("images", [...images!.filter((image) => image !== url)]);
  };



  const handleFacilityAdd = (
    facilityRef: React.MutableRefObject<HTMLInputElement | null>
  ) => {
    if (!facilityRef.current?.value.trim()) return;
    const facilities = form.getValues("facilities");
    form.setValue("facilities", [...facilities!, facilityRef.current.value]);
    facilityRef.current.value = "";
  };

  const handleDeleteFacility = (input: string) => {
    form.setValue("facilities", [
      ...form
        .getValues("facilities")!
        .filter((facility: string) => facility !== input),
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
    hihlightIconRef: string
  ) => {
    if (!highlightRef.current?.value.trim()) return;
    const highlights = form.getValues("highlights");
    form.setValue("highlights", [
      ...highlights!,
      { label: highlightRef.current.value, icon: hihlightIconRef },
    ]);
    highlightRef.current.value = "";
  };

  const handleDeleteHighlight = (input: string) => {
    form.setValue("highlights", [
      ...form
        .getValues("highlights")!
        .filter(
          (facility: { label: string; icon: React.ReactNode }) =>
            facility.label !== input
        ),
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

  const { imagesFile, setImagesFile, uploadImages, ImagesPlaceholder } =
    useImages({ form });

  return {
    form,
    onSubmit,
   
    uploadImages,
   
    ImagesPlaceholder,
   
    setImagesFile,
    handleFacilityAdd,
    MyFacilities,
   
    imagesFile,
    handleHighlightAdd,
    MyHighlights,
  };
};
