import Heading from '@/components/heading'
import React from 'react'

import prisma from '@/lib/prisma'
import TermForm from './(components)/privacy-form'
import PrivacyForm from './(components)/privacy-form'

type Props = {}

const page = async(props: Props) => {

const privacy = await prisma.privacy.findUnique({
    where:{
        id:'privacy'
    }
})

  return (
    <div>
        <Heading title='Privacy policy' description='Manage privacy policy' />
        <PrivacyForm privacy={privacy} />
  
    </div>
  )
}

export default page