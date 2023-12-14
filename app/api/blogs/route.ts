import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { blogSchema } from "@/schemas";
import prisma from "@/lib/prisma";

export const POST = async(req:Request)=>{

    try {

        const session = await getServerSession(authOptions)
        if(!session) return NextResponse.json({error:'not Authorized'},{status:401})

        const body = await req.json()

        const validBody = blogSchema.safeParse(body)

        if(!validBody.success) return NextResponse.json({error:validBody.error},{status:400})

        await prisma.blog.create({
            data:{
                ...validBody.data
            }
        })

        return NextResponse.json({message:'success'},{status:201})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:'internal error'},{status:500})
    }
}