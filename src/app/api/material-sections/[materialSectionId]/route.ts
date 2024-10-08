import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { materialSectionId: string } },
) {
  try {
    const materialSectionId = params.materialSectionId;
    const result = await prisma.materialSection.findUnique({
      where: {
        id: materialSectionId,
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

export async function PUT(
  req: Request,
  { params }: { params: { materialSectionId: string } },
) {
  try {
    const materialSectionId = params.materialSectionId;
    const data = await req.json();

    const result = await prisma.materialSection.update({
      where: {
        id: materialSectionId,
      },
      data,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { materialSectionId: string } },
) {
  try {
    const materialSectionId = params.materialSectionId;
    const result = await prisma.materialSection.delete({
      where: {
        id: materialSectionId,
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
