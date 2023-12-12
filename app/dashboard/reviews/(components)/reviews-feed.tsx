import prisma from '@/lib/prisma'
import React from 'react'

type Props = {}

const ReviewsFeed = async(props: Props) => {

    const reviews = await prisma.review.findMany()

  return (
    <div className='p-3'>
        <div className='flex flex-col gap-4 w-fit'>
            {!reviews.length && <p className='text-xl text-neutral-500 font-bold p-10'>No reviews</p>}
            {reviews.map(review=><div key={review.id} className='border p-3 rounded-lg grid-cols-1 grid md:grid-cols-4 gap-12'>

                <div>{review.rate}</div>
                <div>{review.reviewContent}</div>
                <div>{review.status}</div>
                <div>{review.visibility}</div>
            </div>)}

        </div>
    </div>
  )
}

export default ReviewsFeed