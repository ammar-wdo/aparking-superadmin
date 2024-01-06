"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/modal-hook";
import { Category, CategoryFAQ, FAQ } from "@prisma/client";
import { Edit, Trash } from "lucide-react";
import React from "react";

type Props = {
  faq: FAQ & {categoryFaq:{label:string} | null};
  categoriesFaq:CategoryFAQ[]
};

const FaqComponent = ({ faq ,categoriesFaq}: Props) => {
  const { setOpen } = useModal();

  return (
    <div>
      <h3 className=" text-xs capitalize">{faq.categoryFaq?.label}</h3>
 <div className="flex w-full justify-between  ">
      <div className=" rounded-lg  flex flex-col  gap-1 ">
        <p className="first-letter:capitalize text-muted-background text-sm font-semibold">
          {faq.question}?
        </p>{" "}
  
      </div>

      <div className="flex  gap-1">
        <Button
          variant={"default"}
          onClick={() => setOpen("faq-modal", { faq,categoryFaqArray:categoriesFaq})}
          className="w-6 h-6 p-0 text-white"
        >
          <Edit className="w-3 h-3" />
        </Button>
        <Button
          className="w-6 h-6 p-0 text-white"
          variant={"destructive"}
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
    </div>
   
  );
};

export default FaqComponent;
