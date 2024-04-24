"use client";

import React from "react";
import { useReview } from "../review.hook";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReactStars from "react-stars";
import { Textarea } from "@/components/ui/textarea";
import { reviewStatusArray, reviewVisibilityArray } from "@/schemas";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

type Props = {};

const ReviewForm = (props: Props) => {
  const { form, onSubmit, entities } = useReview();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="entityId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entity Name</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Entity name" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {entities?.map((val) => (
                      <SelectItem key={val.id} value={val.id}>{val.entityName}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {!!form.watch("entityId") && (
          <FormField
            control={form.control}
            name="serviceId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Name</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Service name" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {entities
                        ?.find((el) => el.id === form.watch("entityId"))
                        ?.services.map((val) => (
                          <SelectItem key={val.id} value={val.id}>{val.name}</SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        )}
             <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                <Input placeholder="first name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
             <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                <Input placeholder="last name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
             <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                <Input placeholder="e-mail" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
              <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rate</FormLabel>
                <FormControl>
                <ReactStars 
        onChange={(value)=>form.setValue('rate',String(value))}
        className='mx-auto'
        value={+form.watch('rate')}
        
        count={5} 
        size={24} 
        color2={'#FEBA02'} /> 
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
              <FormField
            control={form.control}
            name="reviewContent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                <Textarea placeholder="content" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                       reviewStatusArray.map(val=>   <SelectItem key={val} value={val}>{val}</SelectItem>)
                       }
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
            control={form.control}
            name="visibility"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visibility</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select visibility state" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                       reviewVisibilityArray.map(val=>   <SelectItem key={val} value={val}>{val}</SelectItem>)
                       }
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
          control={form.control}
          name="placeHolderDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Placeholder date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={date => {
                        const selectedDate = new Date(date || '');
                        const offsetInMilliseconds = selectedDate.getTimezoneOffset() * 60000;
                        const dateWithoutOffset = new Date(selectedDate.getTime() - offsetInMilliseconds);
                        field.onChange(dateWithoutOffset);
                      }}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0,0,0,0)) 
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled = {form.formState.isSubmitting} type="submit">Submit {form.formState.isSubmitting && <Loader className="animate-spin ml-3" />}</Button>
      </form>
    </Form>
  );
};

export default ReviewForm;
