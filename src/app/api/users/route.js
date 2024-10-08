import { NextResponse } from "next/server";

export function GET() {
  //  BASE DE DATOS TODO LOS USUARIOS
  return NextResponse.json({
    nombre: "Celso",
    edad: 19,
  });
}
