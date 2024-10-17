import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const expenses = await prisma.tbexpenses.findMany({
      orderBy: {
        PK_expense: "desc",
      },
    });
    return NextResponse.json(expenses);
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

export async function POST(request) {
  try {
    const { date, description, total } = await request.json();

    // Validar que los campos obligatorios estén presentes
    if (!date || !total || !description) {
      return NextResponse.json(
        { message: "Los campos fecha, descripcion y total son obligatorios" },
        { status: 400 }
      );
    }

    // Validar que la fecha sea válida
    if (isNaN(Date.parse(date))) {
      return NextResponse.json(
        { message: "La fecha no es válida" },
        { status: 400 }
      );
    }

    // Validar que el total sea un número positivo
    if (isNaN(parseFloat(total)) || parseFloat(total) <= 0) {
      return NextResponse.json(
        { message: "El total debe ser un número positivo" },
        { status: 400 }
      );
    }

    // Crear el nuevo gasto en la base de datos
    const newExpense = await prisma.tbexpenses.create({
      data: {
        date: new Date(date),
        description,
        total: parseFloat(total),
      },
    });

    // Devolver el gasto creado
    return NextResponse.json(newExpense, { status: 201 });
  } catch (error) {
    // Manejar errores específicos de Prisma como P2002 (violación de restricción única)
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Error en la creación del gasto, datos duplicados" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
