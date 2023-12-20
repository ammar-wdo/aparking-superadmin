import Heading from '@/components/heading'
import React, { Suspense } from 'react'
import RefundRequestFeed from './(components)/refund-request-feed'
import PendingOptionsFeed from './(components)/pending-options-feed'
import { Skeleton } from '@/components/ui/skeleton'


type Props = {}

const page = async(props: Props) => {



  return (
    <div>
<Heading title='Super Admin' description='Manage your dashboard' />
<div className='mt-12 p-2 '>
  <div >
  <Suspense fallback={<Skeleton className='p-40   w-full' />}>
  <RefundRequestFeed />
  </Suspense>
  </div>
 <div className='mt-32'>
 <Suspense fallback={<Skeleton className='p-40  w-full' />}>
<PendingOptionsFeed />
</Suspense>
 </div>

  
</div>

    </div>
  )
}

export default page