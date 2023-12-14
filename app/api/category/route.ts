import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import prisma from "@/lib/prisma";


export const POST = async (req:Request)=>{

    try {

        const session = await getServerSession(authOptions)

        if(!session) return NextResponse.json({error:'Unauthorized'},{status:401})

        const {label} = await req.json()

        if(!label) return NextResponse.json({error:'Label is required'},{status:400})

        await prisma.category.create({
            data:{
                label
            }
        })

        return NextResponse.json({message:"success"},{status:201})
        
    } catch (error) {
        console.log(error)

        return NextResponse.json({error:'internal error'},{status:400})
    }
}