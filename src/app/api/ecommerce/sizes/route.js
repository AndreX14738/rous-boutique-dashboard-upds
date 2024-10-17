import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const sizes = await prisma.tbsizes.findMany();
    return NextResponse.json(sizes);
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
