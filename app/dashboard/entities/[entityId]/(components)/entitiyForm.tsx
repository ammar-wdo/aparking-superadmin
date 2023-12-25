"use client";

import React, { useEffect, useRef } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import "react-phone-input-2/lib/style.css";
import { Company, Entity, ParkingType, Service } from "@prisma/client";
import { Loader, XIcon } from "lucide-react";


import { useParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { useEntity } from "../entity.hook";
import PhoneInput from "react-phone-input-2";
import { useModal } from "@/hooks/modal-hook";
import { SingleImageDropzone } from "@/components/single-image-drop-zone";
import { Textarea } from "@/components/ui/textarea";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../../../../../components/editor"), { ssr: false })

type Props = { entity: Entity | null ,airports:{id:string,name:string}[],companies:{id:string,name:string | null}[]};

const EntityForm = ({ entity,airports,companies }: Props) => {
  // useEffect(()=>{
  //   const handleEnterPress = (e:KeyboardEvent)=>{

  // if(e.key==='Enter'){
  //   e.preventDefault()
  //   handleFacilityAdd(facilityRef,form)
  // }
  // }

  // document.addEventListener('keydown',handleEnterPress)

  // return ()=>document.removeEventListener('keydown',handleEnterPress)

  // },[])

  // const facilityRef = useRef<HTMLInputElement | null>(null);

  //set the logo function

  const {
    onSubmit,

    form,
    imagesFile,setImagesFile,uploadImages,ImagesPlaceholder
  } = useEntity({ entity });

  const isLoading = form.formState.isSubmitting;

  const params = useParams();

  const {setOpen} =useModal()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="  max-w-[1200px] ">
        <div className="space-y-12 pt-8">
          <div className="p-8 border separate">
            <h3 className="font-bold mb-8 text-xl">Entity details</h3>
            <div className="grid grid-cols-2 gap-3 ">
        <FormField
                control={form.control}
                name="airportId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Choose your airport*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an airport" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {airports.map((airport)=>   <SelectItem key={airport.id} value={airport.id} className="cursor-pointer">{airport.name}</SelectItem>)}
               
                 
                </SelectContent>
              </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
        <FormField
                control={form.control}
                name="companyId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Choose your company*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {companies.map((company)=>   <SelectItem key={company.id} value={company.id} className="cursor-pointer">{company.name || 'any'}</SelectItem>)}
               
                 
                </SelectContent>
              </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail*</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password*</FormLabel>
                    <FormControl>
                      <Input placeholder="password" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="entityName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entity name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Entity name" {...field} />
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
                    <FormLabel>Entity slug*</FormLabel>
                    <FormControl>
                      <Input placeholder="Entity slug" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="entityAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entity address*</FormLabel>
                    <FormControl>
                      <Input placeholder="Entity address" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="entityZipcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entity zipcode*</FormLabel>
                    <FormControl>
                      <Input placeholder="Entity zipcode" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="entityPlace"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entity place*</FormLabel>
                    <FormControl>
                      <Input placeholder="Entity place" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entity phone*</FormLabel>
                    <FormControl>
                    <PhoneInput
                    enableSearch={true}
                    buttonStyle={{ border: "none" }}
                    containerStyle={{
                      borderRadius: "7px",
                      width: "100%",
                      border: "0.4px #ECECEC solid",
                    }}
                    inputStyle={{
                      border: "none",
                      width: "100%",
                      backgroundColor: "transparent",
                    }}
                    value={form.getValues("phone")}
                    onChange={(phone) => form.setValue("phone", phone)}
                  />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              
                <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 ">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>isActive</FormLabel>
                
                    </div>
                  </FormItem>
                )}
              />
          
            </div>
          </div>
          <div className="border separate">
            <h3 className="font-bold mb-8 text-xl">Entity content</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

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
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
       <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className='border p-3  rounded-lg '>
              <FormLabel>Content</FormLabel>
              <FormControl>
          <Editor  onChange={(string)=>{form.setValue('content',string)}} initialContent={form.getValues('content')} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
            </div>
            
            </div>

        


          <div className="border separate">
            <h3 className="font-bold mb-8 text-xl">Bank/invoice information</h3>
            <div className="grid grid-cols-2 gap-3">
          
            <FormField
                control={form.control}
                name="invoiceEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice e-mail*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="contact person"
                      
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
                control={form.control}
                name="contactPerson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact person*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="contact person"
                      
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entity name*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Entity name"
                      
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                control={form.control}
                name="chamberOfCommerce"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chamber of commerce*</FormLabel>
                    <FormControl>
                      <Input placeholder="Chamber of commerce" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
         
            <FormField
                control={form.control}
                name="vatNO"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>VAT no.</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="VAT NO"
                      
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
                control={form.control}
                name="IBAN"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IBAN</FormLabel>
                    <FormControl>
                      <Input

                        placeholder="IBAN"
                      
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
                control={form.control}
                name="invoiceAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Address"
                      
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
       
            <FormField
                control={form.control}
                name="invoiceZipcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zipcode*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Zipcode"
                      
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
                control={form.control}
                name="invoicePlace"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Place*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Place"
                      
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
                control={form.control}
                name="invoiceCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Country"
                      
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-8">
          <Button disabled={isLoading} type="submit">
            {isLoading ? (
              <>
                {entity ? "Updating" : "  creating"}

                <Loader className="ml-3 w-3 h-3 animate-spin" />
              </>
            ) : entity ? (
              "Save changes"
            ) : (
              "Create"
            )}
          </Button>
          {entity && (
            <Button
              type="button"
              variant={"destructive"}
              onClick={() =>
                setOpen("delete-modal", {
                  url: `/api/entities/${entity.id}`,
                 
                })
              }
            >
              Delete
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default EntityForm;