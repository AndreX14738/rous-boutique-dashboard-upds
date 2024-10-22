"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import ButtonSubmit from "@/components/dashboard/common/ButtonSubmit";
import AlertDanger from "@/components/dashboard/common/AlertDanger";
import AlertSuccess from "@/components/dashboard/common/AlertSuccess";

function CreateCustomer() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(data) {
    console.log(data);
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const result = await axios.post("/api/dashboard/customers", data);
      setSuccessMessage("Cliente registrado exitosamente");
      console.log("cliente creado:", result.data);
    } catch (err) {
      if (err.response && err.response.data) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Error al crear el cliente");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="grid gap-4">
      <div className="py-4 p-2">
        <h1 className="text-2xl text-black dark:text-white font-medium">
          Clientes
        </h1>
      </div>

      <section className="p-4 border grid gap-4 dark:border-zinc-800 rounded-md">
        <h1 className="text-black dark:text-white font-normal text-lg pb-4 border-b dark:border-zinc-800">
          Registrar nuevo cliente
        </h1>

        {/* Alertas en la esquina inferior derecha */}
        <div className="fixed bottom-4 md:bottom-8 right-4 md:right-8 z-50">
          {successMessage && (
            <AlertSuccess
              successMessage={successMessage}
              onClose={() => setSuccessMessage("")}
            />
          )}
          {errorMessage && (
            <AlertDanger
              errorMessage={errorMessage}
              onClose={() => setErrorMessage("")}
            />
          )}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-4 gap-2 dark:text-zinc-400 text-zinc-500"
        >
          {/* CI */}
          <label className="flex flex-col gap-1">
            CI
            <input
              type="text"
              className="input-dark"
              {...register("CI", {
                maxLength: {
                  value: 20,
                  message: "CI no puede exceder los 20 caracteres",
                },
              })}
            />
            {errors.CI && (
              <span className="text-sm text-red-500">{errors.CI.message}</span>
            )}
          </label>

          {/* Nombre */}
          <label className="flex flex-col gap-1">
            Nombre *
            <input
              type="text"
              className="input-dark"
              {...register("firstName", {
                required: {
                  value: true,
                  message: "El campo nombre es obligatorio",
                },
              })}
            />
            {errors.firstName && (
              <span className="text-sm text-red-500">
                {errors.firstName.message}
              </span>
            )}
          </label>

          {/* Apellido */}
          <label className="flex flex-col gap-1">
            Apellido *
            <input
              type="text"
              className="input-dark"
              {...register("lastName", {
                required: {
                  value: true,
                  message: "El campo apellido es obligatorio",
                },
              })}
            />
            {errors.lastName && (
              <span className="text-sm text-red-500">
                {errors.lastName.message}
              </span>
            )}
          </label>

          {/* Email */}
          <label className="flex flex-col gap-1">
            Email
            <input
              type="email"
              className="input-dark"
              {...register("email", {
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Formato de email no válido",
                },
              })}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </label>

          <section className="md:col-span-4 flex flex-col md:flex-row mt-4 items-center justify-between border-t border-zinc-800 pt-4 gap-4">
            <p className="dark:text-zinc-400 text-zinc-500">
              Revisa la información antes de continuar.
            </p>
            <ButtonSubmit isLoading={isLoading} />
          </section>
        </form>
      </section>
    </section>
  );
}

export default CreateCustomer;
