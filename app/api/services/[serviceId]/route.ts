import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { serviceSchema } from "@/schemas";
import prisma from "@/lib/prisma";


export async function PATCH(req:Request,{params}:{params:{serviceId:string}}) {

try {
if(!params.serviceId) return new NextResponse("service ID is required",{status:400})
    const admin = await getServerSession(authOptions)

    if(!admin)  return new NextResponse("Unauthorized",{status:401})

    const body = await req.json()
   
    const validbody = serviceSchema.safeParse(body)
    if(!validbody.success) return NextResponse.json({errors:validbody.error},{status:400})

    const {entityId,...rest} = validbody.data
   
    const service = await prisma.service.findUnique({where:{
        id:params.serviceId
    },select:{
        isActive:true
    }})
    const updated = await prisma.service.update({
        where:{
            id:params.serviceId
        },
        data:{
            ...rest,
            entityId
        },include:{
            entity:{
                select:{companyId:true}
            }
        }
    })

  console.log(updated.isActive, service?.isActive)
if(updated.isActive===true && service?.isActive === false){
    await prisma.notification.create({
        data:{
            companyId:updated.entity.companyId,
            entityId:updated.entityId,
            IdHolder:updated.id,
            type:'SERVICE',
           name:updated.name,
           status:'APPROVE',
            message:`The ${updated.name} service has been approved and activated by Aparking super admin`

        }
     })
}
if(updated.isActive===false && service?.isActive === true){
    await prisma.notification.create({
        data:{
            companyId:updated.entity.companyId,
            entityId:updated.entityId,
            IdHolder:updated.id,
            type:'SERVICE',
           name:updated.name,
           status:'REQUEST',
            message:`The ${updated.name} service has been Disabled by Aparking super admin`

        }
     })
}
   

    return NextResponse.json({message:"success"},{status:201})



  
    
} catch (error) {
    console.log(error)
    return new NextResponse("Internal error",{status:500})
}
  
}
export async function DELETE(req:Request,{params}:{params:{serviceId:string}}) {

try {
if(!params.serviceId) return new NextResponse("service ID is required",{status:400})
    const admin = await getServerSession(authOptions)

    if(!admin)  return new NextResponse("Unauthorized",{status:401})



    const updated = await prisma.service.delete({
        where:{
            id:params.serviceId
        },include:{entity:{
            select:{companyId:true}
        }}
      
    })

    await prisma.notification.create({
        data:{
            companyId:updated.entity.companyId,
            entityId:updated.entityId,
            type:'SERVICE',
           name:updated.name,
           status:'DELETE',
            message:`The ${updated.name} service has been deleted by Aparking super admin`

        }
     })
    
    return NextResponse.json({message:"success"},{status:201})



  
    
} catch (error) {
    console.log(error)
    return new NextResponse("Internal error",{status:500})
}
  
}