import Heading from '@/components/heading'
import prisma from '@/lib/prisma'
import React from 'react'
import { ServicesDataTable } from './(components)/services-table'
import { servicesColumns } from './(components)/services-columns'

type Props = {
    params:{companyId:string}
}

const page = async({params}: Props) => {

    const services = await prisma.service.findMany({
        where:{
            companyId:params.companyId       }
    })


  return (
    <div>
        <Heading title='Company services' description='Manage services' />

        <ServicesDataTable columns={servicesColumns} data={services} />
        
    </div>
  )
}

export default page