import prisma from "@/lib/prisma"

export const duplicateEmailChecker = async(validBody:any,companyId?:string,entityId?:string)=>{
    let message = ''


    const companyExist = await prisma.company.findUnique({
        where:{
            email:validBody.data.email,
            ...(companyId && {NOT:{id:companyId}})
        }
    })

    if(companyExist) {
        message = "E-mail already exists"
    }

    const entityExist = await prisma.entity.findUnique({
        where:{
            email:validBody.data.email,
            ...(entityId && {NOT:{id:entityId}})
        }
    })


    if(entityExist) {
        message = "E-mail already exists"
    }

    return message
}