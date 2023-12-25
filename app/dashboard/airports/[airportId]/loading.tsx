
import { Skeleton } from '@/components/ui/skeleton'


type Props = {}

const loading = (props: Props) => {
  return (
    <div className=''>
       <div className='space-y-2 mb-6'>
        <Skeleton className='text-3xl first-letter:uppercase font-bold p-2 w-[100px]' />
        <Skeleton className='text-sm text-muted-foreground p-3 w-[400px]'/>
    </div>
    <Skeleton className='w-full min-h-[700px] mt-20 max-w-[1200px] ' /> 
    <Skeleton className='w-full min-h-[100px] mt-20  ' /> 
  
  
</div>
  )
}

export default loading