"use client"
 
import { Company } from "@prisma/client";
import * as z from "zod"
 



export const registerDefaultValues = (company:Company|null)=>({

email:company?.email || '',
isActive:company?.isActive || false,
  address:company?.address || "",
  name:company?.name || "",
  contact: company?.contact ||  "",
  password: company?.password ||  "",

  phone: company?.phone || "",
  place: company?.place || "",
  zipcode: company?.zipcode || "",
  slug: company?.slug || "",
  vatNO:company?.vatNO || '',
  chamberOfCommerce:company?.chamberOfCommerce || ''
})