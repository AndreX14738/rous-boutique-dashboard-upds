import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/db";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        // Buscar al usuario en la base de datos por email
        const userFound = await prisma.tbusers.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // Si el usuario no existe, lanzar un error
        if (!userFound) throw new Error("No existe el usuario");

        // Comparar el password con el almacenado en la base de datos usando bcrypt
        const matchPassword = await bcrypt.compare(
          credentials.password,
          userFound.password
        );

        // Si la contraseña es incorrecta, lanzar un error
        if (!matchPassword) throw new Error("La contraseña está incorrecta");

        // Devolver el usuario si se encuentra y la contraseña es correcta
        return {
          id: userFound.PK_user,
          name: userFound.firstName,
          email: userFound.email,
          image: userFound.profileImage,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Verificar si el usuario existe en la base de datos
      const existingUser = await prisma.tbusers.findUnique({
        where: {
          email: user.email,
        },
      });

      // Si no existe, lanzar un error y no permitir el inicio de sesión
      if (!existingUser) {
        throw new Error("No se permite registrar un nuevo usuario");
      }

      return true; // Devolver true para permitir el inicio de sesión
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
