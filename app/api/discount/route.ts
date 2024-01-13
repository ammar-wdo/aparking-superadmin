import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { discountSchema } from "@/schemas";
import prisma from "@/lib/prisma";
import { generate10DigitID } from "./(helpers)/code-generator";


export const POST = async (req:Request)=>{


    try {

        const session = await getServerSession(authOptions)
        if(!session) return NextResponse.json({error:'Unauthorized'},{status:401})


        const body = await req.json()
        const refinedBody = {...body,startDate:new Date(body.startDate),endDate:new Date(body.endDate)}
        const validBody = discountSchema.safeParse(refinedBody)
        if(!validBody.success) return NextResponse.json({error:validBody.error},{status:400})


        let code = generate10DigitID()
        let existingDiscount = await prisma.discount.findFirst({
          where: {
            code: code,
          },
          select: { code: true },
        });
    
        while (existingDiscount) {
          code =generate10DigitID()
          existingDiscount = await prisma.discount.findFirst({
            where: {
              code: code,
            },
            select: { code: true },
          });
        }

        await prisma.discount.create({
            data:{
                ...validBody.data,
                code,
                endDate:new Date(validBody.data.endDate.setHours(23,45,0,0))
            }
        })

        return NextResponse.json({},{status:201})


        
    } catch (error) {
        console.log(error)

        return NextResponse.json({error:'internal error'},{status:500})
    }


}