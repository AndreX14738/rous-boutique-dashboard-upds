import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(request, { params }) {
  try {
    const size = await prisma.tbsizes.findUnique({
      where: {
        PK_size: Number(params.PK_size),
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
