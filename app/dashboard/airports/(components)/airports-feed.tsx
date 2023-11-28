import prisma from '@/lib/prisma'
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

const AirportsFeed = async(props: Props) => {

    const airports = await prisma.airport.findMany()
  return (
    <Table>
  
    <TableHeader>
      <TableRow>
        <TableHead >Name</TableHead>
        <TableHead >Actions</TableHead>
      
 
      </TableRow>
    </TableHeader>
    <TableBody>
        {airports.map((airport)=><TableRow key={airport.id}>
        <TableCell className="capitalize">{airport.name}</TableCell>
        <TableCell className="capitalize"><Button size={'icon'} asChild><Link href={`/dashboard/airports/${airport.id}`}><Edit className='w-3 h-3'/></Link></Button></TableCell>
       
      </TableRow>)}
      
    </TableBody>
  </Table>
  )
}

export default AirportsFeed