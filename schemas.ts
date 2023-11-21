import * as z from "zod"
 
export const serviceSchema = z.object({
    timeToAirport: z.string().min(2),
    distanceToAirport:z.string().min(1),
    generalInformation:z.string().optional(),
    importantInfo:z.string().optional(),
    logo:z.string().min(1),
    images:z.array(z.string()).optional(),
    facilities:z.array(z.string()).optional(),
    highlights:z.array(z.string()).optional(),
    isActive:z.boolean().optional()

})


export const entitySchema = z.object({
    companyId:z.string().min(1),
    airportId:z.string().min(1),
    email:z.string().email(),
    password:z.string().min(8),
    entityName:z.string().min(1),
    entityAddress:z.string().min(1),
    entityZipcode:z.string().min(1),
    entityPlace:z.string().min(1),
    phone: z.string().refine((value) => {
        const phoneRegex =/^(?:[0-9]){1,3}(?:[ -]*[0-9]){6,14}$/;
        return phoneRegex.test(value);
      }, "Invalid phone number"),
      invoiceAddress:z.string().min(1),
      contactPerson:z.string().min(1),
      companyName:z.string().min(1),
      invoiceEmail:z.string().email(),
      invoiceZipcode:z.string().min(1),
      invoicePlace:z.string().min(1),
      invoiceCountry:z.string().min(1),
      vatNO:z.string().optional(),
      IBAN:z.string().optional(),
      chamberOfCommerce:z.string().min(1),
      isActive:z.boolean().default(false),
      


   



})


export const registerSchema = z.object({
    email:z.string().email(),
    name:z.string().min(1),
    isActive:z.boolean(),
   address: z.string().min(2).max(50),
   password:z.string().min(6),
   contact:z.string().min(2).max(50),
  
   phone: z.string().refine((value) => {
     const phoneRegex =/^(?:[0-9]){1,3}(?:[ -]*[0-9]){6,14}$/;
     return phoneRegex.test(value);
   }, "Invalid phone number"),
   place:z.string().min(2).max(50),
   zipcode:z.string().min(1),
 
 
   
 })