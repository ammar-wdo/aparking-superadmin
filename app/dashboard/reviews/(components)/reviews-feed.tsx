import prisma from '@/lib/prisma'
import React from 'react'
import { DataTable } from './reviews-table'
import { reviewColumns } from './review-columns'

type Props = {}

const ReviewsFeed = async(props: Props) => {

    const reviews = await prisma.review.findMany({include:{booking:{select:{firstName:true,lastName:true,email:true}}}})

  return (
    <div className=''>
        <DataTable data={reviews} columns={reviewColumns} />
    </div>
  )
}

export default ReviewsFeed