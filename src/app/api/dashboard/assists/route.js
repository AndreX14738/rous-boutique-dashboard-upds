import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function POST(request) {
    try {
 
  
      return NextResponse.json(newAssits);
    } catch {
      return NextResponse.json(
        { message: "Error interno del servidor" },
        { status: 500 }
      );
    }
  }
  