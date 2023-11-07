"use client"
 
import { Company } from "@prisma/client";
import * as z from "zod"
 
export const registerSchema = z.object({
   email:z.string().email(),
   isActive:z.boolean(),
  address: z.string().min(2).max(50),
  contact:z.string().min(2).max(50),
  invoiceEmail:z.string().email(),
  phone: z.string().refine((value) => {
    const phoneRegex =/^(?:[0-9]){1,3}(?:[ -]*[0-9]){6,14}$/;
    return phoneRegex.test(value);
  }, "Invalid phone number"),
  place:z.string().min(2).max(50),
  zipcode:z.string().min(1),


  
})


export const registerDefaultValues = (company:Company|null)=>({

email:company?.email || '',
isActive:company?.isActive || false,
  address:company?.address || "",
  contact: company?.contact ||  "",
  invoiceEmail: company?.invoiceEmail|| "",
  phone: company?.phone || "",
  place: company?.place || "",
  zipcode: company?.zipcode || "",
})