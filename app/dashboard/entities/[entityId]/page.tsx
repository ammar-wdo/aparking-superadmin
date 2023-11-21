import Heading from '@/components/heading'
import React from 'react'
import EntityForm from './(components)/entitiyForm'
import prisma from '@/lib/prisma'

type Props = {
  params:{entityId:string}
}

const page = async({params}: Props) => {

  const airports = await prisma.airport.findMany({
    select:{
      id:true,
      name:true
    }
  })

  const companies = await prisma.company.findMany({
    select:{
      id:true,
      name:true

    
    }
  })

const entity = await prisma.entity.findUnique({
  where:{
    id:params.entityId
  }
})
  return (
    <div>
    <Heading title={entity?.entityName! || "Create entity"} description={'Manage ' + (entity?.entityName || "entities")} />
    <EntityForm entity={entity}  companies={companies} airports={airports}/>
  
  
</div>
  )
}

export default page