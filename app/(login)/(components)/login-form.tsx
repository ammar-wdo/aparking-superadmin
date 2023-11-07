'use client'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useLoginHook } from "../login.hook"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Props = {}

const LoginForm = (props: Props) => {



    const {form,onSubmit,error} = useLoginHook()
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 p-10 border rounded-md min-w-[350px]">
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="username" {...field} />
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
            <FormLabel>Passowrd</FormLabel>
            <FormControl>
              <Input type="password" placeholder="password" {...field} />
            </FormControl>
      
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Submit</Button>

      {error && <p className="p-2 text-xs text-rose-400">Invalid credintials</p>}
    </form>
  </Form>
  )
}

export default LoginForm