import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const products = await prisma.tbproducts.findMany();
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





export async function POST(request) {
  try {
    // Parsear el cuerpo de la solicitud
    const {
      name,
      SKU,
      urlProduct,
      regularPrice,
      offerPrice,
      stock,
      description,
      FK_size,
      FK_subcategory
    } = await request.json();

    // Validaciones de los campos requeridos
    if (!name || !SKU || !urlProduct || !regularPrice || !stock || !FK_size || !FK_subcategory) {
      return NextResponse.json(
        { message: "Todos los campos obligatorios deben ser proporcionados" },
        { status: 400 }
      );
    }

    // Validaciones opcionales
    if (SKU.length > 50) {
      return NextResponse.json(
        { message: "El SKU no puede exceder los 50 caracteres" },
        { status: 400 }
      );
    }

    if (urlProduct.length > 80) {
      return NextResponse.json(
        { message: "La URL del producto no puede exceder los 80 caracteres" },
        { status: 400 }
      );
    }

    // Verificar si el producto ya existe basado en su SKU o URL
    const existingProduct = await prisma.tbproducts.findFirst({
      where: {
        OR: [
          { SKU: SKU ? SKU : undefined },
          { urlProduct: urlProduct ? urlProduct : undefined }
        ]
      }
    });

    if (existingProduct) {
      return NextResponse.json(
        { message: "El producto ya está registrado con ese SKU o URL" },
        { status: 400 }
      );
    }

    // Crear el nuevo producto
    const newProduct = await prisma.tbproducts.create({
      data: {
        name,
        SKU,
        urlProduct,
        regularPrice,
        offerPrice: offerPrice ? offerPrice : null, // Aceptar oferta opcional
        stock: Number(stock),
        description: description ? description : null, // Aceptar descripción opcional
        FK_size: Number(FK_size),
        FK_subcategory: Number(FK_subcategory)
      }
    });

    // Retornar respuesta exitosa con el producto creado
    return NextResponse.json(newProduct);
  } catch (error) {
    console.error("Error creando producto:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}


