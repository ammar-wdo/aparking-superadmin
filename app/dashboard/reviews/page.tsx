import Heading from '@/components/heading'
import React from 'react'
import ReviewsFeed from './(components)/reviews-feed'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <Heading title='Reviews' description='Read and manage reviews' />
        <div className='bg-background p-4 shadow-md rounded-md'>

        <ReviewsFeed />
        </div>
    </div>
  )
}

export default page