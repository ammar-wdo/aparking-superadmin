'use client'

import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/modal-hook'
import React from 'react'

type Props = {}

const FaqCatButton = (props: Props) => {

    const {setOpen} = useModal()
  return (
    <Button  onClick={()=>setOpen('faq-cat-modal')} >Add category</Button>
  )
}

export default FaqCatButton