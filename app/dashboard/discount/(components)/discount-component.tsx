"use client";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useModal } from "@/hooks/modal-hook";
import { NLtimezone } from "@/lib/nl-timezone";
import { Discount } from "@prisma/client";
import { Edit, Trash } from "lucide-react";

type Props = {
  discount: Discount;
};

const DiscountComponent = ({ discount }: Props) => {

    const {setOpen} = useModal()
  return (
    <TableRow>
      <TableCell className="">{discount.code}</TableCell>
      <TableCell className="">{discount.label}</TableCell>
      <TableCell>{discount.based}</TableCell>
      <TableCell>{discount.type}</TableCell>
      <TableCell>{discount.percentage ? `%${discount.percentage}` : "N/A"}</TableCell>
      <TableCell>{discount.value ? `€${discount.value}` : "N/A"}</TableCell>
      <TableCell>{NLtimezone(discount.startDate, "UTC")}</TableCell>
      <TableCell>{NLtimezone(discount.endDate, "UTC")}</TableCell>
      <TableCell>
        {NLtimezone(discount.createdAt, "Europe/Amsterdam")}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Button className="w-8 h-8 p-0" onClick={()=>setOpen('discount-modal',{discount})}><Edit  className="w-4 h-4" /></Button>
          <Button className="w-8 h-8 p-0"  variant={'destructive'} onClick={()=>setOpen('delete-modal',{url:`/api/discount/${discount.id}`,stay:true})}><Trash  className="w-4 h-4"/></Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default DiscountComponent;
