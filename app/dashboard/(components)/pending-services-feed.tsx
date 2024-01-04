import prisma from '@/lib/prisma'
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Edit } from 'lucide-react'

type Props = {}

const PendingServicesFeed =async (props: Props) => {

    const pendingServices = await prisma.service.findMany({
        where:{
            isActive:false
        },
        orderBy:{
            createdAt:'desc'
        }
    })
  return (
    <div className=''>
        <h3 className="text-xl font-bold my-8 first-letter:capitalize">services pending requests</h3>

        <Table>

  <TableHeader>
    <TableRow>
    
      <TableHead>Name</TableHead>
      <TableHead>Address</TableHead>
      <TableHead>Country</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Actions</TableHead>
  
    </TableRow>
  </TableHeader>
  <TableBody>
    {pendingServices.map(service=>
         <TableRow key={service.id}>
    
         <TableCell className='capitalize'>{service.name}</TableCell>
         <TableCell className='capitalize'>{service.parkingAddress}</TableCell>
         <TableCell className='capitalize'>{service.parkingCountry}</TableCell>
         <TableCell className='capitalize'><span className='py-1 px-3 rounded-full bg-yellow-500/20 text-yellow-500'>Pending</span></TableCell>
         <TableCell><Button size={'icon'} asChild><Link href={`/dashboard/services/${service.id}`}><Edit className='w-3 h-3' /></Link></Button></TableCell>
      
       </TableRow>)}
   

  </TableBody>
  
</Table>
{!pendingServices.length && <p className="p-4 text-center w-full">No pending services</p>}
      
     
       
    </div>
  )
}

export default PendingServicesFeed