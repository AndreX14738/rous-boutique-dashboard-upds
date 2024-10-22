import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const subcategories = await prisma.tbsubcategories.findMany();
    return NextResponse.json(subcategories);
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
