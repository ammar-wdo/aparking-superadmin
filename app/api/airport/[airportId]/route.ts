import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function PATCH(req:Request,{params}:{params:{airportId:string}}){
console.log('hello')
    const airportId = params.airportId

    if(!airportId) return new NextResponse('Airport ID is required',{status:400})

    try {
        
const session =await getServerSession()

if(!session){
    return new NextResponse("Unauthorized",{status:401})
}

const {name} = await req.json()

if(!name) return new NextResponse("name is required",{status:400})

await prisma.airport.update({
    where:{
id:airportId
    },
    data:{
        name:name 
    }
})

return NextResponse.json({message:'Success'},{status:201})

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