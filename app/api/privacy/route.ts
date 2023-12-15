import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

export const POST = async(req:Request)=>{

    try {

        const session = await getServerSession(authOptions)

        if(!session)  return NextResponse.json({error:'Unauthorized'},{status:401})

        const {content} = await req.json()

        if(!content) return NextResponse.json({error:'content is required'},{status:400})

        await prisma.privacy.create({
            data:{
                id:'privacy',
                content
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

        const {content} = await req.json()

        if(!content) return NextResponse.json({error:'content is required'},{status:400})

        await prisma.privacy.update({
            where:{
                id:'privacy'
            },
            data:{
                
                content
            }
        })


        return NextResponse.json({message:'success'},{status:200})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:'internal error'},{status:500})
    }

}