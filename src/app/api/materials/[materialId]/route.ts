import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { imageUplaod } from "@/lib/utils/image-upload";

export async function GET(
  request: Request,
  { params }: { params: { materialId: string } },
) {
  try {
    const materialId = params.materialId;
    const result = await prisma.material.findUnique({
      where: {
        id: materialId,
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
  { params }: { params: { materialId: string } },
) {
  try {
    const materialId = params.materialId;
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File | string;

    let newImage;

    if (image instanceof File) {
      await imageUplaod(image);
      newImage = `/materials/${image.name}`;
    } else {
      newImage = image;
    }

    const result = await prisma.material.update({
      where: {
        id: materialId,
      },
      data: {
        name: name,
        slug: slug,
        description: description,
        image: newImage,
      },
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
  { params }: { params: { materialId: string } },
) {
  try {
    const materialId = params.materialId;
    const result = await prisma.material.delete({
      where: {
        id: materialId,
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
