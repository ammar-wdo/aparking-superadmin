import Heading from '@/components/heading'
import React from 'react'
import AboutForm from './(components)/about-form'
import prisma from '@/lib/prisma'

type Props = {}

const page = async(props: Props) => {

const about = await prisma.about.findUnique({
    where:{
        id:'about'
    }
})

  return (
    <div>
        <Heading title='about us' description='About us content' />
        <div className='separate'>

        <AboutForm about={about} />
        </div>
    </div>
  )
}

export default page