import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const users = await prisma.tbusers.findMany();
    return NextResponse.json(users);
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
