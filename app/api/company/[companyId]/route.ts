

import prisma from "@/lib/prisma";
import { Company } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { registerSchema } from "@/schemas";
import { encryptPassword } from "../../(helpers)/bcrypt";




export async function PATCH(req:Request,{params}:{params:{companyId:string}}){
  
try {
    const session = await getServerSession(authOptions)

    if(!session?.user) return new NextResponse('Unauthenticated',{status:401})
    if(!params.companyId) return new NextResponse('company ID is required',{status:400})

    const body = await req.json()

  

    const validBody = registerSchema.safeParse(body)

    if(!validBody.success)  return  NextResponse.json({error:validBody.error},{status:401})


    const {newPassword,password,...rest} = validBody.data
    let thePassword
    if(newPassword){
        thePassword = await encryptPassword(newPassword)
    }else{
        thePassword = password
    }




    const companyExist = await prisma.company.findUnique({
        where:{
            email:validBody.data.email,
            NOT:{id:params.companyId}
          
        }
    })

    if(companyExist) return NextResponse.json({message:"E-mail already exist"},{status:200})

    const entityExist = await prisma.entity.findUnique({
        where:{
            email:validBody.data.email
        }
    })


    if(entityExist) return NextResponse.json({message:"E-mail already exist as an entity"},{status:200})



    const company = await prisma.company.update({
        where:{
id:params.companyId
        },
        data:{
         ...rest,
         password:thePassword
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