import { Category, CategoryFAQ, Discount, FAQ, Review } from '@prisma/client'
import { create } from 'zustand'


export type modalType ='delete-modal' | 'category-modal' | 'faq-modal' | 'faq-cat-modal' |'discount-modal' | 'review-modal'
export type dataType ={
    url?:string,
    stay?:boolean
    category?:Category
    discount?:Discount
    faq?:FAQ,
    categoryFaq?:CategoryFAQ,
    categoryFaqArray?:CategoryFAQ[],
    review?:Review,
    entities?:{id:string,entityName:string,services:{id:string,name:string}[]}[],
    deleteFn?:()=>Promise<{success:boolean,message?:string,error?:string}>
}
type Store = {
  open: boolean
  data:dataType
  type:modalType |''
 setOpen:(type:modalType,data?:dataType)=>void,
 setClose:()=>void
}

export const useModal = create<Store>()((set) => ({
  open: false,
  type :'',
  data:{},
  setOpen: (type,data={}) => set({open:true,type,data}),
  setClose:()=>set({open:false,data:{}})
}))

