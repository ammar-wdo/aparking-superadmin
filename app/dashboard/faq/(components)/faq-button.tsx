'use client'

import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/modal-hook'
import React from 'react'

type Props = {}

const FaqButton = (props: Props) => {

    const {setOpen} = useModal()
  return (
    <Button onClick={()=>setOpen('faq-modal')}>Add a question</Button>
  )
}

export default FaqButton