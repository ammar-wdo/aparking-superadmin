'use client'

import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/modal-hook'


type Props = {}

const AddButton = (props: Props) => {

    const {setOpen} = useModal()
  return (
    <Button onClick={()=>setOpen('discount-modal')}>Create discount</Button>
  )
}

export default AddButton