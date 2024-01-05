'use client'

import React from 'react'
import { useFaq } from '../faq.hook'
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
import { Textarea } from '@/components/ui/textarea'
import { Loader } from 'lucide-react'
import { useModal } from '@/hooks/modal-hook'
import dynamic from "next/dynamic"
const Editor = dynamic(() => import("@/components/editor"), { ssr: false })

type Props = {
  
}

const FaqForm = ({}: Props) => {

    const {form,onSubmit} = useFaq()

    const isLoading = form.formState.isSubmitting

    const {data:{faq}} = useModal()
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-4">
      <FormField
        control={form.control}
        name="question"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Question</FormLabel>
            <FormControl>
              <Input placeholder="Add a question" {...field} />
            </FormControl>
          
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="answer"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Answer</FormLabel>
            <FormControl>
            <Editor  onChange={(string)=>{form.setValue('answer',string)}} initialContent={form.getValues('answer')} />
            </FormControl>
          
            <FormMessage />
          </FormItem>
        )}
      />
      <Button disabled={isLoading} type="submit">{faq ? 'Edit' :'Submit' } {isLoading && <Loader className='ml-3 w-4 h-4 animate-spin' />}</Button>
    </form>
  </Form>
  )
}

export default FaqForm