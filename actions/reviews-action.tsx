'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import prisma from "@/lib/prisma"
import { reviewSchema } from "@/schemas"
import { getServerSession } from "next-auth"


export const addReview = async (data:any)=>{

try {
    
    const session = getServerSession(authOptions)

    if(!session) return {success:false,error:'Unauthorized'}

const validData = reviewSchema.safeParse(data)
if(!validData.success){ 
    
    console.log(validData.error.message)
    
    return {success:false,error:'Input Error'}}


    await prisma.review.create({
        data:{
            ...validData.data,
            rate:+validData.data.rate
        }
    })

    return {success:true,message:'Successfully Created'}





} catch (error) {
    console.log(error)
    return {success:false,error:'Internal Error'}
}


}


export const editReview = async (id:string,data:any)=>{

try {
    if(!id) return {success:false,error:'Id required'}
    const session = getServerSession(authOptions)

    if(!session) return {success:false,error:'Unauthorized'}

const validData = reviewSchema.safeParse(data)
if(!validData.success){ 
    
    console.log(validData.error.message)
    
    return {success:false,error:'Input Error'}}


    await prisma.review.update({
        where:{
            id
        },
        data:{
            ...validData.data,
            rate:+validData.data.rate
        }
    })

    return {success:true,message:'Successfully Updated'}





} catch (error) {
    console.log(error)
    return {success:false,error:'Internal Error'}
}


}



export const deleteReview = async (id:string)=>{

    try {
        if(!id) return {success:false,error:'Id required'}
        const session = getServerSession(authOptions)
    
        if(!session) return {success:false,error:'Unauthorized'}
    
    
        
      
        
    
    
    
        await prisma.review.delete({
            where:{
                id
            },
          
        })
    
        return {success:true,message:'Successfully deleted'}
    
    
    
    
    
    } catch (error) {
        console.log(error)
        return {success:false,error:'Internal Error'}
    }
    
    
    }