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
    console.log(body)
    const validbody = serviceSchema.safeParse(body)
    if(!validbody.success) return NextResponse.json({errors:validbody.error},{status:400})

    const updated = await prisma.service.update({
        where:{
            id:params.serviceId
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