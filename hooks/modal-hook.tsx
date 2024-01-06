import { Category, CategoryFAQ, FAQ } from '@prisma/client'
import { create } from 'zustand'


type modalType ='delete-modal' | 'category-modal' | 'faq-modal' | 'faq-cat-modal'
type dataType ={
    url?:string,
    stay?:boolean
    category?:Category
    faq?:FAQ,
    categoryFaq?:CategoryFAQ,
    categoryFaqArray?:CategoryFAQ[]
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
  setClose:()=>set({open:false})
}))

