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