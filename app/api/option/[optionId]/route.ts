import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"


export const POST = async(req:Request,{params}:{params:{optionId:string}})=>{

    try {

        const session = await getServerSession(authOptions)

        if(!session) return NextResponse.json({error:'Unauthorized'},{status:401})

        const optionId = params.optionId

        if(!optionId) return NextResponse.json({error:'optionId is required'},{status:401})

        const option = await prisma.exraOption.findUnique({
            where:{
                id:optionId
            }
        })

        if(!option) return NextResponse.json({error:'option does not exist'},{status:401})

    await prisma.exraOption.update({
        where:{id:optionId},data:{
            isActive:!option?.isActive
        }
    })

    return NextResponse.json({message:'success'},{status:201})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:'something went wrong'},{status:500})
    }

}