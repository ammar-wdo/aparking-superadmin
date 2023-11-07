

import prisma from "@/lib/prisma";
import { Company } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";



export async function PATCH(req:Request,{params}:{params:{companyId:string}}){
    console.log('patch')
console.log(params.companyId)
try {
    const session = await getServerSession(authOptions)

    if(!session?.user) return new NextResponse('Unauthenticated',{status:401})
    if(!params.companyId) return new NextResponse('company ID is required',{status:400})

    const {email,isActive,address,contact,invoiceEmail,phone,place,zipcode} = await req.json()

    if(!email) return new NextResponse('email is required',{status:404})
    
    if(!address) return new NextResponse('address is required',{status:404})
    if(!contact) return new NextResponse('contact is  required',{status:404})
    if(!invoiceEmail) return new NextResponse('invoice mail is  required',{status:404})
    if(!phone) return new NextResponse('phone is  required',{status:404})
    if(!place) return new NextResponse('place is  required',{status:404})
    if(!zipcode) return new NextResponse('zipcode is  required',{status:404})

    const company = await prisma.company.update({
        where:{
id:params.companyId
        },
        data:{
            email,
            address,
            isActive,
           
            contact,
            invoiceEmail,
            place,
            phone,
            zipcode
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