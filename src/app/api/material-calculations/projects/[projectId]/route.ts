import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { projectId: string } },
) {
  try {
    const projectId = params.projectId;
    const result = await prisma.materialCalculation.findMany({
      where: {
        projectId: projectId,
      },
      include: {
        MaterialVariant: {
          select: {
            name: true,
            price: true,
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
