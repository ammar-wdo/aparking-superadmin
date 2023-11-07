'use client'

import { useParams, useRouter } from "next/navigation";
import axios from 'axios'

import * as z from "zod";
import { Company } from "@prisma/client";
import { registerSchema } from "./register-schema";
import { useToast } from "@/components/ui/use-toast";



export const useRegister = (company:Company|null)=>{


    const { toast } = useToast()
  const router = useRouter()
  const params = useParams()

  async function onSubmit(values: z.infer<typeof registerSchema>) {
  try {

    if(company){
      await axios.patch(`/api/company/${params.companyId}`,values)
    }else{
      await axios.post('/api/company',values)
    }

toast({
    title: "Success",
    description: "company is created",
  })
router.push(`/dashboard`)
router.refresh()
    
  } catch (error) {
    console.log(error)
    toast({
        title:'Error',
        description:'Something went wrong',
        variant:'destructive'
    })
  }
  }

  return {onSubmit}

}