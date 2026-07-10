import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const certificates = await prisma.certificate.findMany({
      where: {
        userId: session.user.id as string,
      },
      orderBy: {
        issuedAt: "desc",
      },
    });

    return NextResponse.json(certificates);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { courseName } = body;

    if (!courseName) {
      return new NextResponse("Course name is required", { status: 400 });
    }

    // Check if certificate already exists
    const existing = await prisma.certificate.findFirst({
      where: {
        userId: session.user.id as string,
        courseName,
      }
    });

    if (existing) {
      return NextResponse.json(existing);
    }

    const uniqueId = `CERT-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${Date.now().toString().slice(-4)}`;

    const certificate = await prisma.certificate.create({
      data: {
        userId: session.user.id as string,
        courseName,
        uniqueId,
      },
    });

    return NextResponse.json(certificate);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
