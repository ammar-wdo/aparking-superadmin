
'use client'
import dynamic from "next/dynamic"
const Editor = dynamic(() => import("@/components/editor"), { ssr: false })
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { About, Privacy } from "@prisma/client"
import { Loader } from "lucide-react"
import { usePrivacy } from "../privacy.hook"


type Props = {
    privacy:Privacy | null
}

const PrivacyForm = ({privacy}: Props) => {
    const {form,onSubmit} = usePrivacy(privacy)

    const isLoading = form.formState.isSubmitting

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Content</FormLabel>
            <FormControl>
            <Editor  onChange={(string)=>{form.setValue('content',string)}} initialContent={form.getValues('content')} />
            </FormControl>
        
            <FormMessage />
          </FormItem>
        )}
      />
      <Button disabled={isLoading} type="submit">{privacy ? 'Update' : 'Create'} {isLoading && <Loader className="ml-3 h-4 w-4 animate-spin" />}</Button>
    </form>
  </Form>
  )
}

export default PrivacyForm