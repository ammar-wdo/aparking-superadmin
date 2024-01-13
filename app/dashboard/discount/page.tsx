import Heading from '@/components/heading'
import React from 'react'
import AddButton from './(components)/add-button'
import DiscountFeed from './(components)/discount-feed'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <div className='flex items-center justify-between'>
        <Heading title='Discount' description='Manage discounts' />
        <AddButton />
        </div>

        <div className='mt-12'>
            <DiscountFeed />
        </div>
        
    
    
    
    </div>
  )
}

export default page