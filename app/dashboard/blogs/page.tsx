import Heading from '@/components/heading'
import React from 'react'
import CategoriesFeed from './(components)/categories-feed'
import BlogsFeed from './(components)/blogs-feed'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
              <Heading title='Blogs' description='Manage blogs' />
              <div className='bg-background p-4 shadow-md rounded-md'>

              <CategoriesFeed />
              </div>

              <div className='bg-background p-4 shadow-md mt-8 rounded-md'>

              <BlogsFeed />
              </div>
    </div>
  )
}

export default page