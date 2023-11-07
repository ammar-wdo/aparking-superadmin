

import prisma from "@/lib/prisma";
import { Company } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";


export async function POST(req:Request){

try {
    const session = await getServerSession(authOptions)

    if(!session?.user) return new NextResponse('Unauthenticated',{status:401})

    const {email,isActive,address,contact,invoiceEmail,phone,place,zipcode} = await req.json()

    if(!email) return new NextResponse('email is required',{status:404})
    
    if(!address) return new NextResponse('address is required',{status:404})
    if(!contact) return new NextResponse('contact is  required',{status:404})
    if(!invoiceEmail) return new NextResponse('invoice mail is  required',{status:404})
    if(!phone) return new NextResponse('phone is  required',{status:404})
    if(!place) return new NextResponse('place is  required',{status:404})
    if(!zipcode) return new NextResponse('zipcode is  required',{status:404})

    const company = await prisma.company.create({
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
    console.log('CREATE_COMPANY',error)
    return new NextResponse('internal error ',{status:500})
    
}
   
    

}