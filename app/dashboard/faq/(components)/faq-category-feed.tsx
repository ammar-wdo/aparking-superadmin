import prisma from '@/lib/prisma'
import React from 'react'
import FaqCatButton from './faq-cat-button'
import CategoryComponent from '../../blogs/(components)/category-component'
import { CategoryFAQ } from '@prisma/client'

type Props = {categoriesFaq:CategoryFAQ[]}

const FaqCategoryFeed = async({categoriesFaq}: Props) => {

 
  return (
    <div  className='my-8 separate' >
      <div className='flex items-center justify-between'>
      <h3 className='font-bold capitalize'>
            Add Category
        </h3>
        <FaqCatButton />

      </div>
      

      <div className='my-4'>
      {!categoriesFaq.length && <p className='font-bold text-neutral-500 text-3xl text-center capitalize my-4'>No categories</p>}
      <div className='flex items-center gap-5 flex-wrap '>
      {categoriesFaq.map((category)=><CategoryComponent faq key={category.id} category={category} />)}
      </div>
     
      </div>

     

    </div>
  )
}

export default FaqCategoryFeed