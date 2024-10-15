import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const salesstatuses = await prisma.tbsalesstatuses.findMany();
    return NextResponse.json(salesstatuses);
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