'use client'

import Link from "next/link"
import { useParams } from "next/navigation"

type Props = {id:string,children:React.ReactNode}

const NewLink = ({id,children}: Props) => {

    const params = useParams()
  return (
    <Link href={`/dashboard/companies/${params.companyId}/services/${id}`} className="bg-orange-500 block text-white p-2 rounded-sm">{children}</Link>
  )
}

export default NewLink