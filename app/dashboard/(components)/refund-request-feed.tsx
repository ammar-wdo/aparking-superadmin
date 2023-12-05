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
import { cn } from "@/lib/utils"
import { format } from "date-fns"


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



    const styles :{ [key: string]: string }= {
        CANCELED: "text-rose-500 bg-rose-500/20",
        REVERTED: "text-rose-500 bg-rose-500/20",
        EXPIRED: "text-rose-500 bg-rose-500/20",
        ACTIVE: "text-green-500 bg-green-500/20",
        SUCCEEDED: "text-green-500 text-green-500 bg-green-500/20",
        REFUNDED: "text-green-500 text-green-500 bg-green-500/20",
        CREATED: "text-green-500 text-green-500 bg-green-500/20",
        PENDING: "text-yellow-500 text-yellow-500 bg-yellow-500/20",
        UPDATED: "text-green-500 text-green-500 bg-green-500/20",
        UPDATING: "text-yellow-500 text-yellow-500 bg-yellow-500/20",
        REFUND_REQUEST: "text-yellow-500 text-yellow-500 bg-yellow-500/20",
       
      }
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
         <TableRow key={refund.id}>
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
         <TableCell ><span className={cn("p-3 rounded-lg",styles[refund.bookingStatus!])}> {refund.bookingStatus}</span></TableCell>
         <TableCell ><span className={cn("p-3 rounded-lg",styles[refund.paymentStatus!])}>{refund.paymentStatus}</span></TableCell>

       </TableRow>
    ))}
   </TableBody>
  
 </Table>
         {!refundRequests.length && <p className="p-4 text-center w-full">No refund requests</p>}
    </div>
  
  )
}

export default RefundRequestFeed