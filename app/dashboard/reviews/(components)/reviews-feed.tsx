import prisma from "@/lib/prisma";
import React from "react";
import { DataTable } from "./reviews-table";
import { reviewColumns } from "./review-columns";

type Props = {
  entities:{
    entityName: string;
    id: string;
    services: {
        name: string;
        id: string;
    }[];
}[]
};

const ReviewsFeed = async ({entities}: Props) => {
  const reviews = await prisma.review.findMany({
    include: {
      entity: {
        select: { entityName: true, company: { select: { name: true } } },
      },
      service: { select: { name: true } },
      booking: { select: { firstName: true, lastName: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });



  return (
    <div className="">
      <DataTable data={reviews} columns={reviewColumns} />
    </div>
  );
};

export default ReviewsFeed;
