import prisma from '@/lib/prisma'
import React from 'react'
import NotificationComponent from './notification-component'
import Controller from './controller'
import Scroller from './scroller'

type Props = {list:string}


export const revalidate = 0
const NotificationsFeed = async({list}: Props) => {



    const notifications = await prisma.notification.findMany({
        where:{
            isAdmin:true
        },
        orderBy:{
            createdAt:'desc'
        },
        take:12 * +list 
    })

    const count = await prisma.notification.count({
      where:{
        isAdmin:true
      }
    })

  await prisma.notification.updateMany({
    where:{
      isAdmin:true,
    },
    data:{
      isRead:true
    }
  })

const noNotifications = !notifications.length


const showController = count > 12 * +list

  return (
    <div className='max-w-[800px] mt-5 flex flex-col gap-2'>
        {noNotifications && <p className='mt-10'>No notifications</p>}
        {notifications.map((notification)=><NotificationComponent key={notification.id} notification={notification} />)}
        {showController&&<Controller list={list}/>}
        <Scroller />


    </div>
  )
}

export default NotificationsFeed