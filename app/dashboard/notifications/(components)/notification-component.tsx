import { cn } from '@/lib/utils'
import { Notification } from '@prisma/client'
import {format} from 'date-fns'
import { CheckCheck } from 'lucide-react'
import Link from 'next/link'

type Props = {
    notification:Notification
}

const NotificationComponent = ({notification}: Props) => {


    const formattedDate = format(new Date(notification.createdAt), 'EEE, MMM/d, HH:mm')
    const url = notification.type==='SERVICE'? `/dashboard/services/${notification.IdHolder}` :''

    const themes :{[key:string ] :string } =  {
        
      APPROVE: 'bg-green-500/20 text-green-500 border border-green-500',
      REQUEST: 'bg-yellow-500/20 text-yellow-500 border border-yellow-500',
      DELETE: 'bg-rose-500/20 text-rose-500 border border-rose-500',
  }

  return (
    <div className={cn("rounded-lg p-6  relative flex gap-4 items-center ",themes[notification.status!],notification.isRead && 'opacity-60')}>
    {!notification.isRead ? <span className="top-1  right-1 absolute   text-xs">New</span> : <span className="top-1  right-1 absolute  text-xs"><CheckCheck className="h-4 w-4" /></span>}
        <p className='text-sm '>{notification.message}</p>
     
       
        <Link href={url} className='hover:underline text-blue-500 text-sm'>Check</Link>
       
        <p className='text-xs text-neutral-500 pt-3 absolute bottom-2 right-3'>{formattedDate}</p>
    
    
    

    </div>
  )
}

export default NotificationComponent