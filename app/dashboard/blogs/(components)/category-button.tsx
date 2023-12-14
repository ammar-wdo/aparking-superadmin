'use client'

import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/modal-hook'
import React from 'react'

type Props = {}

const CategoryButton = (props: Props) => {

    const {setOpen} = useModal()
  return (
    <Button  onClick={()=>setOpen('category-modal')} >Add category</Button>
  )
}

export default CategoryButton