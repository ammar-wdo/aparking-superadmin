import prisma from '@/lib/prisma'
import React from 'react'
import FaqCatButton from './faq-cat-button'
import CategoryComponent from '../../blogs/(components)/category-component'

type Props = {}

const FaqCategoryFeed = async(props: Props) => {

    const categoriesFaq = await prisma.categoryFAQ.findMany()
  return (
    <div  className='my-8' >
      <div className='flex items-center justify-between'>
      <h3 className='font-bold capitalize'>
            Add Category
        </h3>
        <FaqCatButton />

      </div>
      

        {!categoriesFaq.length && <p className='font-bold text-neutral-500 text-3xl text-center capitalize my-4'>No categories</p>}
        {categoriesFaq.map((category)=><CategoryComponent key={category.id} category={category} />)}

    </div>
  )
}

export default FaqCategoryFeed