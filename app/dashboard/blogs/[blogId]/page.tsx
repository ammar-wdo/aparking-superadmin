import Heading from '@/components/heading'
import React from 'react'
import BlogForm from './(components)/blog-form'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

type Props = {
  params:{blogId:string}
}

const page = async({params}: Props) => {
  const categories = await prisma.category.findMany({orderBy:{createdAt:'desc'}})

  const blog = await prisma.blog.findUnique({
    where:{id:params.blogId}
  })

  if(params.blogId !=='new' && !blog) return redirect('/')


  return (
    <div>
        <Heading title='Blog' description={params.blogId ==='new' ? 'Add new blog' : 'Edit blog'} />
        <div>
          <BlogForm categories={categories} blog={blog}/>
        </div>
    </div>
  )
}

export default page