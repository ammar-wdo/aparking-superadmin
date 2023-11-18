import React from 'react'
import MainAside from './(components)/aside-bar'
import MainSheet from './(components)/main-sheet'
import { EdgeStoreProvider } from '../../lib/edgestore';

type Props = {
    children:React.ReactNode
}

const layout = ({children}: Props) => {
  return (
    <div>
    <MainAside />
   <main className='lg:pl-[270px] '>
<MainSheet />
  <div className=' p-8 xl:p-20'>
    <EdgeStoreProvider>
    {children}
      </EdgeStoreProvider></div> 
  </main>
   </div>
  )
}

export default layout