import Heading from '@/components/heading'
import React from 'react'
import RefundRequestFeed from './(components)/refund-request-feed'
import PendingOptionsFeed from './(components)/pending-options-feed'


type Props = {}

const page = async(props: Props) => {



  return (
    <div>
<Heading title='Super Admin' description='Manage your dashboard' />
<div className='mt-12 p-2'>
  <RefundRequestFeed />
  <PendingOptionsFeed />
</div>

    </div>
  )
}

export default page