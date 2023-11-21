

import prisma from "@/lib/prisma";
import { Company } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { registerSchema } from "@/schemas";




export async function PATCH(req:Request,{params}:{params:{companyId:string}}){
    console.log('patch')
console.log(params.companyId)
try {
    const session = await getServerSession(authOptions)

    if(!session?.user) return new NextResponse('Unauthenticated',{status:401})
    if(!params.companyId) return new NextResponse('company ID is required',{status:400})

    const body = await req.json()

  

    const validBody = registerSchema.safeParse(body)

    if(!validBody.success)  return  NextResponse.json({error:validBody.error},{status:401})



    const company = await prisma.company.update({
        where:{
id:params.companyId
        },
        data:{
         ...validBody.data
        }
    })

    return NextResponse.json(company)
   


} catch (error) {
    console.log('EDIT_COMPANY',error)
    return new NextResponse('internal error ',{status:500})
    
}
   
    

}


export async function DELETE(req:Request,{params}:{params:{companyId:string}}){

    try {

        const session = await getServerSession(authOptions)

        if(!session?.user) return new NextResponse('Unauthenticated',{status:401})

        if(!params.companyId) return new NextResponse('company ID is required',{status:400})

        await prisma.company.delete({
            where:{
                id:params.companyId
            }
        })
        

        return NextResponse.json({message:'success'},{status:201})
    } catch (error) {
        console.log('DELETE_COMPANY',error)
        return new NextResponse('internal error ',{status:500})
    }

}