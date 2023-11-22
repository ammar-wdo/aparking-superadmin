import Heading from '@/components/heading'
import prisma from '@/lib/prisma'
import React from 'react'
import { ServicesDataTable } from '../entities/[entityId]/services/(components)/services-table'
import { servicesColumns } from '../entities/[entityId]/services/(components)/services-columns'

type Props = {}

const page = async(props: Props) => {

    const services = await prisma.service.findMany({
        orderBy:{
            createdAt:'desc'
        }
    })
  return (
    <div>
        <Heading title='Services' description='Manage services' />

        <ServicesDataTable columns={servicesColumns} data={services} />
    </div>
  )
}

export default page