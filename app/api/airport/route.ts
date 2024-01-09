import prisma from "@/lib/prisma";
import { airportSchema } from "@/schemas";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { duplicateSlugChecker } from "../(helpers)/duplicate-slug-checker";


export async function POST(req:Request){

    try {
        
const session =await getServerSession()

if(!session){
    return new NextResponse("Unauthorized",{status:401})
}

const body = await req.json()

const validBody = airportSchema.safeParse(body)
if(!validBody.success) return NextResponse.json({error:validBody.error},{status:400})

const slugMessage = await duplicateSlugChecker({slug:validBody.data.slug,element:'airport'})
if(slugMessage) return NextResponse.json({message:slugMessage},{status:200})

await prisma.airport.create({
    data:{
       ...validBody.data
    }
})

return NextResponse.json({done:'Success'},{status:201})

    } catch (error) {
        console.log("airport post error",error)

        return new NextResponse("Internal error",{status:500})
    }
}