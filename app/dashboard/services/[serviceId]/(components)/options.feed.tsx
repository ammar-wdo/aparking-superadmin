"use client";

import { ExraOption, Service } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import ToolTip from "@/components/tool-tip";
import { useState } from "react";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = { service: Service & { extraOptions: ExraOption[] } };

const OptionsFeed = ({ service }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const toggleOption = async (id: string) => {
    try {
      setIsLoading(true);
      await axios.post(`/api/option/${id}`);
      toast.success("Done successfully!");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="p-8 border rounded-lg">
      <h3 className="font-bold mb-8 text-xl">Extra options</h3>
      <div className="mt-2">
        {!service.extraOptions.length ? 
          <p className="p-4 text-center text-3xl font-bold text-neutral-500">
            No extra options
          </p> :  <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Label</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {service.extraOptions.map((option) => (
              <TableRow key={option.id}>
                <TableCell>{option.label}</TableCell>
                <TableCell className="max-w-[100px]">
                  <ToolTip side="top" title={option.description}>
                    {option.description}
                  </ToolTip>
                </TableCell>
                <TableCell>€ {option.price}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "p-1 rounded-full px-2 bg-green-500/20 text-green-500",
                      !option.isActive && "bg-rose-500/20 text-rose-500"
                    )}
                  >
                    {option.isActive ? "Active" : "inActive"}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    disabled={isLoading}
                    onClick={() => toggleOption(option.id)}
                  >
                    {option.isActive ? "Disable" : "Enable"}
                    {isLoading && (
                      <Loader className="ml-3 w-4 h-4 animate-spin" />
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        }
       
      </div>
    </div>
  );
};

export default OptionsFeed;
