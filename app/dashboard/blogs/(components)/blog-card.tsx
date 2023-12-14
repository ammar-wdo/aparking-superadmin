import { Button } from '@/components/ui/button'
import { Blog } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {blog:Blog & {category:{label:string}}}

const BlogCard = ({blog}: Props) => {
  return (
    <div className='p-3 flex flex-col gap-3 border rounded-lg'>
        <div className='w-full aspect-video relative'>
            <Image src={blog.featuredImage} alt='blog-image' fill className='object-cover rounded-lg' />

        </div>
        <p className='capitalize font-bold text-lg text-neutral-700'>{blog.title}</p>
        <p className='text-xs text-neutral-500 line-clamp-3 first-letter:capitalize'>{blog.shortDescription}</p>
        <div className='flex items-center flex-wrap gap-1'>
            {blog.tags.map((tag)=><span key={tag} className='p-1 border rounded-md px-3 text-neutral-500 text-xs '>{tag}</span>)}
        </div>
        <div className='flex items-center justify-between mt-5'>
        <p className=' font-semibold capitalize'>{blog.author}</p>
        <span className='text-sm text-black first-letter:capitalize p-1 px-3 rounded-md bg-slate-100 '>{blog.category.label}</span>
        </div>

       

        <Button asChild variant={'secondary'} className='w-full'><Link href={`/dashboard/blogs/${blog.id}`}>Edit</Link></Button>

    </div>
  )
}

export default BlogCard