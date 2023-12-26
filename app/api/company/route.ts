

import prisma from "@/lib/prisma";
import { Company } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { registerSchema } from "@/schemas";
import { encryptPassword } from "../(helpers)/bcrypt";



export async function POST(req:Request){

try {
    const session = await getServerSession(authOptions)

    if(!session?.user) return new NextResponse('Unauthenticated',{status:401})

    const body = await req.json()

    const validBody = registerSchema.safeParse(body)

    if(!validBody.success)  return  NextResponse.json({error:validBody.error},{status:401})

  
    const encryptedPassword = await encryptPassword(validBody.data.password)

    const company = await prisma.company.create({
        data:{
         ...validBody.data,
         password:encryptedPassword
        }
    })

    return NextResponse.json(company)
   


} catch (error) {
    console.log('CREATE_COMPANY',error)
    return new NextResponse('internal error ',{status:500})
    
}
   
    

}