import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { faqSchema } from "@/schemas";
import prisma from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/options";


export const PATCH = async (req:Request,{params}:{params:{faqId:string}})=>{

    try {

        const faqId = params.faqId
if(!faqId) return NextResponse.json({error:'Faq id is required'},{status:400})        
const session = await getServerSession(authOptions)

if(!session) return NextResponse.json({error:'Unauthorized'},{status:401})

const body = await req.json()

const validBody = faqSchema.safeParse(body)

if(!validBody.success) return NextResponse.json({error:validBody.error},{status:400})

await prisma.fAQ.update({
    where:{
id:faqId
    },
    data:{
        ...validBody.data
    }
})

return NextResponse.json({message:'success'},{status:201})

    } catch (error) {
        console.log(error)
        return NextResponse.json({error:'Internal error'},{status:500})
    }
}
export const DELETE = async (req:Request,{params}:{params:{faqId:string}})=>{

    try {

        const faqId = params.faqId
if(!faqId) return NextResponse.json({error:'Faq id is required'},{status:400})        
const session = await getServerSession(authOptions)

if(!session) return NextResponse.json({error:'Unauthorized'},{status:401})





await prisma.fAQ.delete({
    where:{
id:faqId
    },
 
})

return NextResponse.json({message:'success'},{status:201})

    } catch (error) {
        console.log(error)
        return NextResponse.json({error:'Internal error'},{status:500})
    }
}