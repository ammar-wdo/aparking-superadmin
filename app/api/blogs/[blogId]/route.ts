import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { blogSchema } from "@/schemas";
import prisma from "@/lib/prisma";


export const PATCH = async(req:Request,{params}:{params:{blogId:string}})=>{

    try {
const blogId = params.blogId

if(!blogId) return NextResponse.json({error:'blogId required'},{status:400})
        const session = await getServerSession(authOptions)
        if(!session) return NextResponse.json({error:'not Authorized'},{status:401})

        const body = await req.json()

        const validBody = blogSchema.safeParse(body)

        if(!validBody.success) return NextResponse.json({error:validBody.error},{status:400})

        await prisma.blog.update({
            where:{id:blogId},

            data:{
                ...validBody.data
            }
        })

        return NextResponse.json({message:'success'},{status:201})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:'internal error'},{status:500})
    }
}


export const DELETE = async(req:Request,{params}:{params:{blogId:string}})=>{

    try {
const blogId = params.blogId

if(!blogId) return NextResponse.json({error:'blogId required'},{status:400})
        const session = await getServerSession(authOptions)
        if(!session) return NextResponse.json({error:'not Authorized'},{status:401})

      

        await prisma.blog.delete({
            where:{id:blogId},
            
          
        })

        return NextResponse.json({message:'success'},{status:201})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:'internal error'},{status:500})
    }
}