import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import prisma from "@/lib/prisma";
import { aboutSchema } from "@/schemas";

export const POST = async(req:Request)=>{

    try {

        const session = await getServerSession(authOptions)

        if(!session)  return NextResponse.json({error:'Unauthorized'},{status:401})

        const body = await req.json()

        const validBody = aboutSchema.safeParse(body)

        if(!validBody.success) return NextResponse.json({error:'content is required'},{status:400})

        await prisma.about.create({
            data:{
                id:'about',
                ...validBody.data
            }
        })


        return NextResponse.json({message:'success'},{status:200})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:'internal error'},{status:500})
    }

}

export const PATCH = async(req:Request)=>{

    try {

        const session = await getServerSession(authOptions)

        if(!session)  return NextResponse.json({error:'Unauthorized'},{status:401})

        const body = await req.json()
        const validBody = aboutSchema.safeParse(body)

        if(!validBody.success) return NextResponse.json({error:'content is required'},{status:400})

        await prisma.about.update({
            where:{
                id:'about'
            },
            data:{
                
                ...validBody.data
            }
        })


        return NextResponse.json({message:'success'},{status:200})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:'internal error'},{status:500})
    }

}