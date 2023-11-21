"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BookmarkCheck, Boxes, Group, LayoutDashboard } from "lucide-react";
import SignoutButton from "./signout-button";
import { ModeToggle } from "@/components/theme-toggle";

type Props = {};

const MainLinks = (props: Props) => {
  const pathname = usePathname();

  const myLinks = [
    {
      label:"dashboard",
      active:pathname==='/dashboard',
      link:'/dashboard',
      Icon:<LayoutDashboard className='w-5 h-5 mr-3' /> 

    },

    {
      label: "companies",
      active: pathname === "/dashboard/companies",
      link: "/dashboard/companies",
      Icon:<Boxes className="w-5 h-5 mr-3" />
    },
    {
      label: "entities",
      active: pathname === "/dashboard/entities",
      link: "/dashboard/entities",
      Icon:<Group className="w-5 h-5 mr-3" />
    },
   
  ];
  return (
    <div className="w-full flex flex-col mt-16 p-1 px-3 gap-1 flex-1 ">
      {myLinks.map((link) => (
        <Link
        key={link.label}
          href={link.link}
          className={cn(
            "link",
            link.active && "bg-secondary ",!link.active && 'hover:bg-secondary/60'
          )}
        >
         {link.Icon} {link.label}
        </Link>
      ))}
      <ModeToggle />
       <SignoutButton />
     
    </div>
  );
};

export default MainLinks;
