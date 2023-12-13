import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import prisma from "@/lib/prisma";


export const POST = async (req:Request,{params}:{params:{reviewId:string}})=>{

    try {

        const session = await getServerSession(authOptions)

        if(!session) return NextResponse.json({error:"not authorized"},{status:403})

        const reviewId = params.reviewId
        if(!reviewId) return NextResponse.json({error:'review id is required'},{status:400})

        const review = await prisma.review.findUnique({
            where:{
                id:reviewId
            }
        })

        await prisma.review.update({
            where:{
                id:reviewId
            },
            data:{
                status: review?.status ==='ACTIVE' ? 'PENDING':'ACTIVE'
            }
        })

        return NextResponse.json({message:'success'},{status:201})


        
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:'internal error'},{status:500})
    }
}