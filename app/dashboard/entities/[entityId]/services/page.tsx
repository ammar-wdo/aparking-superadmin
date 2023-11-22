import Heading from '@/components/heading'
import prisma from '@/lib/prisma'
import React from 'react'
import { ServicesDataTable } from './(components)/services-table'
import { servicesColumns } from './(components)/services-columns'

type Props = {
    params:{entityId:string}
}

const page = async({params}: Props) => {

    const services = await prisma.service.findMany({
        where:{
            entityId:params.entityId       },
            orderBy:{
              createdAt:'desc'
            },include:{
              entity:{
                select:{
                  id:true,entityName:true
                }
              }
            }
    })


  return (
    <div>
        <Heading title='Entity services' description='Manage services' />

        <ServicesDataTable columns={servicesColumns} data={services} />
        
    </div>
  )
}

export default page