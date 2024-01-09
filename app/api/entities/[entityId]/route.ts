import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { entitySchema, serviceSchema } from "@/schemas";
import prisma from "@/lib/prisma";
import { encryptPassword } from "../../(helpers)/bcrypt";
import { duplicateEmailChecker } from "../../(helpers)/duplicate-email-checker";
import { duplicateSlugChecker } from "../../(helpers)/duplicate-slug-checker";

export async function PATCH(
  req: Request,
  { params }: { params: { entityId: string } }
) {
  try {
    if (!params.entityId)
      return new NextResponse("entity ID is required", { status: 400 });
    const admin = await getServerSession(authOptions);

    if (!admin) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();

    const validbody = entitySchema.safeParse(body);
    if (!validbody.success)
      return NextResponse.json({ errors: validbody.error }, { status: 400 });

    const { newPassword, password, ...rest } = validbody.data;
    let thePassword;
    if (newPassword) {
      thePassword = await encryptPassword(newPassword);
    } else {
      thePassword = password;
    }

    const message = await duplicateEmailChecker(validbody,undefined,params.entityId)
    if(message) return NextResponse.json({message},{status:200})

    const slugMessage = await duplicateSlugChecker({slug:validbody.data.slug,element:'entity',id:params.entityId})
if(slugMessage) return NextResponse.json({message:slugMessage},{status:200})

    // const companyExist = await prisma.company.findUnique({
    //   where: {
    //     email: validbody.data.email,
    //   },
    // });

    // if (companyExist)
    //   return NextResponse.json(
    //     { message: "E-mail already exist as a Company" },
    //     { status: 200 }
    //   );

    // const entityExist = await prisma.entity.findUnique({
    //   where: {
    //     email: validbody.data.email,
    //     NOT: { id: params.entityId },
    //   },
    // });

    // if (entityExist)
    //   return NextResponse.json(
    //     { message: "E-mail already exist" },
    //     { status: 200 }
    //   );

    const updated = await prisma.entity.update({
      where: {
        id: params.entityId,
      },
      data: {
        ...rest,
        password: thePassword,
      },
    });

    return NextResponse.json({ done: "success" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { entityId: string } }
) {
  try {
    if (!params.entityId)
      return new NextResponse("entity ID is required", { status: 400 });
    const admin = await getServerSession(authOptions);

    if (!admin) return new NextResponse("Unauthorized", { status: 401 });

    const updated = await prisma.entity.delete({
      where: {
        id: params.entityId,
      },
    });

    await prisma.notification.create({
      data: {
        companyId: updated.companyId,
        type: "ENTITY",
        name: updated.entityName,
        status: "DELETE",
        message: `The ${updated.entityName} entity has been deleted by Aparking super admin`,
      },
    });

    return NextResponse.json({ message: "success" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
