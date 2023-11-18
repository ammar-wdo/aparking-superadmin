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
        }
    })
    if(!service) return redirect('/dashboard/companies')

  return (
    <div>
        <Heading title={service?.name!} description={'Manage ' + service?.name} />
        <ServiceForm service={service} />
      
      
    </div>
  )
}

export default page