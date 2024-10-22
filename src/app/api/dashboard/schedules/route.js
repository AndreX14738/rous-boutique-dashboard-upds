import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const schedules = await prisma.tbschedules.findMany();
    return NextResponse.json(schedules);
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
