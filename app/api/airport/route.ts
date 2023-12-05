import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function POST(req:Request){

    try {
        
const session =await getServerSession()

if(!session){
    return new NextResponse("Unauthorized",{status:401})
}

const {name,images,content} = await req.json()

if(!name) return new NextResponse("name is required",{status:400})

await prisma.airport.create({
    data:{
        name:name ,
        images,
        content
    }
})

return NextResponse.json({message:'Success'},{status:201})

    } catch (error) {
        console.log("airport post error",error)

        return new NextResponse("Internal error",{status:500})
    }
}