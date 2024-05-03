import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Airport } from "@prisma/client";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import Image from "next/image";
import { Loader, XIcon } from "lucide-react";
import { useImages } from "@/hooks/images-hook";
import { airportSchema } from "@/schemas";
import { useImage } from "@/hooks/image-hook";

type Props = {
  airport: Airport | null;
};

export const useAirport = ({ airport }: Props) => {
  const form = useForm<z.infer<typeof airportSchema>>({
    resolver: zodResolver(airportSchema),
    defaultValues: {
      name: airport?.name || "",
      images: airport?.images || [],
      content: airport?.content || "",
      slug: airport?.slug || "",
      blockOneContent: airport?.blockOneContent || "",
      blockTwoContent: airport?.blockTwoContent || "",
      blockOneImage: airport?.blockOneImage || "",
      blockTwoImage: airport?.blockTwoImage || "",
      faq:
        (airport?.faq as unknown as { question: string; answer: string }[]) ||
        [],
    },
  });

  const ansRef = useRef<HTMLTextAreaElement | null>(null);
  const queRef = useRef<HTMLInputElement | null>(null);

  const [edit, setEdit] = useState<
    { question: string; answer: string; index: number } | undefined
  >(undefined);

  const setEditFn = (question: string, answer: string, index: number) => {
    if (!queRef.current || !ansRef.current) return null;
    setEdit({ question, answer, index });

    queRef.current.value = question;
    ansRef.current.value = answer;
    queRef.current?.focus();
  };

  const cancelEdit = ()=>{
    if (!queRef.current || !ansRef.current) return null;

    setEdit(undefined)
    ansRef.current.value = "";
    queRef.current.value = "";
  }

  const addFaq = () => {
    if (!queRef.current || !ansRef.current) return null;

    if (!queRef.current.value || !ansRef.current.value) return;

    if (edit) {
      const faqs = form.getValues("faq");
      const element = faqs[edit.index];
      element.question = queRef.current.value;
      element.answer = ansRef.current.value;
      
     faqs[edit.index] = element
      form.setValue("faq", faqs);
      setEdit(undefined);
    
    } else {
      const faqs = form.getValues("faq");
      form.setValue("faq", [
        ...faqs,
        { question: queRef.current.value, answer: ansRef.current.value },
      ]);
    }

    ansRef.current.value = "";
    queRef.current.value = "";
  };

  const deleteFaq = (index: number) => {
    if (!queRef.current || !ansRef.current) return null;
    setEdit(undefined);
    ansRef.current.value = "";
    queRef.current.value = "";
    const faqs = form.getValues("faq");
    form.setValue(
      "faq",
      faqs.filter((el, i) => i !== index)
    );
  };

  useEffect(() => {
    const slug = form.watch("slug").replace(/ /g, "-");
    form.setValue("slug", slug);
  }, [form.watch("slug")]);

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof airportSchema>) {
    try {
      console.log("try");
      if (airport) {
        const res = await axios.patch(`/api/airport/${airport.id}`, values);
        if (res.data.message) {
          toast.error(res.data.message);
        } else {
          router.back();
          router.refresh();
          toast.success("Successfully Created");
        }
      } else {
        const res = await axios.post(`/api/airport`, values);
        if (res.data.message) {
          toast.error(res.data.message);
        } else {
          router.back();
          router.refresh();
          toast.success("Successfully Updated");
        }
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    }
  }

  const { ImagePlaceholder, file, setFile, uploadImage } = useImage(form);
  const {
    ImagePlaceholder: ImagePlaceHolderTwo,
    file: fileTwo,
    setFile: setFileTwo,
    uploadImage: uploadImageTwo,
  } = useImage(form);

  const {
    imagesFile,
    setImagesFile,
    uploadImages,
    ImagesPlaceholder,
    deleteImagesLoader,
    imagesLoader,
    deleteanImage,
  } = useImages({ form });

  return {
    form,
    onSubmit,
    imagesFile,
    setImagesFile,
    uploadImages,
    ImagesPlaceholder,
    deleteImagesLoader,
    imagesLoader,
    deleteanImage,
    ImagePlaceholder,
    uploadImage,
    file,
    setFile,
    ImagePlaceHolderTwo,
    fileTwo,
    setFileTwo,
    uploadImageTwo,
    ansRef,
    queRef,
    addFaq,
    deleteFaq,
    edit,
    setEditFn,
    cancelEdit
  };
};
