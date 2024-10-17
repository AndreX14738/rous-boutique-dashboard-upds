import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const categories = await prisma.tbcategories.findMany();
    return NextResponse.json(categories);
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
    const { name, urlCategory, description } = await request.json();

    // Validar que los campos obligatorios estén presentes
    if (!name || !urlCategory) {
      return NextResponse.json(
        { message: "Los campos nombre y URL de categoría son obligatorios" },
        { status: 400 }
      );
    }

    // Validar si ya existe una categoría con el mismo nombre o URL
    const categoryExists = await prisma.tbcategories.findUnique({
      where: {
        urlCategory: urlCategory,
      },
    });

    if (categoryExists) {
      return NextResponse.json(
        { message: "La categoría con esta URL ya existe" },
        { status: 400 }
      );
    }

    // Crear la nueva categoría en la base de datos
    const newCategory = await prisma.tbcategories.create({
      data: {
        name,
        urlCategory,
        description,
      },
    });

    // Devolver la categoría creada
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    // Manejar errores específicos de Prisma como P2002 (violación de restricción única)
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "La categoría ya existe" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}


