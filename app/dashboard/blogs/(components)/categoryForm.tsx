'use client'

import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../components/ui/form'
import { Input } from '../../../../components/ui/input'
import { Button } from '../../../../components/ui/button'
import { useCategory } from '@/app/dashboard/blogs/category.hook'
import { Loader } from 'lucide-react'
import { useModal } from '@/hooks/modal-hook'

type Props = {}

const CategoryForm = (props: Props) => {
    const {onSubmit,form} = useCategory()


const {data:{category}} = useModal()
    
    const isLoading = form.formState.isSubmitting

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-6">
      <FormField
        control={form.control}
        name="label"
        
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category name</FormLabel>
            <FormControl>
              <Input autoComplete="off" placeholder="Category name" {...field} />
            </FormControl>
       
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex">
      <Button disabled={isLoading} className="ml-auto" type="submit">{category ? "Edit" :"Submit"} {isLoading && <Loader className="ml-3 h-4 -w4 animate-spin" />}</Button>
      </div>
      
    </form>
  </Form>
  )
}

export default CategoryForm