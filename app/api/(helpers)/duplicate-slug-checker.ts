import prisma from "@/lib/prisma"

export const duplicateSlugChecker = async({slug,element,id}:{slug:string,element:'airport'|'company'|'entity'|'service',id?:string})=>{
   
    let message = ''

    if(element==='airport'){
        const existingAirport = await prisma.airport.findUnique({
            where:{
                slug:slug,
                ...(id && {NOT:{id}})
            }
        })

        if(existingAirport){
            message = 'This airport slug already exists'
        }
    }

    if(element==='company'){
        const existingCompany = await prisma.company.findUnique({
            where:{
                slug:slug,
                ...(id && {NOT:{id}})
            }
        })

        if(existingCompany){
            message = 'This company slug already exists'
        }
    }

    if(element==='entity'){
        const existingEntity = await prisma.entity.findUnique({
            where:{
                slug:slug,
                ...(id && {NOT:{id}})
            }
        })

        if(existingEntity){
            message = 'This entity slug already exists'
        }
    }

    if(element==='service'){
        const existingService = await prisma.service.findUnique({
            where:{
                slug:slug,
                ...(id && {NOT:{id}})
            }
        })

        if(existingService){
            message = 'This service slug already exists'
        }
    }


   
    return message
}