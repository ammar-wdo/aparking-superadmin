import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { discountSchema } from "@/schemas";
import prisma from "@/lib/prisma";

export const PATCH = async(req:Request,{params}:{params:{discountId:string}})=>{

    try {
const session = await getServerSession(authOptions)
if(!session) return NextResponse.json({error:'Unauthorized'},{status:401})

const discountId = params.discountId
if(!discountId) return NextResponse.json({error:'discount id is required'},{status:400})


const body = await req.json()
const refinedBody = {...body,startDate:new Date(body.startDate),endDate:new Date(body.endDate)}
    
console.log(refinedBody)
const validBody = discountSchema.safeParse(refinedBody);
if (!validBody.success)
  return NextResponse.json(validBody.error, { status: 400 });

  const existDiscout = await prisma.discount.findUnique({
    where:{
        NOT:{id:discountId},
      code:validBody.data.code
    }
  })

  if(existDiscout) return NextResponse.json({message:'Code already exist'},{status:200})

  await prisma.discount.update({
    where:{
        id:discountId
    },
    data:{
        ...validBody.data,
        endDate:new Date(validBody.data.endDate.setHours(23,45,0,0))
    }
  })

  return NextResponse.json({},{status:201})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:'internal error'},{status:500})
    }
}

export const DELETE = async(req:Request,{params}:{params:{discountId:string}})=>{
    try {
        const session = await getServerSession(authOptions)
        if(!session) return NextResponse.json({error:'Unauthorized'},{status:401})
        const discountId = params.discountId
    if(!discountId)  return NextResponse.json({error:'discount id is required'},{status:400})

    await prisma.discount.delete({
        where:{
            id:discountId
        }
    })

    return NextResponse.json({},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:'internal error'},{status:500})
    }
}