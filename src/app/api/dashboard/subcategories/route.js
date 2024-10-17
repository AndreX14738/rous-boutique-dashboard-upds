import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const subcategories = await prisma.tbsubcategories.findMany();
    return NextResponse.json(subcategories);
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
    const { name, urlSubcategory, description, FK_category } = await request.json();

    // Validar que los campos obligatorios estén presentes
    if (!name || !urlSubcategory || !FK_category) {
      return NextResponse.json(
        { message: "Los campos nombre, URL de subcategoría y categoría son obligatorios" },
        { status: 400 }
      );
    }

    // Validar si ya existe una subcategoría con la misma URL
    const subcategoryExists = await prisma.tbsubcategories.findUnique({
      where: {
        urlSubcategory: urlSubcategory,
      },
    });

    if (subcategoryExists) {
      return NextResponse.json(
        { message: "La subcategoría con esta URL ya existe" },
        { status: 400 }
      );
    }

    // Crear la nueva subcategoría en la base de datos
    const newSubcategory = await prisma.tbsubcategories.create({
      data: {
        name,
        urlSubcategory,
        description,
        FK_category: Number(FK_category)
      },
    });

    // Devolver la subcategoría creada
    return NextResponse.json(newSubcategory, { status: 201 });
  } catch (error) {
    // Manejar errores específicos de Prisma como P2002 (violación de restricción única)
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "La subcategoría ya existe" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
