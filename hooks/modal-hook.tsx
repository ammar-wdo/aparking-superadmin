import { Category } from '@prisma/client'
import { create } from 'zustand'


type modalType ='delete-modal' | 'category-modal'
type dataType ={
    url?:string,
    stay?:boolean
    category?:Category
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

