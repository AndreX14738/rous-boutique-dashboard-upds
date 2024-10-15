import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const sales = await prisma.tbsales.findMany({
      include: {
        tbcustomers: {
          select: {
            firstName: true,
            lastName: true,
            CI: true,
          },
        },
        tbsalesstatuses: {
          select: {
            name: true,
          },
        },
      },
    });

    // Mapea los resultados para formatear la respuesta en un solo nivel
    const salesDetails = sales.map((sale) => ({
      PK_sale: sale.PK_sale,
      totalAmount: sale.totalAmount,
      status: sale.status,
      createdAt: sale.createdAt,
      updatedAt: sale.updatedAt,
      customerName: `${sale.tbcustomers.firstName} ${sale.tbcustomers.lastName}`, // Nombre completo del cliente
      customerCI: sale.tbcustomers.CI, // CI del cliente
      salestatus: sale.tbsalesstatuses.name, // Nombre del estado de la venta
    }));

    return NextResponse.json(salesDetails);
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
