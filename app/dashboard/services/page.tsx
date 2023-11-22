import Heading from '@/components/heading'
import prisma from '@/lib/prisma'
import React from 'react'
import { ServicesDataTable } from './(components)/services-table'
import { servicesColumns } from './(components)/services-columns'



type Props = {}

const page = async(props: Props) => {

    const services = await prisma.service.findMany({
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