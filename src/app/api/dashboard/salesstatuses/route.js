import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const salesstatuses = await prisma.tbsalesstatuses.findMany();
    return NextResponse.json(salesstatuses);
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
    const { name, description } = await request.json();

    // Validación del campo 'name'
    if (!name) {
      return NextResponse.json(
        { message: "El campo 'name' es obligatorio" },
        { status: 400 }
      );
    }

    if (name.length > 50) {
      return NextResponse.json(
        { message: "El nombre no puede exceder los 50 caracteres" },
        { status: 400 }
      );
    }

    // Validación del campo 'description'
    if (description && description.length > 255) {
      return NextResponse.json(
        { message: "La descripción no puede exceder los 255 caracteres" },
        { status: 400 }
      );
    }

    // Comprobar si el estado de venta ya existe
    const salesStatusExists = await prisma.tbsalesstatuses.findUnique({
      where: {
        name: name,
      },
    });

    if (salesStatusExists) {
      return NextResponse.json(
        { message: "El estado de venta ya existe" },
        { status: 400 }
      );
    }

    // Crear nuevo estado de venta
    const newSalesStatus = await prisma.tbsalesstatuses.create({
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(newSalesStatus);
  } catch (error) {
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}