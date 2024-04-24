'use client'

import { dataType, modalType, useModal } from "@/hooks/modal-hook"
import { Button } from "./ui/button"
import React, { ButtonHTMLAttributes, Children, ReactNode } from "react"

type Props = {
modalType:modalType,
dataType:dataType,
children:ReactNode
className?:string
} 

const ModalButton = ({modalType,dataType,children,className}: Props) => {

    const {setOpen} = useModal()
  return (
    <Button
    className={className}
    onClick={()=>setOpen(modalType,dataType)}
    >{children}</Button>
  )
}

export default ModalButton