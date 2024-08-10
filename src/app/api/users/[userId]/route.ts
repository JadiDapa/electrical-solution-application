import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { accountId: string } },
) {
  try {
    console.log(params);
    const accountId = params.accountId;
    const result = await prisma.user.findUnique({
      where: {
        id: accountId,
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
