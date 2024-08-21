import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { imageUplaod } from "@/lib/utils/image-upload";

export async function GET(req: NextRequest) {
  try {
    const result = await prisma.evidence.findMany({
      orderBy: {
        createdAt: "desc",
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
    const formData = await req.formData();

    const projectId = formData.get("projectId") as string;
    const type = formData.get("type") as string;
    const evidence = formData.get("evidence") as File;

    if (!evidence) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    await imageUplaod(evidence);
    const evidenceWebPath = `/materials/${evidence.name}`;

    const result = await prisma.evidence.create({
      data: {
        projectId: projectId,
        type: type,
        evidence: evidenceWebPath,
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
