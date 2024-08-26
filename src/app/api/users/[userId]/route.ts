import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { imageUplaod } from "@/lib/utils/image-upload";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const userId = params.userId;
    console.log(userId);
    const result = await prisma.user.findUnique({
      where: {
        id: userId,
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
  { params }: { params: { userId: string } },
) {
  try {
    const userId = params.userId;
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;
    const image = formData.get("image") as File | string;

    let newImage;

    if (image instanceof File) {
      await imageUplaod(image);
      newImage = `/users/${image.name}`;
    } else {
      newImage = image;
    }

    const result = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name,
        email: email,
        role: role,
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
  { params }: { params: { userId: string } },
) {
  try {
    const userId = params.userId;
    const result = await prisma.user.delete({
      where: {
        id: userId,
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
