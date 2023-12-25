import React from 'react'
import { useAirport } from './airport.hook'
import AirportForm from './(components)/airport-form'
import prisma from '@/lib/prisma'
import Heading from '@/components/heading'



type Props = {params:{airportId:string}}

const page = async({params}: Props) => {
  
const airport = await prisma.airport.findUnique({
  where:{
    id:params.airportId
  }
})

  return (
    <div >
      <Heading title={airport ? `${airport.name} ` : "Airport"} description={airport ? `Manage ${airport.name} ` : "Create new airport"}/>
   
      <AirportForm  airport={airport}/>
     
     
    </div>
  )
}

export default page