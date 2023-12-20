import prisma from '@/lib/prisma'
import PendingOptionsTable from './pending-options-table'


type Props = {}

const PendingOptionsFeed = async(props: Props) => {

    const pendingOptions = await prisma.exraOption.findMany({
        where:{
            isActive:false
        },
        orderBy:{
            createdAt:'desc'
        }
    })
  return (
    <div className='mt-32'>
        <h3 className="text-xl font-bold my-8">Refund requests</h3>
        <PendingOptionsTable extraOptions={pendingOptions} />
        {!pendingOptions.length && <p className='p-4 text-center font-bold text-2xl text-neutral-500 mt-12'>No pending requests for extra options</p>}
       
    </div>
  )
}

export default PendingOptionsFeed