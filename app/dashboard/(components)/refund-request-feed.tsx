import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import prisma from "@/lib/prisma"
import { format } from "util"

type Props = {}

const RefundRequestFeed = async(props: Props) => {


    const refundRequests = await prisma.booking.findMany({
        where:{
            bookingStatus:'REFUND_REQUEST',
            
        },
        include:{
            service:{
        select:{name:true,parkingType:true}
            }
        }
    })
  return (
    <div>
<h3 className="text-xl font-bold my-8">Refund requests</h3>
<Table>
   
   <TableHeader>
     <TableRow>
       <TableHead className="">Booking code</TableHead>
       <TableHead>E-mail</TableHead>
       <TableHead>Parking provider</TableHead>
       <TableHead className="t">parking type</TableHead>
       <TableHead className="t">Name</TableHead>
       <TableHead className="t">Booking date</TableHead>
       <TableHead className="t">Arrival date</TableHead>
       <TableHead className="t">Departure date</TableHead>
       <TableHead className="t">Payment method</TableHead>
       <TableHead className="t">Total</TableHead>
       <TableHead className="t">Booking status</TableHead>
       <TableHead className="t">Payment status</TableHead>
     </TableRow>
   </TableHeader>
   <TableBody>
      
    {refundRequests.map((refund)=>(
         <TableRow>
         <TableCell className="">{refund.bookingCode}</TableCell>
         <TableCell>{refund.email}</TableCell>
         <TableCell>{refund.service.name}</TableCell>
         <TableCell className="">{refund.service.parkingType}</TableCell>
         <TableCell className="">{refund.firstName} {refund.lastName}</TableCell>
         <TableCell>{format(refund.createdAt,'dd-MM-yyyy')}</TableCell>
         <TableCell>{format(refund.arrivalDate,'dd-MM-yyyy')}</TableCell>
         <TableCell>{format(refund.departureDate,'dd-MM-yyyy')}</TableCell>
         <TableCell>{refund.paymentMethod}</TableCell>
         <TableCell>€{refund.total}</TableCell>
         <TableCell>{refund.bookingStatus}</TableCell>
         <TableCell>{refund.paymentStatus}</TableCell>

       </TableRow>
    ))}
   </TableBody>
  
 </Table>
         {!refundRequests.length && <p className="p-4 text-center w-full">No refund requests</p>}
    </div>
  
  )
}

export default RefundRequestFeed