import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { projectId: string } },
) {
  try {
    const projectId = params.projectId;
    const result = await prisma.offerSection.findMany({
      where: {
        projectId: projectId,
      },
      include: {
        MaterialSection: {
          select: {
            quantity: true,
            useService: true,
            MaterialVariant: {
              select: {
                name: true,
                price: true,
                service: true,
                unit: true,
                Material: {
                  select: {
                    name: true,
                  },
                },
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
