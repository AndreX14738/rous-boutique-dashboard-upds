import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(request, { params }) {
  try {
    const customer = await prisma.tbcustomers.findUnique({
      where: {
        PK_customer: Number(params.PK_customer),
      },
    });
    return NextResponse.json(customer);
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
