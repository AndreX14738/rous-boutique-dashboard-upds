import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const income = await prisma.tbincome.findMany({
      orderBy:{
        PK_income: 'desc'
      }
    });
    return NextResponse.json(income);
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