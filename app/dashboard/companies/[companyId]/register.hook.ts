'use client'

import { useParams, useRouter } from "next/navigation";
import axios from 'axios'

import * as z from "zod";
import { Company } from "@prisma/client";


import { registerSchema } from "@/schemas";
import { toast } from "sonner";



export const useRegister = (company:Company|null)=>{


  
  const router = useRouter()
  const params = useParams()

  async function onSubmit(values: z.infer<typeof registerSchema>) {
  try {

    if(company){
    const res =  await axios.patch(`/api/company/${params.companyId}`,values)
    if(res.data.message){
      toast.error(res.data.message)
    }else{
      toast.success(company ? "Company updated" : "Company created")
      router.push(`/dashboard/companies`)
      router.refresh()
    }
    }else{
    const res =  await axios.post('/api/company',values)
    if(res.data.message){
      toast.error(res.data.message)
    }else{
      toast.success(company ? "Company updated" : "Company created")
      router.push(`/dashboard/companies`)
      router.refresh()
    }
    }


    
  } catch (error) {
    console.log(error)
 toast.error('Something went wrong')
  }
  }

  return {onSubmit}

}