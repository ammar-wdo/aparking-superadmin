import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { entitySchema } from "@/schemas";
import prisma from "@/lib/prisma";
import { encryptPassword } from "../(helpers)/bcrypt";
import { duplicateEmailChecker } from "../(helpers)/duplicate-email-checker";
import { duplicateSlugChecker } from "../(helpers)/duplicate-slug-checker";

export async function POST(req: Request) {
  try {
    const admin = await getServerSession(authOptions);

    if (!admin) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();

    const validbody = entitySchema.safeParse(body);
    if (!validbody.success)
      return NextResponse.json({ errors: validbody.error }, { status: 400 });

    const encryptedPassword = await encryptPassword(validbody.data.password);

    const message = await duplicateEmailChecker(validbody)
  if(message) return NextResponse.json({message},{status:200})

  const slugMessage = await duplicateSlugChecker({slug:validbody.data.slug,element:'entity'})
if(slugMessage) return NextResponse.json({message:slugMessage},{status:200})

    const entity = await prisma.entity.create({
      data: {
        ...validbody.data,
        password: encryptedPassword,
      },
    });

    await prisma.notification.create({
      data: {
        companyId: entity.companyId,
        type: "ENTITY",
        status: "APPROVE",

        message: "New entity has been created by Aparking super admin",
      },
    });

    return NextResponse.json({ message: "success" }, { status: 201 });
  } catch (error) {
    console.log("entity post error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
