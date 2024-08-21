import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { offerId: string } },
) {
  try {
    const offerId = params.offerId;
    const result = await prisma.offer.findUnique({
      where: {
        id: offerId,
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
  { params }: { params: { offerId: string } },
) {
  try {
    const offerId = params.offerId;
    const data = await req.json();

    const result = await prisma.offer.update({
      where: {
        id: offerId,
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
  { params }: { params: { offerId: string } },
) {
  try {
    const offerId = params.offerId;
    const result = await prisma.offer.delete({
      where: {
        id: offerId,
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
