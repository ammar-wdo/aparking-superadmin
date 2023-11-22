import Heading from '@/components/heading'
import prisma from '@/lib/prisma'
import React from 'react'
import { ServicesDataTable } from './(components)/services-table'
import { servicesColumns } from './(components)/services-columns'



type Props = {searchParams:{[key:string]:string | string[] | undefined}}

const page = async({searchParams}: Props) => {

    const entityId = searchParams.entityId

    const services = await prisma.service.findMany({
        where:{
            entityId:entityId as string | undefined
        },
        orderBy:{
            createdAt:'desc'
        },include:{
            entity:{
                select:{
                    id:true,
                    entityName:true
                }
            }
        }
    })
  return (
    <div className=''>
        <Heading title='Services' description='Manage services' />

        <ServicesDataTable columns={servicesColumns} data={services} />
    </div>
  )
}

export default page