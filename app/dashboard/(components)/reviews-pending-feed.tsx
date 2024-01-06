import prisma from '@/lib/prisma'
import React from 'react'
import { DataTable } from '../reviews/(components)/reviews-table'
import { reviewColumns } from '../reviews/(components)/review-columns'

type Props = {}

const ReviewsPendingFeed =async (props: Props) => {

    const pendingReviews = await prisma.review.findMany({where:{
        status:'PENDING'
    },include:{entity:{select:{entityName:true,company:{select:{name:true}}}},service:{select:{name:true}},booking:{select:{firstName:true,lastName:true,email:true}}},
    orderBy:{createdAt:'desc'}

})
  return (
    <div>
<h3 className="text-xl font-bold ">Pending reviews</h3>


<div className='mt-3'>
<DataTable data={pendingReviews} columns={reviewColumns} />
</div>


</div>
  )
}

export default ReviewsPendingFeed