'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../components/ui/form'
import { Input } from '../../../../components/ui/input'
import { Button } from '../../../../components/ui/button'
import { useFaqCat } from './faq-cat-hook'
import { useModal } from '@/hooks/modal-hook'
import { Loader } from 'lucide-react'

type Props = {}

const FaqCatForm = (props: Props) => {

    const {form,onSubmit} = useFaqCat()

    const isLoading = form.formState.isSubmitting

    const {data:{categoryFaq}} = useModal()
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
      <Button disabled={isLoading} className="ml-auto" type="submit">{categoryFaq ? "Edit" :"Submit"} {isLoading && <Loader className="ml-3 h-4 -w4 animate-spin" />}</Button>
      </div>
      
    </form>
  </Form>
  )
}

export default FaqCatForm