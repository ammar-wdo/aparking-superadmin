import Heading from '@/components/heading'
import React from 'react'
import ReviewsFeed from './(components)/reviews-feed'
import ModalButton from '@/components/modal-button'
import prisma from '@/lib/prisma'

type Props = {}

const page = async(props: Props) => {

  const entities = await prisma.entity.findMany({
    select:{
      id:true,
      entityName:true,
      services:{
        select:{
          id:true,
          name:true
        }
      }
    }
  })
  return (
    <div>
      <div className='flex items-center justify-between'>
      <Heading title='Reviews' description='Read and manage reviews' />
      <ModalButton modalType='review-modal' dataType={{entities}} >Add Review</ModalButton>
      </div>
      
        <div className='separate'>

        <ReviewsFeed />
        </div>
    </div>
  )
}

export default page