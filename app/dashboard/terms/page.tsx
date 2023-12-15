import Heading from '@/components/heading'
import React from 'react'

import prisma from '@/lib/prisma'
import TermForm from './(components)/term-form'

type Props = {}

const page = async(props: Props) => {

const term = await prisma.term.findUnique({
    where:{
        id:'term'
    }
})

  return (
    <div>
        <Heading title='Terms & conditions' description='Manage terms and conditions' />
        <TermForm term={term} />
  
    </div>
  )
}

export default page