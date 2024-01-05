import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/options";


export const PATCH = async (req:Request,{params}:{params:{categoryId:string}})=>{

    try {

        const session = await getServerSession(authOptions)

        if(!session) return NextResponse.json({error:'Unauthorized'},{status:401})

        const categoryId = params.categoryId

        if(!categoryId) return NextResponse.json({error:'category Id is required'},{status:401})

        const {label} = await req.json()

        if(!label) return NextResponse.json({error:'Label is required'},{status:400})

        await prisma.categoryFAQ.update({
            where:{
                id:categoryId
            },

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
export const DELETE = async (req:Request,{params}:{params:{categoryId:string}})=>{

    try {

        const session = await getServerSession(authOptions)

        if(!session) return NextResponse.json({error:'Unauthorized'},{status:401})

        const categoryId = params.categoryId
   

        if(!categoryId) return NextResponse.json({error:'category Id is required'},{status:401})

      

        await prisma.categoryFAQ.delete({
            where:{
                id:categoryId
            },

           
        })

        return NextResponse.json({message:"success"},{status:201})
        
    } catch (error) {
        console.log(error)

        return NextResponse.json({error:'internal error'},{status:400})
    }
}