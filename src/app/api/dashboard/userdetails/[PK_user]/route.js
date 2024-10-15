import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(request, { params }) {
  try {
    const userDetails = await prisma.tbuserdetails.findMany({
      where: {
        FK_user: Number(params.PK_user),
      },
    });

    console.log(userDetails)
    return NextResponse.json(userDetails[0]);
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
