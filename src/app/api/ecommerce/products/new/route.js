import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const products = await prisma.tbproducts.findMany({
      take: 8, // Limita a los últimos 8 registros
      orderBy: {
        PK_product: 'desc', // Ordena en base al campo `id` de manera descendente
      },
    });
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
