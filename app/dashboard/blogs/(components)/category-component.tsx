"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/modal-hook";
import { Category } from "@prisma/client";
import { Edit, Trash } from "lucide-react";
import React from "react";

type Props = {
  category: Category;
};

const CategoryComponent = ({ category }: Props) => {
const {setOpen} = useModal()

  return (
    <div className="border rounded-lg p-3 flex items-center gap-3 bg-white">
      <p className="first-letter:capitalize text-neutral-500 text-xs font-semibold">{category.label}</p>{" "}
      <div className="flex items-center gap-1">
        <Button variant={'ghost'} onClick={()=>setOpen('category-modal',{category})} className="w-6 h-6 p-0">
          <Edit className="w-3 h-3" />
        </Button>
        <Button className="w-6 h-6 p-0" variant={"ghost"} onClick={()=>setOpen('delete-modal',{url:`/api/category/${category.id}`,stay:true})}>
          <Trash className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};

export default CategoryComponent;
