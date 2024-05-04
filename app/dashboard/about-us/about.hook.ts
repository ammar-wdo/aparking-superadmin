import { useImage } from "@/hooks/image-hook"
import { aboutSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { About } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"



export const useAbout = (about:About | null)=>{




      const form = useForm<z.infer<typeof aboutSchema>>({
        resolver: zodResolver(aboutSchema),
        defaultValues: {
          content: about?.content || '',
          blockOneContent: about?.blockOneContent || "",
          blockTwoContent: about?.blockTwoContent || "",
       
          blockTwoImage: about?.blockTwoImage || "",
          faq:about?.faq as unknown as {question:string,answer:string}[] || []
        },
      })



      const { ImagePlaceholder, file, setFile, uploadImage } = useImage(form);
      const {
        ImagePlaceholder: ImagePlaceHolderTwo,
        file: fileTwo,
        setFile: setFileTwo,
        uploadImage: uploadImageTwo,
      } = useImage(form);

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

      const router = useRouter()

      async function onSubmit(values: z.infer<typeof aboutSchema>) {
 
      try {
         
        if(about){

            await axios.patch('/api/about',values)

        }else{
            await axios.post('/api/about',values)
        }

router.refresh()
toast.success(about ? "Successfully updated" : "Successfully created")
      } catch (error) {
        console.log(error)
        toast.error('Something went wrong')
      }
      }


      return {onSubmit,form,
        ImagePlaceHolderTwo,
        fileTwo,
        setFileTwo,
        uploadImageTwo, ansRef,
        queRef,
        addFaq,
        deleteFaq,
        edit,
        setEditFn,
        cancelEdit}

}
