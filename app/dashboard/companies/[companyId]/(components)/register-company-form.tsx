"use client";

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader } from "lucide-react";

import { useRegister } from "../register.hook";
import { registerDefaultValues, registerSchema } from "../register-schema";
import { Company } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { useModal } from "@/hooks/modal-hook";

type Props = {
  company: Company | null;
};

const RegisterForm = ({ company }: Props) => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues(company),
  });

  const { onSubmit } = useRegister(company);

  const isLoading = form.formState.isSubmitting;
  const { setOpen } = useModal();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="invoiceEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Invoice-mail</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
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
                <FormLabel>Phone</FormLabel>
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
            name="place"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Place</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zipcode</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
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
                  <FormLabel>Activate company</FormLabel>
                  <FormDescription>
                    Activate the company to give the user access to it
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center ">
          <Button disabled={isLoading} type="submit">
            {isLoading ? (
              <>
                {company ? "Editing" : "Creating"}
                <Loader className="ml-3 w-3 h-3 animate-spin" />
              </>
            ) : company ? (
              "Edit"
            ) : (
              "Create"
            )}
          </Button>
          {company && (
            <Button
            type="button"
            className="ml-4"
              onClick={() =>
                setOpen("delete-modal", { url: `/api/company/${company.id}` })
              }
              variant={"destructive"}
            >
              Delete
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
