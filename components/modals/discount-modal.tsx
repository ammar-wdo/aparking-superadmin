"use client";

import DiscountForm from "@/app/dashboard/discount/(components)/discount-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/modal-hook";

type Props = {};

const DiscountModal = (props: Props) => {
  const { open, type, setClose, data } = useModal();
  const isOpen = open && type === "discount-modal";

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {data.discount ? "Edit discount" : "Create a new discount "}
          </DialogTitle>

       <div className="mt-6">
       <DiscountForm />
        </div> 
        </DialogHeader>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DiscountModal;
