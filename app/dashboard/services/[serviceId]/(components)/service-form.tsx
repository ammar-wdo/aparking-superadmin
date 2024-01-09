
'use client'
import { Airport, Entity, ExraOption, Key, ParkingLocation, ParkingType, Service } from '@prisma/client'

import { useServiceId } from '../serviceId.hook'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect, useRef } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { SingleImageDropzone } from '@/components/single-image-drop-zone'
import { useModal } from '@/hooks/modal-hook'
import { Banknote, BatteryChargingIcon, Bus, Car, CheckCircle, CreditCard, Info, KeyIcon, Loader, ParkingCircle, Star, Warehouse } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import dynamic from "next/dynamic";



const Editor = dynamic(() => import("../../../../../components/editor"), { ssr: false })

type Props = {
    service:Service & {entity:{companyId:string},extraOptions:ExraOption[]}
    airports:{id:string,name:string}[],entities:{id:string,entityName:string}[]
}

const ServiceForm = ({service,entities,airports}: Props) => {

    useEffect(()=>{
    const handleEnterPress = (e:KeyboardEvent)=>{

  if(e.key==='Enter'){
    e.preventDefault()
    handleFacilityAdd(facilityRef)
    handleHighlightAdd(highlightRef,highlightIconRef.current)
  }
  }

  document.addEventListener('keydown',handleEnterPress)

  return ()=>document.removeEventListener('keydown',handleEnterPress)

  },[])
const theHighlights = ['car','bus','key','info','check','star','electric','payment','cash','parking','indoor']
  const theIcons :{[key:string]:React.ReactNode} = {
    car:<Car  className='w-5 h-5 '/>,
    bus:<Bus  className='w-5 h-5 '/>,
    key:<KeyIcon  className='w-5 h-5 '/>,
    info:<Info />,
    check:<CheckCircle className='w-5 h-5 ' />,
    star:<Star className='w-5 h-5 ' />,
    electric:<BatteryChargingIcon className='w-5 h-5 ' />,
    payment:<CreditCard  className='w-5 h-5 '/>,
    cash:<Banknote  className='w-5 h-5 '/>,
    parking:<ParkingCircle  className='w-5 h-5 '/>,
    indoor:<Warehouse  className='w-5 h-5 '/>,
  }
  const facilityRef = useRef<HTMLInputElement | null>(null);
  const highlightRef = useRef<HTMLInputElement | null>(null);
  const highlightIconRef = useRef<string>(theHighlights[0]);

const {setOpen} = useModal()


    const {form,onSubmit,uploadImage,uploadImages,ImagePlaceholder,ImagesPlaceholder,setFile,setImagesFile,handleFacilityAdd,MyFacilities,file,imagesFile,handleHighlightAdd,MyHighlights} = useServiceId({service})

    const isLoading = form.formState.isSubmitting
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-[1200px]">
      <div className='p-8 border separate '>
      <h3 className="font-bold mb-8 text-xl">Super admin meta data</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
   
        <FormField
            control={form.control}
            name="timeToAirport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time to airport*</FormLabel>
                <div className='flex items-center gap-3'>
                <FormControl >
                <Input placeholder="time to airport" className='w-fit' maxLength={2} {...field} />
              
                </FormControl>
                <span>min</span>
                </div>
            

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="distanceToAirport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Distance to airport*</FormLabel>
                <div className='flex items-center gap-3'>
                <FormControl >
                  <Input placeholder="distance to airport" className='w-fit' maxLength={2} {...field} />
                  
                </FormControl>
                <span>km</span>
                </div>
           

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="facilities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facilities</FormLabel>
                <FormControl>
                  <div className="space-y-3">
                    <div className="flex items-center gap-5">
                      <Input ref={facilityRef} />
                      <Button className='flex-shrink-0' onClick={()=>handleFacilityAdd(facilityRef)} type="button">
                        Add Facility
                      </Button>
                    </div>
                    {MyFacilities()}
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="highlights"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Highlights</FormLabel>
                <FormControl>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Input ref={highlightRef} />
                      <div>
                <Select onValueChange={e=>{highlightIconRef.current=e}} defaultValue={highlightIconRef.current}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                {theHighlights.map((highlightLabel)=>   <SelectItem key={highlightLabel} className='cursor-pointer text-neutral-500 ' value={highlightLabel}>{theIcons[highlightLabel]}</SelectItem>)}
                </SelectContent>
              </Select>
                </div>
                      <Button className='flex-shrink-0' onClick={()=>handleHighlightAdd(highlightRef,highlightIconRef.current)} type="button">
                        Add Highlight
                      </Button>
                    </div>
                    {MyHighlights()}
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="generalInformation"
            render={({ field }) => (
              <FormItem className='p-3 border rounded-lg'>
                <FormLabel>General information</FormLabel>
                <FormControl>
                <Editor  onChange={(string)=>{form.setValue('generalInformation',string)}} initialContent={form.getValues('generalInformation')} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="importantInfo"
            render={({ field }) => (
              <FormItem className='p-3 border rounded-lg'>
                <FormLabel>Important information</FormLabel>
                <FormControl>
                <Editor  onChange={(string)=>{form.setValue('importantInfo',string)}} initialContent={form.getValues('importantInfo')} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
       
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <div className="flex gap-4 items-center">
                <FormItem>
                  <FormLabel>Logo*</FormLabel>
                  <FormControl>
                    <SingleImageDropzone
                      width={200}
                      height={200}
                      value={file}
                      onChange={(file) => {
                        setFile(file);
                      }}
                    />
                  </FormControl>
                  <Button
                  disabled={!file || !!form.watch('logo')}
                    type="button"
                    onClick={uploadImage}
             
                  >
                    Upload
                  </Button>

                  <FormMessage />
                </FormItem>

                {<ImagePlaceholder />}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gallery</FormLabel>
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
                name="commession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commession</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="%0"
                        className="resize-none"
                        {...field}
                        value={field.value || ''}
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
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Activate the sevice
                </FormLabel>
               
              </div>
            </FormItem>
          )}
        /> 
           <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service slug*</FormLabel>
              
                <FormControl >
                <Input placeholder="slug"  {...field} />
              
                </FormControl>
               
            

                <FormMessage />
              </FormItem>
            )}
          />

        </div>
      </div>
      <div className="p-8 border separate ">
            <h3 className="font-bold mb-8 text-xl">Service details</h3>
            <div className="grid grid-cols-2 gap-3 ">
              
           {/* {  <FormField
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
              />} */}

              {<FormField
                control={form.control}
                name="entityId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Choose your entity*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an entity" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {entities.map((entity)=>   <SelectItem key={entity.id} value={entity.id} className="cursor-pointer">{entity.entityName}</SelectItem>)}
               
                 
                </SelectContent>
              </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />}
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link to the Terms*</FormLabel>
                    <FormControl>
                      <Input placeholder="https://" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Indoor park" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bookingsEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bookings e-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="bookings email" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="available"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 ">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Current availability</FormLabel>
                      <FormDescription>
                        You can enable or desable your availability{" "}
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="p-8 border separate ">
            <h3 className="font-bold mb-8 text-xl">Parking details</h3>
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="parkingAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address*</FormLabel>
                    <FormControl>
                      <Input placeholder="Address" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="parkingZipcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zipcode*</FormLabel>
                    <FormControl>
                      <Input placeholder="Zipcode" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="parkingPlace"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Place*</FormLabel>
                    <FormControl>
                      <Input placeholder="Place" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="parkingCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country*</FormLabel>
                    <FormControl>
                      <Input placeholder="Country" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="spots"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total parking spots available* </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="total spots"
                        type="number"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="parkingType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parking type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={ParkingType.shuttle}>
                          {ParkingType.shuttle}
                        </SelectItem>
                        <SelectItem value={ParkingType.valet}>
                          {ParkingType.valet}
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="arrivalTodos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What to do on arrival</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="departureTodos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What to do on arrival</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
         

<FormField
          control={form.control}
          name="electricCharging"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Electric charging
                </FormLabel>
           
              </div>
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="parkingLocation"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Parking location</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={ParkingLocation.INDOOR} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Indoor
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={ParkingLocation.OUTDOOR} />
                    </FormControl>
                    <FormLabel className="font-normal">
                     Outdoor
                    </FormLabel>
                  </FormItem>
             
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
<FormField
          control={form.control}
          name="keyStatus"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Keys</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={Key.KEEP} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Keep
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={Key.LEAVE} />
                    </FormControl>
                    <FormLabel className="font-normal">
                     Leave
                    </FormLabel>
                  </FormItem>
              
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
            </div>

        
          </div>
        
        
    

 
 
      <Button disabled={isLoading} type="submit">Update {isLoading && <Loader className='w-3 h-3 ml-3 animate-spin' />}</Button> <Button variant={"destructive" } type='button'   onClick={() =>
                setOpen("delete-modal", { url: `/api/services/${service.id}` })
              }>Delete</Button>
    </form>
  </Form>
  )
}

export default ServiceForm