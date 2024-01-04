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
    <div className=''>
        <h3 className="text-xl font-bold my-8 first-letter:capitalize">extra options pending requests</h3>
        <PendingOptionsTable extraOptions={pendingOptions} />
        {!pendingOptions.length && <p className="p-4 text-center w-full">No pending requests for extra options</p>}
       
    </div>
  )
}

export default PendingOptionsFeed