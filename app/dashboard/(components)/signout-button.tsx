'use client'

import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'


type Props = {}

const SinoutButton = (props: Props) => {
    const router = useRouter()
const signout = async()=>{
   await signOut()
   router.refresh()


}

  return (
    <Button onClick={signout}>Signout</Button>
  )
}

export default SinoutButton