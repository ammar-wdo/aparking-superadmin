import prisma from '@/lib/prisma'
import React from 'react'
import RegisterForm from './(components)/register-company-form'

type Props = {params:{companyId:string}}

const page = async({params}: Props) => {


    const company = await prisma.company.findUnique({
        where:{
            id:params.companyId
        }
    })
  return (
    <div>
       <h3 className='p-10 text-xl font-bold'>{company?"Manage a company" : 'Create a company'}</h3>
        <RegisterForm company={company} />
    </div>
  )
}

export default page