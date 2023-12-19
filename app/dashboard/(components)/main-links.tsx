"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Bell,
  BookOpenText,
  BookUser,
  BookmarkCheck,
  Boxes,
  Building,
  Building2,
  FileLock2,
  FileQuestion,
  FileText,
  Group,
  LayoutDashboard,
  MessageSquare,
  Plane,
} from "lucide-react";
import SignoutButton from "./signout-button";
import { ModeToggle } from "@/components/theme-toggle";
import { useNotificationsQuery } from "../notifications/notifications.hook";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

type Props = {};

const MainLinks = (props: Props) => {
  const { data } = useNotificationsQuery();
  

  const pathname = usePathname();
  const router = useRouter()

  const myLinks = [
    {
      label: "dashboard",
      active: pathname === "/dashboard",
      link: "/dashboard",
      Icon: <LayoutDashboard className="w-5 h-5 mr-3" />,
    },
    {
      label: "airports",
      active: pathname === "/dashboard/airports",
      link: "/dashboard/airports",
      Icon: <Plane className="w-5 h-5 mr-3" />,
    },

    {
      label: "companies",
      active: pathname === "/dashboard/companies",
      link: "/dashboard/companies",
      Icon: <Building className="w-5 h-5 mr-3" />,
    },
    {
      label: "entities",
      active: pathname === "/dashboard/entities",
      link: "/dashboard/entities",
      Icon: <Building2 className="w-5 h-5 mr-3" />,
    },
    {
      label: "services",
      active: pathname === "/dashboard/services",
      link: "/dashboard/services",
      Icon: <Boxes className="w-5 h-5 mr-3" />,
    },
  ];

  const activities = [
    {
      label: "notifications",
      active: pathname === "/dashboard/notifications",
      link: "/dashboard/notifications",
      Icon: <Bell className="w-5 h-5 mr-3" />,
      count: data?.count > 0,
    },
    {
      label: "reviews",
      active: pathname === "/dashboard/reviews",
      link: "/dashboard/reviews",
      Icon: <MessageSquare className="w-5 h-5 mr-3" />,
    },
  ];

  const content = [
    {
      label: "blogs",
      active: pathname === "/dashboard/blogs",
      link: "/dashboard/blogs",
      Icon: <BookOpenText className="w-5 h-5 mr-3" />,
    },
    {
      label: "about us",
      active: pathname === "/dashboard/about-us",
      link: "/dashboard/about-us",
      Icon: <BookUser className="w-5 h-5 mr-3" />,
    },
    {
      label: "FAQ",
      active: pathname === "/dashboard/faq",
      link: "/dashboard/faq",
      Icon: <FileQuestion className="w-5 h-5 mr-3" />,
    },
    {
      label: "Terms & conditions",
      active: pathname === "/dashboard/terms",
      link: "/dashboard/terms",
      Icon: <FileText className="w-5 h-5 mr-3" />,
    },
    {
      label: "Privacy policy",
      active: pathname === "/dashboard/privacy",
      link: "/dashboard/privacy",
      Icon: <FileLock2 className="w-5 h-5 mr-3" />,
    },
  
  ]

  return (
    <div className="w-full flex flex-col mt-16 p-1 px-3 gap-1 flex-1 ">
      <h3 className="font-semibold px-4 ">Main</h3>
      {myLinks.map((link) => (
        <Button
        onClick={()=>{router.push(link.link);router.refresh()}}
          key={link.label}
        variant={'ghost'}
          className={cn(
            "link justify-start",
            link.active && "bg-secondary ",
            !link.active && "hover:bg-secondary/60"
          )}
        >
          {link.Icon} {link.label}
        </Button>
      ))}
      <h3 className="font-semibold px-4 mt-12">Activites</h3>
      {activities.map((link) => (
        <Button
        onClick={()=>{router.push(link.link);router.refresh()}}
        key={link.label}
      variant={'ghost'}
        className={cn(
          "link justify-start",
          link.active && "bg-secondary ",
          !link.active && "hover:bg-secondary/60"
        )}
        >
          <span className="relative">
            {link.Icon}{" "}
            {link.count && data?.count > 0 && (
              <span className="flex items-center justify-center text-white bg-rose-500 rounded-full text-[8px] -top-1 right-2  w-3 h-3 absolute">
                {data?.count}
              </span>
            )}
          </span>{" "}
          {link.label}
        </Button>
      ))}

<h3 className="font-semibold px-4 mt-12">Content</h3>
{content.map((el)=><Button   onClick={()=>{router.push(el.link);router.refresh()}}
          key={el.label}
        variant={'ghost'}
          className={cn(
            "link justify-start",
            el.active && "bg-secondary ",
            !el.active && "hover:bg-secondary/60"
          )}
>{el.Icon} {el.label}</Button>)}

      <ModeToggle />
      <SignoutButton />
    </div>
  );
};

export default MainLinks;
