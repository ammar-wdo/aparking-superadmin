import prisma from "@/lib/prisma"
import { calculateParkingDays } from "./calculate-parking-days"
import { findTotalPrice } from "./find-total-price"


export const daysAndTotal = async(startDate:Date,endDate:Date,serviceId:string)=>{

const serivce = await prisma.service.findUnique({
    where:{
        id:serviceId
    },
    include:{
        rules:true
    }
})
   


    

    const daysofparking = calculateParkingDays(startDate,endDate)

    const total = findTotalPrice(serivce!,daysofparking,startDate,endDate)

    return {total :total as number, daysofparking}
}