import prisma from '@/lib/prisma'
import React from 'react'
import RegisterForm from './(components)/register-company-form'
import Heading from '@/components/heading'
import { notFound } from 'next/navigation'

type Props = {params:{companyId:string}}

const page = async({params}: Props) => {


    const company = await prisma.company.findUnique({
        where:{
            id:params.companyId
        }
    })

    if(!company && params.companyId !== 'new') return notFound()
  return (
    <div>
      <Heading title='Manage companies' description={company?"Manage a company" : 'Create a company'}/>
     
        <RegisterForm company={company} />
    </div>
  )
}

export default page