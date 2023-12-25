import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { EntitiesDataTable } from './(components)/entitiesTable'
import { entitiesColumns } from './(components)/entitiesColumns'
import prisma from '@/lib/prisma'

type Props = {searchParams:{[key:string]:string | string[] | undefined}}

const page = async({searchParams}: Props) => {

  const companyId = searchParams.companyId

    const entites = await prisma.entity.findMany(
      {
        where:{
          companyId:companyId as string | undefined
        },
        include:{
          company:{
            select:{name:true}
          }
        }
      }
    )

   
  return (
    <div className=''>
        <div className='flex items-center justify-between'>
            <Heading title='Entities' description='Manage entities' />
            <Link href={`/dashboard/entities/new`}><Button>Add entity</Button></Link>
        </div>
<div className='separate'>

        <EntitiesDataTable columns={entitiesColumns} data={entites} />
</div>
    </div>
  )
}

export default page