import { prisma } from "@/lib/prisma";
import { imageUplaod } from "@/lib/utils/image-upload";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { evidenceId: string } },
) {
  try {
    const evidenceId = params.evidenceId;
    const result = await prisma.evidence.findMany({
      where: {
        id: evidenceId,
      },
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

export async function PUT(
  req: Request,
  { params }: { params: { evidenceId: string } },
) {
  try {
    const evidenceId = params.evidenceId;
    const formData = await req.formData();

    const projectId = formData.get("projectId") as string;
    const type = formData.get("type") as string;
    const evidence = formData.get("evidence") as File | string;

    let newEvidence;

    if (evidence instanceof File) {
      await imageUplaod(evidence);
      newEvidence = `/materials/${evidence.name}`;
    } else {
      newEvidence = evidence;
    }

    const result = await prisma.evidence.update({
      where: {
        id: evidenceId,
      },
      data: {
        projectId: projectId,
        type: type,
        evidence: newEvidence,
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
  { params }: { params: { evidenceId: string } },
) {
  try {
    const evidenceId = params.evidenceId;
    const result = await prisma.evidence.delete({
      where: {
        id: evidenceId,
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
