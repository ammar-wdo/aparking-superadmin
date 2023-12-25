'use client'

import React, { useEffect, useRef } from 'react'
import { useBlog } from '../blog.hook'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Blog, Category } from '@prisma/client'
import { Select, SelectItem, SelectTrigger, SelectValue,SelectContent } from '@/components/ui/select'
import { SingleImageDropzone } from '@/components/single-image-drop-zone'
import dynamic from "next/dynamic";
import { Loader } from 'lucide-react'
import { useModal } from '@/hooks/modal-hook'
import { Textarea } from '@/components/ui/textarea'

const Editor = dynamic(() => import("../../../../../components/editor"), { ssr: false })


type Props = {categories:Category[]
blog?:Blog | null
}

const BlogForm = ({categories,blog}: Props) => {

    const {form,onSubmit,file,setFile,uploadImage,ImagePlaceholder,handleTagAdd,Mytags} = useBlog(blog)
    const tagRef = useRef<HTMLInputElement | null>(null);

    useEffect(()=>{
        const handleEnterPress = (e:KeyboardEvent)=>{
    
      if(e.key==='Enter'){
        e.preventDefault()
        handleTagAdd(tagRef)
      
      }
      }
    
      document.addEventListener('keydown',handleEnterPress)
    
      return ()=>document.removeEventListener('keydown',handleEnterPress)
    
      },[])

      const isLoading = form.formState.isSubmitting

      const {setOpen} = useModal()

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className='grid grid-cols-1 md:grid-cols-2 max-w-[1200px] w-full gap-10 border p-8 rounded-lg bg-background  shadow-md'>
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                {categories.map((category)=>  <SelectItem className='cursor-pointer capitalize font-semibold text-neutral-600' key={category.id} value={category.id}>{category.label}</SelectItem>)}
                </SelectContent>
              </Select>
            
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title*</FormLabel>
            <FormControl>
              <Input placeholder="Blog title" {...field} />
            </FormControl>
           
            <FormMessage />
          </FormItem>
        )}
      />
      
         
         
              <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <div className="space-y-3">
                    <div className="flex items-center gap-5">
                      <Input ref={tagRef} />
                      <Button className='flex-shrink-0' onClick={()=>handleTagAdd(tagRef)} type="button">
                        Add Tag
                      </Button>
                    </div>
                    {<Mytags />}
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
             <FormField
        control={form.control}
        name="slug"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Slug*</FormLabel>
            <FormControl>
              <Input placeholder="Blog slug" {...field} />
            </FormControl>
           
            <FormMessage />
          </FormItem>
        )}
      />
             <FormField
        control={form.control}
        name="author"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Author*</FormLabel>
            <FormControl>
              <Input placeholder="Author" {...field} />
            </FormControl>
           
            <FormMessage />
          </FormItem>
        )}
      />
             <FormField
        control={form.control}
        name="shortDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Short description*</FormLabel>
            <FormControl>
              <Textarea className='resize-none' placeholder="Add short description" {...field} />
            </FormControl>
           
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
            control={form.control}
            name="featuredImage"
            render={({ field }) => (
              <div className="flex gap-4 items-center">
                <FormItem>
                  <FormLabel>Featured image*</FormLabel>
                  <FormControl>
                    <SingleImageDropzone
                      width={200}
                      height={200}
                      value={file}
                      onChange={(file) => {
                        setFile(file);
                      }}
                    />
                  </FormControl>
                  <Button
                  disabled={!file || !!form.watch('featuredImage')}
                    type="button"
                    onClick={uploadImage}
             
                  >
                    Upload
                  </Button>

                  <FormMessage />
                </FormItem>

                {<ImagePlaceholder />}
              </div>
            )}
          />

        </div>
        <div className='max-w-[1200px] bg-background p-4 shadow-md rounded-lg'>
        <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className='p-3  '>
                <FormLabel>Blog content</FormLabel>
                <FormControl>
                <Editor  onChange={(string)=>{form.setValue('content',string)}} initialContent={form.getValues('content')} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      
      <div className='mt-12 flex items-center gap-4'>
      <Button disabled={isLoading} type="submit">{blog ? 'Edit' : 'Create'}{isLoading && <Loader className="ml-3 w-4 h-4 animate-spin"  />}</Button>
      {blog && <Button type='button' onClick={()=>setOpen('delete-modal',{url:`/api/blogs/${blog.id}`})} variant={'destructive'}>Delete</Button>}
      </div>
      
    </form>
  </Form>
  )
}

export default BlogForm



