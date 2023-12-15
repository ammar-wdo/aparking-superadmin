"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/modal-hook";
import { Category, FAQ } from "@prisma/client";
import { Edit, Trash } from "lucide-react";
import React from "react";

type Props = {
  faq: FAQ;
};

const FaqComponent = ({ faq }: Props) => {
  const { setOpen } = useModal();

  return (
    <div className="flex w-full justify-between border rounded-sm p-3">
      <div className=" rounded-lg  flex flex-col  gap-1 ">
        <p className="first-letter:capitalize text-foreground text-sm font-semibold">
          {faq.question}?
        </p>{" "}
        <p className="first-letter:capitalize text-foreground text-xs  max-w-[350px]">
          {faq.answer}
        </p>{" "}
      </div>

      <div className="flex  gap-1">
        <Button
          variant={"ghost"}
          onClick={() => setOpen("faq-modal", { faq })}
          className="w-6 h-6 p-0"
        >
          <Edit className="w-3 h-3" />
        </Button>
        <Button
          className="w-6 h-6 p-0"
          variant={"ghost"}
          onClick={() =>
            setOpen("delete-modal", {
              url: `/api/faq/${faq.id}`,
              stay: true,
            })
          }
        >
          <Trash className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};

export default FaqComponent;
