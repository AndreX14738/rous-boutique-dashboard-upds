"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

function LoginPage() {
 


  const router = useRouter();
  const [error, setError] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    console.log(response);
    if (response.error) {
      setError(response.error);
    } else {
      router.push("/dashboard");
    }
  });
  return (
    <div className=" flex flex-col  items-center  pt-8 justify-center ">
      <a href="/" className="flex items-center gap-4">
        <img className="w-24" src="/logo.png" alt="logo idiomify" />
      </a>
      <h1 className="text-2xl font-bold my-4">Iniciar Sesion</h1>
   
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4  py-4  md:w-1/3 w-full"
      >
        {error && <span className="text-red-600">{error}</span>}
        <label htmlFor="email">Correo electronico </label>

        <input
          autoFocus
          className=" bg-zinc-100  border border-zinc-200  rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-transparent"
          type="email"
          id="email"
          placeholder="Escribe tu correo electronico"
          {...register("email", {
            required: {
              value: true,
              message: "Email es requerido",
            },
          })}
        />
        {errors.email && (
          <span className="text-sm text-red-600">{errors.email.message}</span>
        )}

        <label htmlFor="password">Contraseña </label>
        <input
          className="bg-zinc-100  border border-zinc-200  rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-300  focus:border-transparent"
          type="password"
          id="password"
          placeholder="Escribe tu contraseña"
          {...register("password", {
            required: {
              value: true,
              message: "Password es requerido",
            },
          })}
        />
        {errors.password && (
          <span className="text-sm text-red-600">
            {errors.password.message}
          </span>
        )}

        <button className="bg-blue-500 text-white font-bold rounded-md py-2">
          Iniciar Sesion
        </button>
      </form>

 
    </div>
  );
}

export default LoginPage;
