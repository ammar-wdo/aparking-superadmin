'use client'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { useEffect, useState } from "react"

type Props = {title:string,children:React.ReactNode,side: "top" | "right" | "bottom" | "left" | undefined}

const ToolTip = ({children,title,side}: Props) => {

  const [mount, setMount] = useState(false)
  useEffect(()=>{setMount(true)},[])
if(!mount) return null
  return (
<TooltipProvider>
  <Tooltip delayDuration={40}>
    <TooltipTrigger  className="w-auto h-auto">{children}</TooltipTrigger>
    <TooltipContent side={side} sideOffset={8} >
      <p>{title}</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
  )
}

export default ToolTip