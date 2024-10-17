"use client";
import { useForm } from "react-hook-form";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

function LoginPage() {
  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      localStorage.getItem("theme") === "dark"
    );
  }, []);

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
      <h1 className="text-2xl font-medium my-4">Iniciar Sesion</h1>

      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4  py-4  md:w-1/3 w-full"
      >
        {error && <span className="text-red-600">{error}</span>}
        <label className="text-black dark:text-zinc-300 " htmlFor="email">
          Correo electronico{" "}
        </label>

        <input
          autoFocus
          className=" bg-zinc-100  dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-600  rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600 focus:border-transparent"
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

        <label
          className="text-black dark:text-zinc-300 "
          htmlFor="password"
        ></label>
        <input
          className="bg-zinc-100  dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-600  rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600  focus:border-transparent"
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
