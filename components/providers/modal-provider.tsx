'use client'

import { useEffect, useState } from "react"
import DeleteModal from "../modals/delete-modal"
import CategoryModal from "../modals/category-modal"
import FaqModal from "../modals/faq-modal"
import FaqCatModal from "../modals/faq-cat-modal"
import DiscountModal from "../modals/discount-modal"

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
    <FaqModal />
    <FaqCatModal />
    <DiscountModal />
    </>
  )
}

export default ModalProvider