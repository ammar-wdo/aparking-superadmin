import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { entitySchema } from "@/schemas";
import prisma from "@/lib/prisma";


export async function POST(req:Request){
    try {
        

        const admin = await getServerSession(authOptions)

     if(!admin)  return new NextResponse("Unauthorized",{status:401})

     const body = await req.json()

     const validbody = entitySchema.safeParse(body)
     if(!validbody.success) return NextResponse.json({errors:validbody.error},{status:400})

    const entity= await prisma.entity.create({
        data:{
            ...validbody.data
        }
     })

     await prisma.notification.create({
        data:{
            companyId:entity.companyId,
            type:'ENTITY',
            IdHolder:entity.id,
            message:'New entity has been created by Aparking super admin'

        }
     })

     return NextResponse.json({message:"success"},{status:201})



    } catch (error) {
        console.log("entity post error",error)
        return new NextResponse("Internal error",{status:500})

    }
}