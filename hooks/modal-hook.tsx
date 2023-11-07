import { create } from 'zustand'


type modalType ='delete-modal'
type dataType ={
    url?:string
}
type Store = {
  open: boolean
  data:dataType
  type:modalType |''
 setOpen:(type:modalType,data:dataType)=>void,
 setClose:()=>void
}

export const useModal = create<Store>()((set) => ({
  open: false,
  type :'',
  data:{},
  setOpen: (type,data={}) => set({open:true,type,data}),
  setClose:()=>set({open:false})
}))

