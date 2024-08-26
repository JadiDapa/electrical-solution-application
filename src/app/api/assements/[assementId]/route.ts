import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { assementId: string } },
) {
  try {
    const assementId = params.assementId;
    const result = await prisma.assement.findUnique({
      where: {
        id: assementId,
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
  { params }: { params: { assementId: string } },
) {
  try {
    const assementId = params.assementId;
    const data = await req.json();

    const result = await prisma.assement.update({
      where: {
        id: assementId,
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
  { params }: { params: { assementId: string } },
) {
  try {
    const assementId = params.assementId;
    const result = await prisma.assement.delete({
      where: {
        id: assementId,
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
