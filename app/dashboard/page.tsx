import React from 'react'
import SinoutButton from './(components)/signout-button'
import prisma from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Props = {}

const page = async(props: Props) => {


  const companies = await prisma.company.findMany()
  return (
    <div>
        <SinoutButton />
<div className='mt-20 p-20 grid xl:grid-cols-4 gap-10'>
  {companies.map(company=><Link key={company.id} href={`/dashboard/${company.id}`}><div className='overflow-hidden border rounded-md'>{JSON.stringify(company)}</div></Link>)}

</div>
<Link href={`/dashboard/newCompany`}><Button>Add company</Button></Link>
    </div>
  )
}

export default page