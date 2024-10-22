import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const sizes = await prisma.tbsizes.findMany();
    return NextResponse.json(sizes);
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
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json(
        { message: "El campo talla es obligatorio" },
        { status: 400 }
      );
    }

    const nameExists = await prisma.tbsizes.findUnique({
      where: {
        name: name,
      },
    });

    if (nameExists) {
      return NextResponse.json(
        { message: "La talla ya existe" },
        { status: 400 }
      );
    }

    const newname = await prisma.tbsizes.create({
      data: {
        name,
      },
    });

    return NextResponse.json(newname);
  } catch {
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
