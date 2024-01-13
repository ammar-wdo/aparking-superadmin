"use client";
import { useModal } from "@/hooks/modal-hook";
import { handleTimezone } from "@/lib/handle-timezone";
import { discountSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const useDiscount = () => {
  const {
    setClose,
    data: { discount },
  } = useModal();
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);

  const form = useForm<z.infer<typeof discountSchema>>({
    resolver: zodResolver(discountSchema),
    defaultValues: {
      label: discount?.label || "",
      based: discount?.based || "CREATING",
      startDate: discount?.startDate
        ? new Date(new Date(discount.startDate).setUTCHours(0, 0, 0, 0))
        : new Date(Date.now()),
      endDate: discount?.endDate
        ? new Date(new Date(discount.endDate).setUTCHours(0, 0, 0, 0))
        : new Date(Date.now()),
      type: discount?.type || "PERCENTAGE",
      percentage: discount?.percentage || 0,
      value: discount?.value || 0,
    },
  });

  useEffect(() => {
    if (form.watch("startDate")) {
      setStartOpen(false);
    }
  }, [form.watch("startDate")]);

  useEffect(() => {
    if (form.watch("endDate")) {
      setEndOpen(false);
    }
  }, [form.watch("endDate")]);

  useEffect(() => {
    if (form.watch("type") === "FIXED") {
      form.setValue("percentage", 0);
    } else {
      form.setValue("value", 0);
    }
  }, [form.watch("type")]);

  const router = useRouter();
  async function onSubmit(values: z.infer<typeof discountSchema>) {

    const {startDateString,endDateString} = handleTimezone(values.startDate,values.endDate)
      
      const refinedValues = {...values,startDate:startDateString,endDate:endDateString}
    try {
      if (!discount) {
        await axios.post("/api/discount", refinedValues);
        toast.success("Successfully created");
        setClose();
        router.refresh();
      } else {
        await axios.patch(`/api/discount/${discount.id}`, refinedValues);
        toast.success("Successfully updated");
        setClose();
        router.refresh();

      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }

    console.log(values);
  }

  return { form, onSubmit, startOpen, endOpen, setStartOpen, setEndOpen };
};
