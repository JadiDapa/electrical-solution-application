import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const filters: { [key: string]: any } = {};

    const name = searchParams.get("name");
    if (name) {
      filters.name = {
        contains: name,
      };
    }

    const materialId = searchParams.get("materialId");
    if (materialId) {
      filters.materialId = {
        contains: materialId,
      };
    }

    const unit = searchParams.get("unit");
    if (unit) {
      filters.unit = {
        contains: unit,
      };
    }

    const start = searchParams.get("start");
    const end = searchParams.get("end");
    if (start && end) {
      filters.createdAt = {
        gte: new Date(start),
        lt: new Date(end),
      };
    }

    const page = Number(searchParams.get("page")) || 0;
    const take = Number(searchParams.get("take")) || 9999999999;

    const result = await prisma.materialVariant.findMany({
      where: filters,
      skip: page * take,
      take,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        Material: true,
      },
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    console.log(data);

    const result = await prisma.materialVariant.create({
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
