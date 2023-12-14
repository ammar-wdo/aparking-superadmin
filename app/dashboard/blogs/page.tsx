import Heading from '@/components/heading'
import React from 'react'
import CategoriesFeed from './(components)/categories-feed'
import BlogsFeed from './(components)/blogs-feed'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
              <Heading title='Blogs' description='Manage blogs' />
              <CategoriesFeed />
              <BlogsFeed />
    </div>
  )
}

export default page