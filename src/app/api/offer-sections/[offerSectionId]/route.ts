import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { offerSectionId: string } },
) {
  try {
    const offerSectionId = params.offerSectionId;
    const result = await prisma.offerSection.findUnique({
      where: {
        id: offerSectionId,
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
  { params }: { params: { offerSectionId: string } },
) {
  try {
    const offerSectionId = params.offerSectionId;
    const data = await req.json();

    const result = await prisma.offerSection.update({
      where: {
        id: offerSectionId,
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
  { params }: { params: { offerSectionId: string } },
) {
  try {
    const offerSectionId = params.offerSectionId;
    const result = await prisma.offerSection.delete({
      where: {
        id: offerSectionId,
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
