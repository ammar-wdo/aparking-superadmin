'use client'

import React from 'react'
import { useAirport } from '../airport.hook'
import { Airport } from '@prisma/client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader, XIcon } from 'lucide-react'
import { useModal } from '@/hooks/modal-hook'
import { useParams } from 'next/navigation'
import { SingleImageDropzone } from '@/components/single-image-drop-zone'
import dynamic from "next/dynamic";
import Image from 'next/image'
import {v4 as uuidv4 } from 'uuid';

const Editor = dynamic(() => import("../../../../../components/editor"), { ssr: false })

type Props = {airport:Airport | null}

const AirportForm = ({airport}: Props) => {

    const {form,onSubmit,imagesFile,setImagesFile,uploadImages,ImagesPlaceholder,deleteImagesLoader,imagesLoader,deleteanImage} = useAirport({airport})

    const isLoading = form.formState.isSubmitting

    const {setOpen} = useModal()
    const params = useParams()
   
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1200px] mt-20 separate'>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Airport name" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="Slug" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add images</FormLabel>
                <div className="flex items-center gap-3 w-full flex-wrap">
                  <FormControl>
                    <SingleImageDropzone
                      width={200}
                      height={200}
                      value={imagesFile}
                      onChange={(imagesFile) => {
                        setImagesFile(imagesFile);
                      }}
                    />
                  </FormControl>
                  <Button
                  disabled={!imagesFile}
                    type="button"
                    onClick={uploadImages}
                   
                  >
                    Upload
                  </Button>
                 <ImagesPlaceholder />
                  {/* <div className="flex items-center gap-3 w-full ">
        {!!form.watch("images")?.length && (
          <div className="flex items-center gap-3 flex-wrap w-full">
            {form.getValues("images")?.map((image:string) => (
              <div
                key={uuidv4()}
                className="w-[100px] h-[100px] overflow-hidden  relative"
              >
                {deleteImagesLoader === image ? (
                  <div className="flex items-center justify-center w-full h-full ">
                    <Loader className="w-5 h-5 animate-spin" />
                  </div>
                ) : (
                  <Image
                    alt="added logo"
                    src={image}
                    fill
                    className="object-cover rounded-lg"
                  />
                )}
  
                <XIcon
                  className="absolute top-1 right-1 cursor-pointer text-white bg-rose-400 p-1 rounded-md"
                  onClick={() => {
                    deleteanImage(image);
                  }}
                />
              
              </div>
            ))}
              {imagesLoader &&  <div
             
             className="w-[100px] h-[100px] overflow-hidden flex items-center justify-center  relative"
           >  <Loader className="w-5 h-5 animate-spin" /></div>}
          </div>
        )}
        
     </div>  */}
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

        </div>
    
<FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className='  w-full px-4  mt-20 separate'>
              <FormLabel>Content</FormLabel>
              <FormControl>
          <Editor  onChange={(string)=>{form.setValue('content',string)}} initialContent={form.getValues('content')} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex items-center gap-4 mt-4'>
        <Button disabled={isLoading} type="submit">{airport ? "Update" : "Create"} {isLoading && <Loader className='ml-3 h-3 w-3 animate-spin' />}</Button>
        {airport && <Button type='button' onClick={()=>setOpen('delete-modal',{url:`/api/airport/${params.airportId}`})} variant={'destructive'}>Delete</Button>}
        </div>
       
      </form>
    </Form>
  )
  
}

export default AirportForm