import prisma from '@/lib/prisma'
import React from 'react'
import DiscountComponent from './discount-component'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

type Props = {}

const DiscountFeed = async(props: Props) => {

    const discounts = await prisma.discount.findMany()

  return (
    <div className='separate mt-12'>
<h3>Discounts</h3>
<div className='mt-8'>
{!discounts.length && <p className='text-3xl font-bold text-center text-neutral-500 my-6'>No discounts</p>} 

<Table>

  <TableHeader>
    <TableRow>
      <TableHead className="">Code</TableHead>
      <TableHead className="">Label</TableHead>
      <TableHead>Based on</TableHead>
      <TableHead>Type</TableHead>
      <TableHead>Percentage</TableHead>
      <TableHead>value</TableHead>
      <TableHead>Start date</TableHead>
      <TableHead>End date</TableHead>
      <TableHead>Created at</TableHead>
      <TableHead>Actions</TableHead>
   
    </TableRow>
  </TableHeader>
  <TableBody>
  {discounts.map(el=><DiscountComponent key={el.id} discount={el} />)}

  </TableBody>
</Table>


</div>

    </div>
  )
}

export default DiscountFeed