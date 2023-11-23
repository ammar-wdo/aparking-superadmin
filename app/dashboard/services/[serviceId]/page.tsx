import Heading from '@/components/heading'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import React from 'react'
import ServiceForm from './(components)/service-form'

type Props = {
    params:{companyId:string,serviceId:string}
}

const page = async({params}: Props) => {

    const service = await prisma.service.findUnique({
        where:{
            id:params.serviceId
        },include:{
            entity:{select:{
                companyId:true
            }}
        }
    })
    if(!service) return redirect('/dashboard/companies')

 
    const airports = await prisma.airport.findMany({select:{id:true,name:true}})
const entities  =await prisma.entity.findMany({where:{companyId:service.entity.companyId},select:{id:true,entityName:true}})

  return (
    <div>
        <Heading title={"Services - " + service?.name!} description={'Manage ' + service?.name + ' service'} />
        <ServiceForm service={service} entities={entities} airports={airports}/>
      
      
    </div>
  )
}

export default page