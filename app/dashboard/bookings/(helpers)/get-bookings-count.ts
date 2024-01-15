
import prisma from "@/lib/prisma";




export const getBookingsAndCount = async (ITEMS_PER_PAGE:number,page:string | string[] | undefined,bookingCode?:string | undefined)=>{




    let bookingsCount
    let bookings


      bookingsCount = await prisma.booking.count();

 
      bookings = await prisma.booking.findMany({
        where: {
      
          ...(bookingCode && {bookingCode})
        },
        include: {
          service: true,
        },
        take: ITEMS_PER_PAGE,
        skip: ITEMS_PER_PAGE * (+page! -1),
        orderBy:{
          createdAt:'desc'
        }
      });

    


    return {bookingsCount,bookings}
}