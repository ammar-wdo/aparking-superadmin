'use client'

import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/modal-hook'
import { CategoryFAQ } from '@prisma/client'
import React from 'react'

type Props = {categoriesFaq:CategoryFAQ[]}

const FaqButton = ({categoriesFaq}: Props) => {

    const {setOpen} = useModal()
  return (
    <Button onClick={()=>setOpen('faq-modal',{categoryFaqArray:categoriesFaq})}>Add a question</Button>
  )
}

export default FaqButton