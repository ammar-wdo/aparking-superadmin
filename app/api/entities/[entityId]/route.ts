import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { entitySchema, serviceSchema } from "@/schemas";
import prisma from "@/lib/prisma";


export async function PATCH(req:Request,{params}:{params:{entityId:string}}) {

try {
if(!params.entityId) return new NextResponse("entity ID is required",{status:400})
    const admin = await getServerSession(authOptions)

    if(!admin)  return new NextResponse("Unauthorized",{status:401})

    const body = await req.json()
    console.log(body)
    const validbody = entitySchema.safeParse(body)
    if(!validbody.success) return NextResponse.json({errors:validbody.error},{status:400})

    const updated = await prisma.entity.update({
        where:{
            id:params.entityId
        },
        data:{
            ...validbody.data
        }
    })

    return NextResponse.json({message:"success"},{status:201})



  
    
} catch (error) {
    console.log(error)
    return new NextResponse("Internal error",{status:500})
}
  
}
export async function DELETE(req:Request,{params}:{params:{entityId:string}}) {

try {
if(!params.entityId) return new NextResponse("entity ID is required",{status:400})
    const admin = await getServerSession(authOptions)

    if(!admin)  return new NextResponse("Unauthorized",{status:401})



    const updated = await prisma.entity.delete({
        where:{
            id:params.entityId
        },
      
    })

    await prisma.notification.create({
        data:{
            companyId:updated.companyId,
            type:'ENTITY',
           name:updated.entityName,
           status:'DELETE',
            message:`The ${updated.entityName} entity has been deleted by Aparking super admin`

        }
     })

    return NextResponse.json({message:"success"},{status:201})



  
    
} catch (error) {
    console.log(error)
    return new NextResponse("Internal error",{status:500})
}
  
}