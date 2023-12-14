'use client'

import { useEffect, useState } from "react"
import DeleteModal from "../modals/delete-modal"
import CategoryModal from "../modals/category-modal"

type Props = {}

const ModalProvider = (props: Props) => {
    const [mount, setMount]=useState(false)
    useEffect(()=>{
        setMount(true)
    },[])

    if(!mount) return null
  return (
    <>
    <DeleteModal />
    <CategoryModal />
    </>
  )
}

export default ModalProvider