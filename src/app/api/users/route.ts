import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function GET() {
  try {
    const result = await prisma.user.findMany();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const isRegistered = await prisma.user.findUnique({
      where: { email: email },
    });

    if (isRegistered) {
      return NextResponse.json(
        { error: "An account with this email already exists!" },
        { status: 409 },
      );
    }

    const hashedPassword = await hash(password, 10);

    const result = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
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
