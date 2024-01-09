import prisma from "@/lib/prisma";
import { airportSchema } from "@/schemas";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { duplicateSlugChecker } from "../../(helpers)/duplicate-slug-checker";


export async function PATCH(req:Request,{params}:{params:{airportId:string}}){
console.log('hello')
    const airportId = params.airportId

    if(!airportId) return new NextResponse('Airport ID is required',{status:400})

    try {
        
const session =await getServerSession()

if(!session){
    return new NextResponse("Unauthorized",{status:401})
}
const body = await req.json()

const validBody = airportSchema.safeParse(body)
if(!validBody.success) return NextResponse.json({error:validBody.error},{status:400})


const slugMessage = await duplicateSlugChecker({slug:validBody.data.slug,element:'airport',id:airportId})
if(slugMessage) return NextResponse.json({message:slugMessage},{status:200})

await prisma.airport.update({
    where:{
id:airportId
    },
    data:{
     ...validBody.data
    }
})

return NextResponse.json({done:'Success'},{status:201})

    } catch (error) {
        console.log("airport patch error",error)

        return new NextResponse("Internal error",{status:500})
    }
}




export async function DELETE(req:Request,{params}:{params:{airportId:string}}){

    const airportId = params.airportId

    if(!airportId) return new NextResponse('Airport ID is required',{status:400})

    try {
        
const session =await getServerSession()

if(!session){
    return new NextResponse("Unauthorized",{status:401})
}



await prisma.airport.delete({
    where:{
id:airportId
    },
  
})

return NextResponse.json({message:'Success'},{status:201})

    } catch (error) {
        console.log("airport delete error",error)

        return new NextResponse("Internal error",{status:500})
    }
}