import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import React from 'react'
import CategoryButton from './category-button'
import CategoryComponent from './category-component'

type Props = {}

const CategoriesFeed = async(props: Props) => {
const categories = await prisma.category.findMany({orderBy:{createdAt:'desc'}})

  return (
    <div className=' p-4 rounded-lg'>
        <div className='flex items-center justify-between'>
            <h3 className='mt-4 font-semibold'>Categories</h3>
            <CategoryButton />
         
            </div>
        

        <div className='mt-8'>
            {!categories.length && <p className='text-xl text-neutral-500 fonr-bold'>No categories</p>}
            <div className='flex items-center gap-5 flex-wrap '>
            {categories.map((category)=><CategoryComponent key={category.id} category={category} />)}
            </div>
           

        </div>


    </div>
  )
}

export default CategoriesFeed