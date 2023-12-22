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
      await axios.patch(`/api/company/${params.companyId}`,values)
    }else{
      await axios.post('/api/company',values)
    }

toast.success(company ? "Company updated" : "Company created")
router.push(`/dashboard/companies`)
router.refresh()
    
  } catch (error) {
    console.log(error)
 toast.error('Something went wrong')
  }
  }

  return {onSubmit}

}