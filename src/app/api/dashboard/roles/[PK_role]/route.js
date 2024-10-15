import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(request, { params }) {
  try {
    const role = await prisma.tbroles.findUnique({
      where: {
        PK_role: Number(params.PK_role),
      },
    });
    return NextResponse.json(role);
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
