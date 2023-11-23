import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import prisma from "@/lib/prisma";


export async function GET(){

    try {


    const session = await getServerSession(authOptions)

    if(!session) return new NextResponse("Unautorized",{status:401})
    const notifications = await prisma.notification.count({
where:{
    isAdmin:true,
    isRead:false
}})
       
return NextResponse.json({count:notifications},{status:200})

    } catch (error) {
        console.log("Notifications GET Error",error)
        return new NextResponse("Internal error",{status:500})
    }



}