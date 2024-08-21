import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { sectionId: string } },
) {
  try {
    const sectionId = params.sectionId;
    const result = await prisma.materialSection.findMany({
      where: {
        offerId: sectionId,
      },
      include: {
        MaterialVariant: {
          select: {
            name: true,
            price: true,
            service: true,
            Material: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 },
    );
  }
}
