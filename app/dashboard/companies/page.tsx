import React from 'react'

import prisma from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Heading from '@/components/heading'
import { CompaniesDataTable } from './(components)/companiesTable'
import { companiesColumns } from './(components)/companiesColumns'

type Props = {}

const dynamic = 'force-dynamic'

const page = async(props: Props) => {


  const companies = await prisma.company.findMany({
    orderBy:{
      createdAt:'desc'
    }
  })
  return (
    <div>
      <div className='flex items-center justify-between'>
      <Heading title='Companies' description='Manage companies'/>
      <Link href={`/dashboard/companies/new`}><Button>Add company</Button></Link>
      </div>
    
       
<div className='bg-background p-4 shadow-md rounded-md'>
<CompaniesDataTable columns={companiesColumns} data={companies} />
</div>

    </div>
  )
}

export default page