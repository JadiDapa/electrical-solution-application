import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { variantId: string } },
) {
  try {
    const variantId = params.variantId;
    const result = await prisma.materialVariant.findUnique({
      where: {
        id: variantId,
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
  { params }: { params: { variantId: string } },
) {
  try {
    const variantId = params.variantId;
    const data = await req.json();

    const result = await prisma.materialVariant.update({
      where: {
        id: variantId,
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
  { params }: { params: { variantId: string } },
) {
  try {
    const variantId = params.variantId;
    const result = await prisma.materialVariant.delete({
      where: {
        id: variantId,
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
