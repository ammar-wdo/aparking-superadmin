'use client'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { LayoutDashboard, Menu } from "lucide-react"


  import React from 'react'
import MainLinks from "./main-links"
import Link from "next/link"
  
  type Props = {}
  
  const MainSheet = (props: Props) => {
    return (
        <Sheet  >
        <SheetTrigger  className="lg:hidden fixed top-4 right-4"><Menu /></SheetTrigger>
        <SheetContent  side={'left'} className="bg-background p-0 flex flex-col ">
        <div className='p-6 border-b'>
        <h3 className='text-center text-foreground font-bold'>Super admin</h3>
      </div>
          <MainLinks />
        </SheetContent>
      </Sheet>
    )
  }
  
  export default MainSheet