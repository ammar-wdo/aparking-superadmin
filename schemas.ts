import * as z from "zod"
 


const emailSchema = z.string().email()
export const serviceSchema = z.object({
    timeToAirport: z.string().min(2),
    distanceToAirport:z.string().min(1),
    generalInformation:z.string().optional(),
    importantInfo:z.string().optional(),
    logo:z.string().min(1),
    images:z.array(z.string()).optional(),
    facilities:z.array(z.string()).optional(),
    highlights: z.array(
      z.object({
        label: z.string(),
        icon: z.string()
      })
    ).optional(),
    isActive:z.boolean().optional(),
    name:z.string().min(1),
 terms:z.string().min(1),
 bookingsEmail:z.union([z.string(), z.undefined()])
 .refine((val) => !val || emailSchema.safeParse(val).success),
 parkingAddress:z.string().min(1),
 parkingZipcode:z.string().min(1),
 parkingCountry:z.string().min(1),
 parkingPlace:z.string().min(1),
 spots:z.coerce.number().positive().default(1),
 parkingType:z.enum(['shuttle','valet']).default('valet'),
 arrivalTodos:z.string().optional(),
 departureTodos:z.string().optional(),
 electricCharging:z.boolean().default(false),
 keyStatus:z.enum(['BOTH',"LEAVE","KEEP"]).default('BOTH'),
 parkingLocation:z.enum(['INDOOR',"OUTDOOR","BOTH"]).default('BOTH'),
 available:z.boolean().default(false),
 airportId:z.string().min(1),
 entityId:z.string().min(1)

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
      images:z.array(z.string()).default([]),
      content:z.string().default('')
      


   



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