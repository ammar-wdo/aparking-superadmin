import Heading from '@/components/heading'
import React from 'react'
import AirportsFeed from './(components)/airports-feed'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <div className='flex items-center justify-between'>
      <Heading title='Airports' description='Manage airports'/>
         <Button asChild><Link href={'/dashboard/airports/new'}>Add Airport</Link></Button>
      </div>
     

         <div className='mt-12 separate'>
          <AirportsFeed />

         </div>
    </div>
  )
}

export default page