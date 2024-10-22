import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import prisma from "@/libs/db";

export async function POST(request) {
  try {
    const { firstName, lastName, email, password } = await request.json();

 
    const emailFound = await prisma.tbusers.findUnique({
        where:{
            email: email
        }
    })
    if(emailFound){
        return NextResponse.json({
            message:'Ya existe el email'
        },
        {
            status:400
        })
    }
// AQUI SE HASHEA EL PASSWORD Y LUEGO SE PASA ESA CONSTANTE A LA DB
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = await prisma.tbusers.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        // Añade otras propiedades del usuario si es necesario
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
