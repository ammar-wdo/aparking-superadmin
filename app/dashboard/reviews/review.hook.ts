import { addReview, editReview } from "@/actions/reviews-action"
import { useModal } from "@/hooks/modal-hook"
import { reviewSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

export const useReview = ()=>{



    const {data,setClose} = useModal()

    const review =data.review
    const router = useRouter()

    const entities = data.entities
    const form = useForm<z.infer<typeof reviewSchema>>({

        resolver: zodResolver(reviewSchema),
        defaultValues: {
          entityId: review?.entityId || "",
          serviceId:review?.serviceId || '',
          firstName:review?.firstName ||'',
          lastName:review?.lastName || '',
          email:review?.email || '',
          rate:String(review?.rate) || '0',
          visibility:review?.visibility || 'ANOUNYMOS',
          placeHolderDate:review?.placeHolderDate || undefined,
          status:review?.status || 'PENDING',
          reviewContent:''
        },
      })
     
      // 2. Define a submit handler.
     async  function onSubmit(values: z.infer<typeof reviewSchema>) {
     try {
let res
        if(review){
res = await editReview(review.id,values)
        }else{
res = await addReview(values)
        }

        if(!res.success){
            console.log(res.error)
            toast.error(res.error)
        }else{
            toast.success(res.message)
            router.refresh()
            setClose()
        }


     
     } catch (error) {
        console.log(error)
        toast.error('Something went wrog')
     }
      }

      return {form, onSubmit,entities,review}
}