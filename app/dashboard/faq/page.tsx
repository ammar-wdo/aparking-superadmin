import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import React from 'react'
import FaqButton from './(components)/faq-button'
import prisma from '@/lib/prisma'
import FaqComponent from './(components)/faq-component'

type Props = {}

const page = async(props: Props) => {

    const faqs = await prisma.fAQ.findMany({orderBy:{createdAt:'desc'}})
  return (
    <div> 
        <div className='flex items-center justify-between'>
        <Heading title='FAQ' description='FAQ content' />
      <FaqButton />
        </div>

        <div className='mt-12'>
            {!faqs.length && <p className='text-3xl font-bold text-muted-foreground'>No FAQs</p>}

            <div className='flex items-stretch gap-8 flex-wrap'>
                {faqs.map((faq)=><FaqComponent key={faq.id} faq={faq} />)}
            </div>
        </div>
 
    </div>
  )
}

export default page