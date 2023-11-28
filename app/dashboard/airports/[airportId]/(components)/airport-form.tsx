'use client'

import React from 'react'
import { useAirport } from '../airport.hook'
import { Airport } from '@prisma/client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import { useModal } from '@/hooks/modal-hook'
import { useParams } from 'next/navigation'

type Props = {airport:Airport | null}

const AirportForm = ({airport}: Props) => {

    const {form,onSubmit} = useAirport({airport})

    const isLoading = form.formState.isSubmitting

    const {setOpen} = useModal()
    const params = useParams()
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-[700px]">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Airport name" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex items-center gap-4'>
        <Button disabled={isLoading} type="submit">{airport ? "Update" : "Create"} {isLoading && <Loader className='ml-3 h-3 w-3 animate-spin' />}</Button>
        {airport && <Button type='button' onClick={()=>setOpen('delete-modal',{url:`/api/airport/${params.airportId}`})} variant={'destructive'}>Delete</Button>}
        </div>
       
      </form>
    </Form>
  )
  
}

export default AirportForm