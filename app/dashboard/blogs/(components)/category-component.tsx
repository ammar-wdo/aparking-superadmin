"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/modal-hook";
import { Category } from "@prisma/client";
import { Edit, Trash } from "lucide-react";
import React from "react";

type Props = {
  category: Category;
  faq?:boolean
};

const CategoryComponent = ({ category,faq }: Props) => {
const {setOpen} = useModal()

  return (
    <div className="border rounded-lg p-3 flex items-center gap-3 ">
      <p className="first-letter:capitalize text-foreground text-xs font-semibold">{category.label}</p>{" "}
      <div className="flex items-center gap-1">
        <Button variant={'default'} onClick={()=>setOpen(faq ?'faq-cat-modal'  :'category-modal',faq ? {categoryFaq:category} : {category})} className="w-6 h-6 p-0 text-white">
          <Edit className="w-3 h-3" />
        </Button>
        <Button className="w-6 h-6 p-0 text-white" variant={"destructive"} onClick={()=>setOpen('delete-modal',{url: faq ? `/api/faq-category/${category.id}`: `/api/category/${category.id}`,stay:true})}>
          <Trash className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};

export default CategoryComponent;
