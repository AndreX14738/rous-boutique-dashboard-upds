import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const products = await prisma.tbproducts.findMany();
    return NextResponse.json(products);
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
