"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Bell,
  BookmarkCheck,
  Boxes,
  Building,
  Building2,
  Group,
  LayoutDashboard,
  MessageSquare,
  Plane,
} from "lucide-react";
import SignoutButton from "./signout-button";
import { ModeToggle } from "@/components/theme-toggle";
import { useNotificationsQuery } from "../notifications/notifications.hook";
import { useEffect } from "react";

type Props = {};

const MainLinks = (props: Props) => {
  const { data } = useNotificationsQuery();
  

  const pathname = usePathname();

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
      label: "messages",
      active: pathname === "/dashboard/messages",
      link: "/dashboard/messages",
      Icon: <MessageSquare className="w-5 h-5 mr-3" />,
    },
  ];

  return (
    <div className="w-full flex flex-col mt-16 p-1 px-3 gap-1 flex-1 ">
      <h3 className="font-semibold px-4 ">Main</h3>
      {myLinks.map((link) => (
        <Link
          key={link.label}
          href={link.link}
          className={cn(
            "link",
            link.active && "bg-secondary ",
            !link.active && "hover:bg-secondary/60"
          )}
        >
          {link.Icon} {link.label}
        </Link>
      ))}
      <h3 className="font-semibold px-4 mt-12">Activites</h3>
      {activities.map((link) => (
        <Link
        prefetch={link.label==="notifications" ? false : true}
          key={link.label}
          href={link.link}
          className={cn(
            "link",
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
        </Link>
      ))}

      <ModeToggle />
      <SignoutButton />
    </div>
  );
};

export default MainLinks;
