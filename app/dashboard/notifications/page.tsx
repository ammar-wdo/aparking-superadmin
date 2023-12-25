import Heading from "@/components/heading";
import React, { Suspense } from "react";
import NotificationsFeed from "./(components)/notifications-feed";
import { Skeleton } from "@/components/ui/skeleton";
import NotificationsFeedSkeleton from "./(components)/notifications-feed-skeleton";
import prisma from "@/lib/prisma";
import Revalidator from "./(components)/revalidator";

type Props = { searchParams: { [key: string]: string | string[] | undefined } };

export const revalidate = 0;

const page = async ({ searchParams }: Props) => {
  if (
    !searchParams.list ||
    searchParams.list === "0" ||
    searchParams.list < "0" ||
    isNaN(+searchParams.list)
  ) {
    searchParams.list = "1";
  }

  return (
    <div>
      <Heading title="Notifications" description="Manage your activities" />
      
      <Suspense
        key={searchParams.list as string}
        fallback={<NotificationsFeedSkeleton />}
      >
       
          <NotificationsFeed list={searchParams.list as string} />
      
      </Suspense>
  
      <Revalidator />
    </div>
  );
};

export default page;
