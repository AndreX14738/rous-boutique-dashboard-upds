import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(request, { params }) {
  try {
    const assists = await prisma.tbassists.findMany({
      where: {
        FK_user: Number(params.PK_user),
      },
    });

    console.log(assists)
    return NextResponse.json(assists);
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
