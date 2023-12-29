import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import React from 'react'
import BlogCard from './blog-card'

type Props = {}

const BlogsFeed = async(props: Props) => {

    const blogs = await prisma.blog.findMany({orderBy:{createdAt:'desc'},include:{category:{select:{label:true}}}})
  return (
    <div className=' p-4'>
        <div className='flex items-center justify-between'>
        <h3 className='font-semibold'>Blogs section</h3>
        <Button asChild><Link href={'/dashboard/blogs/new'}>Add blog</Link></Button>
        </div>
   
        <div className='mt-4'>
            {!blogs.length && <p className='text-xl text-neutral-500 fonr-bold'>No blogs</p>}
            <div className='flex flex-wrap  gap-4'>
                {blogs.map((blog)=><BlogCard blog={blog} key={blog.id} />)}

            </div>
        </div>
    </div>
  )
}

export default BlogsFeed