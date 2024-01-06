import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import React from 'react'
import FaqButton from './(components)/faq-button'
import prisma from '@/lib/prisma'
import FaqComponent from './(components)/faq-component'
import FaqCategoryFeed from './(components)/faq-category-feed'

type Props = {}

const page = async(props: Props) => {
  const categoriesFaq = await prisma.categoryFAQ.findMany()

    const faqs = await prisma.fAQ.findMany({orderBy:{createdAt:'desc'},include:{categoryFaq:{select:{label:true}}}})
  return (
    <div> 
        <div className='flex items-center justify-between'>
        <Heading title='FAQ' description='FAQ content' />
    
        </div>

        <FaqCategoryFeed categoriesFaq={categoriesFaq} />

        <div className='mt-12  separate'>
       

            <div className='flex items-center justify-between '>
              <h3 className='text-lg font-semibold'>FAQ elements</h3>

            <FaqButton categoriesFaq={categoriesFaq} />
            </div>
            {!faqs.length && <p className='text-3xl font-bold text-muted-foreground mt-8'>No FAQs</p>}
            <div className='grid lg:grid-cols-5 md:grid-cols-4 grid-cols-1 gap-2 mt-8'>
                {faqs.map((faq)=><div key={faq.id} className='p-5 border  rounded-lg'><FaqComponent categoriesFaq={categoriesFaq}  faq={faq} /></div>)}
            </div>
        </div>
 
    </div>
  )
}

export default page