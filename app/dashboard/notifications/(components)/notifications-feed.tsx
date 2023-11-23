import prisma from '@/lib/prisma'
import React from 'react'
import NotificationComponent from './notification-component'

type Props = {}


export const revalidate = 0
const NotificationsFeed = async(props: Props) => {



    const notifications = await prisma.notification.findMany({
        where:{
            isAdmin:true
        },
        orderBy:{
            createdAt:'desc'
        }
    })

const noNotifications = !notifications.length

  return (
    <div className='max-w-[800px] mt-10 flex flex-col gap-4'>
        {noNotifications && <p className='mt-10'>No notifications</p>}
        {notifications.map((notification)=><NotificationComponent key={notification.id} notification={notification} />)}


    </div>
  )
}

export default NotificationsFeed