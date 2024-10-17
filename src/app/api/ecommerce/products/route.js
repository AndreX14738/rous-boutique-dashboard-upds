import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const products = await prisma.tbproducts.findMany({
      orderBy: {
        PK_product: "desc", // Ordena en base al campo `PK_product` de manera descendente
      },
      select: {
        PK_product: true,
        SKU: true,
        name: true,
        urlProduct: true,
        regularPrice: true,
        offerPrice: true,
        stock: true,
        description: true,
        images: true,
        tbsubcategories: {
          select: {
            PK_subcategory: true,
            name: true,
            tbcategories: {
              select: {
                PK_category: true,
                name: true,
              },
            },
          },
        },
        tbsizes: {
          select: {
            PK_size: true,
            name: true,
          },
        },
      },
    });

    // Transformar los productos en el formato deseado
    const formattedProducts = products.map((product) => ({
      PK_product: product.PK_product,
      SKU: product.SKU,
      name: product.name,
      urlProduct: product.urlProduct,
      regularPrice: product.regularPrice,
      offerPrice: product.offerPrice,
      stock: product.stock,
      description: product.description,
      images: product.images,
      category: product.tbsubcategories.tbcategories.name, // Nombre de la categoría
      subcategory: product.tbsubcategories.name, // Nombre de la subcategoría
      size: product.tbsizes.name, // Nombre del tamaño
    }));

    return NextResponse.json(formattedProducts);
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
