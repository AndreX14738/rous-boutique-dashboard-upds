import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(request, { params }) {
  try {
    const category = await prisma.tbcategories.findUnique({
      where: {
        PK_category: Number(params.PK_category),
      },
    });
    return NextResponse.json(category);
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
