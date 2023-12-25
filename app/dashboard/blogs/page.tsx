import Heading from '@/components/heading'
import React from 'react'
import CategoriesFeed from './(components)/categories-feed'
import BlogsFeed from './(components)/blogs-feed'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
              <Heading title='Blogs' description='Manage blogs' />
              <div className='separate'>

              <CategoriesFeed />
              </div>

              <div className='separate mt-8'>

              <BlogsFeed />
              </div>
    </div>
  )
}

export default page